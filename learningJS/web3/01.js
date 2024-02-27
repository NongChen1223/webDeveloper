import {ethers} from "ethers";
import * as wasi from "wasi";

async function init() {
    try {
        const rpcETH = 'https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa'
        const rpcTEST = 'https://rpc.sepolia.org'

        const provider = new ethers.JsonRpcProvider(rpcETH)
        const providerTest  = new ethers.JsonRpcProvider(rpcTEST)


        const balance = await provider.getBalance('vitalik.eth')
        const balanceTest = await providerTest.getBalance('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')
        console.log(`V神余额 ${ethers.formatEther(balance)} ETH`)
        console.log(`V神测试网余额 ${ethers.formatEther(balanceTest)} ETH`)

        const newwork = await  provider.getNetwork();
        console.log('查询当前链接了哪条链',newwork.toJSON())

        const blockNumber = await  provider.getBlockNumber()
        console.log('查询区块高度',blockNumber)

        const txCount = await  provider.getTransactionCount("vitalik.eth")
        console.log(`查询V神主网交易次数`,txCount)

        const feeData = await  provider.getFeeData()
        console.log('查询当前gas设置',feeData)

        const code = await  provider.getCode('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')
        console.log('获取合约的bytecode',code)
    } catch (err) {
        console.log('getUserAddress 失败', err)
    }
}

init()