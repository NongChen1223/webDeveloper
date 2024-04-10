import {Tokens} from './data/tokens'
import {post} from '/request/request'

const UNISWAP_V2_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
const UNISWAP_V3_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const createV3BatchTokensQl = (list: any[]): string => {
    return `
    {
          usdt:token(
            id:"${USDT}"
            subgraphError: allow
          ){
            id
            name
            symbol
            decimals
            derivedETH 
          }
         tokens(where: {id_in:[${list.map(item => `"${item.address}"`)}]
          }){
            id
            symbol
            decimals
            derivedETH
            poolCount
        }
    }
    `
}
const createV2BatchTokensQl = (list: any[]): string => {
    return `
     {
          usdt:token(
            id:"${USDT}"
            subgraphError: allow
          ){
            id
            name
            symbol
            decimals
            derivedETH 
          }
         tokens(where: {id_in:[${list.map(item => `"${item.address}"`)}]
          }){
            id
            symbol
            decimals
            derivedETH
        }
    }
    `
}

const getV3Graphql = async (query: string) => {
    const res = await post(UNISWAP_V3_URL, {
        query
    })
    return res.data
}
const getV2Graphql = async (query: string) => {
    const res = await post(UNISWAP_V2_URL, {
        query,
    })
    return res.data
}

const calculateDerivedETHToUsdtList = async (qlobj: any) => {
    const list: any = []
    const usdtPrice = qlobj.usdt.derivedETH
    const tokens = qlobj.tokens
    tokens.forEach((item: any) => {
        const price = parseFloat(item.derivedETH) / usdtPrice
        list.push({
            address: item.id,
            symbol: `${item.symbol}/USDT`,
            price
        })
    })
    return list
}
const filterUniNoFind = (priceList: any[], oldlist: any[]): any[] => {
    const nofindList: any[] = []
    oldlist.forEach(item => {
        if (!priceList.some(price => String(price.address) === String(item.address))) {
            nofindList.push(item)
        }
    })
    return nofindList
}
//分组请求
const tokenListChunk = (list: any[], chunkSize: number = 100) => {
    const waitMapFn = (_: (typeof list)[number], index: number) => list.slice(index * chunkSize, (index + 1) * chunkSize)
    const chunkList:any[] = Array.from({length: Math.ceil(list.length / chunkSize)}, waitMapFn)
    return chunkList
}
//V3查询
const getv3TokenPirceList = async (list: any[], chunkSize: number = 100)=>{
    const chunkList = tokenListChunk(list, chunkSize)
    const promises = chunkList.map(async (chunk, index) => {
        const query = createV3BatchTokensQl(chunk)
        const v3TokenInfo = await getV3Graphql(query)
        return calculateDerivedETHToUsdtList(v3TokenInfo);
    })
    const chunkRes = await Promise.all(promises);
    return chunkRes.flat()
}
//V2查询
const getv2TokenPirceList = async (list: any[], chunkSize: number = 100):Promise<any>=>{
    const chunkList = tokenListChunk(list, chunkSize)
    const promises = chunkList.map(async (chunk, index) => {
        const query = createV2BatchTokensQl(chunk)
        const v2TokenInfo = await getV2Graphql(query)
        return calculateDerivedETHToUsdtList(v2TokenInfo);
    })
    const chunkRes:any[] = await Promise.all(promises);
    return chunkRes.flat()
}
const filterPriceNotZero = (list: any[]) => {
    return list.filter(item => item.price > 0)
}

const getPriceList = async (list: any[], chunkSize: number = 100) => {
    const v3PriceList = await getv3TokenPirceList(list, chunkSize)
    const findToken = filterUniNoFind(v3PriceList, list);
    const v2PriceList = await getv2TokenPirceList(findToken, chunkSize)
    const totalList = v3PriceList.concat(v2PriceList)
    // const finalList = filterUniNoFind(totalList, list)
    // console.log(`
    //         原数组长度: ${list.length},
    //         查找V3长度: ${v3PriceList.length},
    //         未找到V3长度: ${findToken.length},
    //         查找V2长度: ${v2PriceList.length},
    //         最终查找失败长度: ${finalList.length}
    // `);
    return filterPriceNotZero(totalList)
}

getPriceList(Tokens, 100)
export {
    getPriceList
}
/*
 1.先批量查询V3所有币对信息得到uniswap的derivedETH 流动性计算出的XX币相对ETH的价格
 2.获取WETH/USDT的价格
 3.换算出XXX币 = 多少USDT
 4.过滤出V3查找不到的币再去V2查找
*/