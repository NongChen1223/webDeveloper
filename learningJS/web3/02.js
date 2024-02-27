import {ethers} from "ethers";

async function init() {
    try {
        const rpcETH = 'https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa'
        const provider = new ethers.JsonRpcProvider(rpcETH)


    } catch (err) {
        console.log('getUserAddress 失败', err)
    }
}

init()