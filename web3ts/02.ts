import Web3 from 'web3';
import { Tokens,ERC20ABI } from './data/TokenABI'
import {BlanceListType} from "./type/web3";
const ETH_RPC_URL = 'https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa'

async function createTokenJsonRpcList(){
    const web3 = new Web3(ETH_RPC_URL);
    const tokenList = Tokens
    const ERC20_ABI = ERC20ABI

}