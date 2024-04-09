import {post} from '/request/request'
import {Tokens} from '/web3ts/data/TokenABI'
import { OnlyAddress,OnlyId } from  './type/index'
import { TokensType } from  '/web3ts/type/web3'
type TokenSymbol = Omit<TokensType, "name">

const UNISWAP_V2_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
const UNISWAP_V3_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

const createV2EthAndUsdQl = ():string=>{
    return `
      {
          pairs(where: {token0: "${WETH}", token1: "${USDT}"}) {
            id
            token0 {
              decimals
              id
              name
              symbol
            }
            token1 {
              name
              id
              decimals
              symbol
            }
          }
      }
    `
}
const createV2BatchEthPairQl = (list:OnlyAddress<any>[]):string=>{
    return  `
    {
        ${list.map((item:OnlyAddress<any>, index: number) =>
            `
             pairs${index}:pairs(where:{ token0:"${item.address}",token1:"${WETH}" }){
                 id
                 token0 {
                  decimals
                  id
                  name
                  symbol
                 }
                 token1 {
                  name
                  id
                  decimals
                  symbol
                 }
               }
            `
        )}
    }
    `
}

const createV2PoolInfoQl = (id:string)=>{
    return `
        {
            pair(id: "${id}") {
                token0 {
                  id
                  symbol
                  name
                  decimals
                }
                token1 {
                  id
                  symbol
                  name
                  decimals
                }
                reserve0
                reserve1
                totalSupply
                reserveETH
                reserveUSD
                token0Price
                token1Price
           }
        }
      `
}
const createV2BatchPoolInfoQl = (list:OnlyId<any>[])=>{
    return `
           {
            ${list.map((item:OnlyId<any>, index:number) => `
              pool${index}: pair(id: "${item.id}") {
                token0 {
                  id
                  symbol
                  decimals
                }
                token1 {
                  id
                  symbol
                  decimals
                }
                reserve0
                reserve1
                totalSupply
                reserveETH
                reserveUSD
                token0Price
                token1Price
                volumeToken0
                volumeToken1
              }
            `)}
           }
        `
}
//v2查询方法
const getV2Graphql = async (query: string) => {
    const res = await post(UNISWAP_V2_URL, {
        operationName: "MyQuery",
        query
    })
    return res.data
}
//v3查询方法
const getV3Graphql = async (query: string) => {
    const res = await post(UNISWAP_V3_URL, {
        query
    })
    return res.data
}
const getV2EthAndUsdPrice = async (): Promise<number> => {
    try {
        const pool = await getV2Graphql(createV2EthAndUsdQl());
        const poolId = pool?.pairs[0]?.id;
        if (!poolId) {
            throw new Error('Pool ID not found');
        }
        const poolInfo = await getV2Graphql(createV2PoolInfoQl(poolId));
        const ethPrice = Number(poolInfo?.pair?.token1Price) || 0;
        return ethPrice;
    } catch (error) {
        console.error('Error getting ETH price:', error);
        return 0;
    }
};
//过滤V2找不到的交易池的币对
const filterV2NoFind = (pairObj: any) => {
    let nofindList: TokenSymbol[] = []
    Object.keys(pairObj).forEach((item, index) => {
        const pair = pairObj[item]
        if (Array.isArray(pair) && pair.length === 0) {
            nofindList.push({
                address: Tokens[index].address,
                token: Tokens[index].symbol
            })
        }
    })
    console.log('V2找不到池的币', nofindList, nofindList.length)
    return nofindList
}
const getPairUsdPriceList = async (list:TokensType[])=>{
    const pairBatchObj = await getV2Graphql(createV2BatchEthPairQl(list))
    console.log('pairBatchObj',pairBatchObj)
    // const v2NoFindList =
}
getPairUsdPriceList(Tokens)