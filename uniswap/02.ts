import {post} from '/request/request'
import {Tokens} from '/web3ts/data/TokenABI'

const UNISWAP_V2_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
const USDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const LDO = '0x5a98fcbea516cf06857215779fd812ca3bef1b32'
const BNB = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
const SHIB = '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'
const UNI = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
const PEPE = '0x6982508145454ce325ddbe47a25d4ec3d2311933'

const poollsit = [
    {
        pairid: '0x4028daac072e492d34a3afdbef0ba7e35d8b55c4',
        token: 'stETH/WETH'
    },
    {
        pairid: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
        token: 'USDC/WETH'
    },
    {
        pairid: '0x25b9105cd8972f4e5df4b8ebcd06eb470794891f',
        token: 'TONCOIN/WETH'
    },
    {
        pairid: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
        token: 'LINK/WETH'
    },
    {
        pairid: '0xbb2b8038a1640196fbe3e38816f3e67cba72d940',
        token: 'WBTC/WETH'
    },
    {
        pairid: '0xd3d2e2692501a5c9ca623199d38826e513033a17',
        token: 'UNI/WETH'
    },
    {
        pairid: '0x523a36ad73c402e456f49b04f0fe8eba5a8c85cd',
        token: 'LEO/WETH'
    },
    {
        pairid: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
        token: 'DAI/WETH'
    },
    {
        pairid: '0xc0a6bb3d31bb63033176edba7c48542d6b4e406d',
        token: 'RNDR/WETH'
    },
    {
        pairid: '0x17782d58c715aa2a4458d5fb1c1d8e52a69a62fc',
        token: 'OKB/WETH'
    },
    {
        pairid: '0x90704ac59e7e54632b0cc9d22573aecd7eb094ad',
        token: 'CRO/WETH'
    },
    {
        pairid: '0xa43fe16908251ee70ef74718545e4fe6c5ccec9f',
        token: 'PEPE/WETH'
    },
    {
        pairid: '0x1ffc57cada109985ad896a69fbcebd565db4290e',
        token: 'FTM/WETH'
    },
    {
        pairid: '0xc2adda861f89bbb333c90c492cb837741916a225',
        token: 'MKR/WETH'
    },
    {
        pairid: '0x454f11d58e27858926d7a4ece8bfea2c33e97b13',
        token: 'LDO/WETH'
    },
    {
        pairid: '0xe4f719c11fc5ab883e32068df99962985645e860',
        token: 'rETH/WETH'
    },
    {
        pairid: '0x0c4a68cf6857cc76fe946d04fe85fac5fae9625e',
        token: 'QNT/WETH'
    },
    {
        pairid: '0xc049d04d40441d77e99d77a350355d2e2ef60df1',
        token: 'stkAAVE/WETH'
    },
    {
        pairid: '0x43ae24960e5534731fc831386c07755a2dc33d47',
        token: 'SNX/WETH'
    },
    {
        pairid: '0xa040832b1e5026da6dc843e6773a9e4d02fff9b1',
        token: 'AXS/WETH'
    },
    {
        pairid: '0xe45b4a84e0ad24b8617a489d743c52b84b7acebe',
        token: 'AGIX/WETH'
    },
    {
        pairid: '0x2efc769fb8fd87ad63a38e8a0828f07c6331a734',
        token: 'WLD/WETH'
    },
    {
        pairid: '0xdb44a4a457c87225b5ba45f27b7828a4cc03c112',
        token: 'RBN/WETH'
    },
    {
        pairid: '0xff58711683be66dad6e0e20e0043af46fc7f5f49',
        token: 'CHZ/WETH'
    },
    {
        pairid: '0xb011eeaab8bf0c6de75510128da95498e4b7e67f',
        token: 'APE/WETH'
    }
]


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
            token0Price: '0.0002951205707092536078704195998754469',
            token1Price: '3388.445602408306311617829269834471',当前查询的结果1个WETH的价格，约为3388.45USDT
            volumeToken0: '30997790.394923970564790671', 交易量
            volumeToken1: '43049050667.405234'
          }
        }
}


*/

//创建USDT和币的交易对请求参数体
const createEthPair = (list: any) => {
    let query: string = `{\n`;
    list.forEach((item: any, index: number) => {
        query += `
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
    })
    query += "}"
    // console.log('批量查询币对交易池ID', query)
    return query;
}
//v2查询方法
const getV2Graphql = async (query: string) => {
    const res = await post(UNISWAP_V2_URL, {
        operationName: "MyQuery",
        query
    })
    console.log('V2查询结果', res.data)
    return res.data
}
const createPairPrice = async () => {
    const query: string = `
    {
          pair(id: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852") {
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
            volumeToken0
            volumeToken1
          }
    }
    `
    const res = await getV2Graphql(query)
    console.log('通过交易对池ID查询币对价格信息', res)
}
//转换为币对池ID列表
const createPoolList = (pair: any) => {
    const list: any = []
    Object.keys(pair).forEach((item: any, index) => {
        if (pair[item] && pair[item].length > 0) {
            list.push({
                pairid: pair[item][0].id,
                token: `${pair[item][0].token0.symbol}/${pair[item][0].token1.symbol}`
            })
        }
    })
    return list
}
const v2getPairPrice = async () => {
    const query = await createEthPair(Tokens)
    const pairlist = await getV2Graphql(query)
    const poollist = await createPoolList(pairlist)
}
createPairPrice()
/*
  v2池查询交易对价格思路
  1.币对列表和WETHC查询交易池ID
  2.通过XXX/WETH 交易池ID获取这个币对的价格
  3.获取USDT/WETH价格
  4.其他币对再拿XXX = 1个WETH的价格去换算USDT 获得XXXX/USDT价格

*/