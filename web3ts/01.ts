import Web3 from 'web3';
import {Tokens,ContractABI} from './data/TokenABI'
import { BalanceOfInterface,TokensType } from "./type/web3";

const ETH_RPC_URL: string = 'https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa'
const web3 = new Web3(ETH_RPC_URL);

const user_address: string = '0xF1735824d3166669B17d49763Ee7857831aa0679'

async function getTokenBalance(address: string, contractABI: any[], tokenName: string) {
    try {
        const Contract: any = new web3.eth.Contract(contractABI, address);
        const toeknSymbol = await Contract.methods.symbol().call();
        const decimals = await Contract.methods.decimals().call()
        const balance = await Contract.methods.balanceOf('0xF1735824d3166669B17d49763Ee7857831aa0679').call()
        console.log(`
        代币符号：${toeknSymbol},
        代币精度：${decimals},
        代币余额：${balance},
        余额转换：${web3.utils.fromWei(balance, 'ether')}
        `)
    } catch (err) {
        console.log(`get ${tokenName} balance error ${err}`)
    }
}

async function getEthBalance(address: string) {
    try {
        const balance = await web3.eth.getBalance(address)
        console.log(`s
        ETH余额：${balance},
        余额转换：${web3.utils.fromWei(balance, 'ether')}
        `)
    } catch (err) {
        console.log('get eth balance error', err)
    }
}

// getEthBalance(user_address)
getTokenBalance('0x6f40d4a6237c257fff2db00fa0510deeecd303eb', Tokens[0].abi, 'INST')
// console.log('web3实例', web3)
