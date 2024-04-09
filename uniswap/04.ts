import {Tokens} from '/web3ts/data/TokenABI'
import {post} from '/request/request'

const UNISWAP_V2_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
const UNISWAP_V3_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const createV3BatchTokensQl = (list:any[]):string=>{
    return  `
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
         tokens(where: {id_in:[${list.map(item=>`"${item.address}"`)}]
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
const getV3Graphql = async (query: string) => {
    const res = await post(UNISWAP_V3_URL, {
        query
    })
    return res.data
}
const getTokenPriceList = async (qlobj:any) => {
    const list:any = []
    const usdtPrice = qlobj.usdt.derivedETH
    const tokens = qlobj.tokens
    tokens.forEach((item:any) => {
        const price = item.derivedETH / usdtPrice
        list.push({
            id: item.id,
            symbol: `${item.symbol}/USDT`,
            price
        })
    })
    console.log('币对价格',list)
    return list
}
const getTokenUsdPrice = async (list:any) => {
    const query = await createV3BatchTokensQl(list)
    const res = await getV3Graphql(query)
    await getTokenPriceList(res)
    console.log('V3',res.tokens.length)
}
getTokenUsdPrice(Tokens)
// export  {
//     getTokenUsdPrice
// }