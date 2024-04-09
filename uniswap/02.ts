import {post} from '/request/request'
import {Tokens} from '/web3ts/data/TokenABI'

const UNISWAP_V2_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
const UNISWAP_V3_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
/*
    ETH/USDT  如果要查询xxx/usdt的币对交易池 token1就必须是usdt以此类推
    币对单个子图查询
    pairs是币对的意思
    where跟查询条件
    id则是交易池ID
    token0和token1则是币对信息 decimals是币对的精度 id则是币ID name币的名称
    pairs(where: {token0: "0x6982508145454ce325ddbe47a25d4ec3d2311933", token1: "0xdac17f958d2ee523a2206206994597c13d831ec7"}) {
        id
        token0 {
            decimals
            id
        }
        token1 {
            name
            id
            decimals
        }
    }
    批量查询币对交易池ID
         {
            pairs1:pairs(where:{ token0:"${UNI}",token1:"${USDT}" }){
             id
             token0 {
              decimals
              id
              name
             }
             token1 {
              name
              id
              decimals
             }
            }
            pairs2:pairs(where:{ token0:"${PEPE}",token1:"${USDT}" }){
             id
             token0 {
              decimals
              id
              name
             }
             token1 {
              name
              id
              decimals
             }
            }
        }
      查询某个币相对于ETH的价格 通过Uniswap提供的流动性池计算出
      target: token(
        id: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        subgraphError: allow,  这部分指示查询应该如何处理错误。在这种情况下，它允许查询在子图中遇到错误时继续执行。
        block: { number: 12312 } //如果不指定区块号则返回最新的价格
        ) {
        id
        name
        symbol
        decimals
        derivedETH
        }
        通过交易对池ID查询币对池信息 例如USDT/ETH(WETH
        {
          pair: {
            token0: {
              id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              symbol: 'WETH',
              name: 'Wrapped Ether',
              decimals: '18'
            },
            token1: {
              id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
              symbol: 'USDT',
              name: 'Tether USD',
              decimals: '6'
            },
            reserve0: '21482.993058699945551521', 流动池中WETH的数量
            reserve1: '72793953.35632',   流动池USDT的数量
            totalSupply: '0.503131698745964175', 流动性池代币的总供应量，这是提供给流动性提供者的代币数量，约为0.5031
            reserveETH: '42965.986117399891103042',  流动性池中以ETH计价的总储备量，约为42965.99 ETH
            reserveUSD: '145508592.0765775221870747888720889', 流动性池中以USD计价的总储备量，约为145508592.08美元
            token0Price: '0.0002951205707092536078704195998754469',当前查询结果 1个USDT 约为0.00029个WETH
            token1Price: '3388.445602408306311617829269834471',当前查询的结果 1个WETH的价格，约为3388.45USDT
            volumeToken0: '30997790.394923970564790671', 指定时间段内token0的交易量
            volumeToken1: '43049050667.405234'
          }
        }
        v3批量查询价格
        query MyQuery {
          pools(
            where: {
              token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", WETH
              其他币id地址 查询相对与WETH的价格
              token0_: {
                id_in: [
                  "0x12b32f10a499bf40db334efe04226cca00bf2d9b",
                  "0x160de4468586b6b2f8a92feb0c260fc6cfc743b1"
                ]
              }
            }
          ) {
            id
            token1Price
            token0Price
            token0 {
              id
              name
            }
          }
        }
        v3批量查询结果
        "pools": [
              {
                "id": "0x9ba3f47fe7f5a12562ba0a4a5645d8bf9ea1dd8e", 交易池ID
                "token1Price": "0.000000000000000000000000000000002938956810142818059917450894998607", 1个WETH的价格 = 这些NEAR
                "token0Price": "340256786540325233929710090404719.7", NEAR/WETH价格 1个ETH大约能换那么多的NEAR
                "token0": {
                  "id": "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4",
                  "name": "NEAR",
                  "symbol": "NEAR"
                },
                "token1": {
                  "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                  "name": "Wrapped Ether",
                  "symbol": "WETH"
                }
              }
         ]

        v3批量查询tokens信息 包括价格
        {
            usdt:token(
                id:"0xdac17f958d2ee523a2206206994597c13d831ec7"
                subgraphError: allow
              ){
                id
                name
                symbol
                decimals
                derivedETH
              }
              tokens(where: {id_in: [
                "0xdac17f958d2ee523a2206206994597c13d831ec7",
                "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
                "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
                "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
                "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
                "0x514910771af9ca656af840dff83e8264ecf986ca",
                "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
              ]}){
                id
                symbol
                decimals
                derivedETH
                poolCount
                totalSupply
              }
       }
}
*/
//创建XXX/WETH的币对请求query
const createV2EthPair = (list: any) => {
    const query = `
    {
        ${list.map((item: any, index: number) =>
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
    }`
    return query;
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
    // console.log('V3子图查询结果',res)
    return res.data
}
//根据poolid获取币对价格信息
const getPoolPrice = async (poolList: any[]) => {
    let query = ``
    if (poolList.length === 0) return new Error('poolList is empty')
    else if (poolList.length === 1) {
        query = `
        {
            pair(id: "${poolList[0].id}") {
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
    } else {
        query = `
           {
            ${poolList.map((item, index) => `
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
    const res = await getV2Graphql(query)
    return res
}
const getUsdtAndEthPrice = async (): Promise<{ usdPrice: number, ethPrice: number }> => {
    const poolid = await getUsdtAndEthPoolId()
    const poolPrice = await getPoolPrice([{id: poolid}])
    const ethPrice = Number(poolPrice?.pair?.token1Price || 0) // weth价值多少usdt价格
    const usdPrice = Number(poolPrice?.pair?.token0Price || 0)// usdt价值多少weth
    return {
        ethPrice,
        usdPrice
    }
}
const getUsdtAndEthPoolId = async () => {
    const query = `
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
    const res = await getV2Graphql(query)
    return res?.pairs[0]?.id || new Error('poolid is empty')
}
//转换为币对池ID列表
const createPoolList = (pair: any) => {
    const list: any = []
    Object.keys(pair).forEach((item: any, index) => {
        if (pair[item] && pair[item].length > 0) {
            list.push({
                id: pair[item][0].id, // 交易池 pool ID
                token: `${pair[item][0].token0.symbol}/${pair[item][0].token1.symbol}`
            })
        }
    })
    return list
}
const getV2PairPriceList = async (poolObj: any, PairName: string = 'USDT'):Promise<any[]> => {
    const list: any = []
    const {ethPrice} = await getUsdtAndEthPrice()
    Object.keys(poolObj).forEach(item => {
        const pool = poolObj?.[item]
        const ethPairPrice = Number(pool?.token1Price)
        if (ethPairPrice > 0) {
            list.push({
                address: pool.token0.id,//token0的币对地址
                token: `${pool.token0.symbol}/${PairName}`,
                price: ethPairPrice * ethPrice //换算USDT价格
            })
        }
    })
    return list
}
const getV3PairPriceList = async (poollist:any[],PairName: string = 'USDT'):Promise<any[]>=>{
   const list:any[] = []
    const {ethPrice} = await getUsdtAndEthPrice()
    poollist.forEach((item,index)=>{
        const ethPairPrice = Number(item?.token1Price)
        if(ethPairPrice > 0){
            list.push({
                address:item.token0.id,
                token:`${item.token0.symbol}/${PairName}`,
                price:ethPairPrice * ethPrice
            })
        }
    })
    return list
}
//过滤V2找不到的交易池的币对
const filtrationV2NoFind = (pairObj: any) => {
    let nofindList: any[] = []
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
//V3创建查询子图
const createV3EthPair = (list: any[]) => {
    const query = `
    {
     pools(
        where: {
          token0_: {
            id_in:[${list.map(item => `"${item.address}"`)}] 
          }
          token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        }
     ) 
     {
        id
        token1Price
        token0Price
        token0 {
          id
          name
          symbol
        }
         token1 {
          id
          name
          symbol
        }
     }
    }
    `
    return query
}
//V3获取币对价格
const v3getPairPrice = async (list: any) => {
    const query = await createV3EthPair(list)
    const res = await getV3Graphql(query)
    const v3PairPriceList = await getV3PairPriceList(res.pools)
    console.log("v3 价格查询", v3PairPriceList)
    return v3PairPriceList
}
const getPairPrice = async () => {
    const query = await createV2EthPair(Tokens) //创建币对查询pool
    const pairObject = await getV2Graphql(query) //获取到有币对池的对象
    const nofindList = await filtrationV2NoFind(pairObject) //过滤出V2查询不到的币
    const poollist = await createPoolList(pairObject) //创建币对池ID列表
    const poolPriceObject = await getPoolPrice(poollist) //通过池ID获取币对价格
    const v2pairPriceList = await getV2PairPriceList(poolPriceObject) //换算USDT价格
    const v3pairPriceList = await v3getPairPrice(nofindList) //v3查询价格
    const pairPriceList = [...v2pairPriceList, ...v3pairPriceList]
    console.log('币对价格', pairPriceList)
}
getPairPrice()
/*
  v2池查询交易对价格思路
  1.创建XXX/WETH的批量子图查询
  2.通过XXX/WETH 交易池ID获取这个币对的价格 (同时过滤出V2查询不到池子的币
  3.获取USDT/WETH价格
  4.过滤出V2查询不到的币 去V3查询价格
  5.其他币对再拿XXX = 1个WETH的价格去换算USDT 获得XXXX/USDT价格 换算成功
*/