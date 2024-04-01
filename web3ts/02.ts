import Web3 from 'web3';
import {ERC20ABI, Tokens} from './data/TokenABI'
import { JsonRpcOptionalRequest, JsonRpcResponseWithResult,JsonRpcResult } from 'web3-types';
const ETH_RPC_URL = 'https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa'
const web3 = new Web3(ETH_RPC_URL);
interface RpcList{
    id:number;
    token:string;
}
interface HoldList{
    token:string;
    balance:number;
}
interface JsonRpcBatchRes{
    jsonrpc:string;
    id:number;
    result:string;
}
async function createTokenJsonRpcList() {
    const web3 = new Web3(ETH_RPC_URL);
    const batch = new web3.BatchRequest()
    const tokenList = Tokens
    const ERC20_ABI = ERC20ABI
    const WALLET_ADDRESS = '0xdD831352762e9de7ad5a264990e1bB9F87A6Fc21'
    //ETH固定
    const JSON_RPC_LIST:RpcList[] = []
    for (let i = 0; i < tokenList.length; i++) {
        if (i === 0) {
            JSON_RPC_LIST.push({
                id: 0,
                token: 'ETH',
            })
            batch.add({
                jsonrpc: '2.0',
                id: i,
                method: 'eth_getBalance',
                params: [WALLET_ADDRESS, 'latest']
            })
        }else {
            const token = tokenList[i]
            JSON_RPC_LIST.push({
                id: i,
                token: token.symbol,
            })
            batch.add({
                jsonrpc: '2.0',
                id: i,
                method: 'eth_call',
                params: [
                    {
                        form: "0x514910771af9ca656af840dff83e8264ecf986ca",
                        to: token.address,
                        data: newTokenContract(token.address).methods.balanceOf(WALLET_ADDRESS).encodeABI()
                    },
                    'latest'
                ],
            })
        }
    }
    // console.log('打印列表',JSON_RPC_LIST)
    const holdList:HoldList[] = []
    const jsonResponse:JsonRpcBatchRes[]= await batch.execute() as JsonRpcBatchRes[];
    jsonResponse.forEach(item => {
        let gas = +web3.utils.fromWei(BigInt(item.result), 'ether')
        if (gas > 0) {
            const token:RpcList | undefined = JSON_RPC_LIST.find(item1 => item1.id === item.id)
            if(token?.token){
                holdList.push({
                    token: token.token,
                    balance: gas
                })
            }
        }
    })
    console.log('结果', holdList)
}

function newTokenContract(address: string) {
    const contract = new web3.eth.Contract(ERC20ABI, address);
    return contract
}
createTokenJsonRpcList()