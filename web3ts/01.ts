import Web3 from 'web3';
import {Tokens} from './data/TokenABI'
import {BlanceListType} from "./type/web3";

const ETH_RPC_URL: string = 'https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa'


const user_address: string = '0xF1735824d3166669B17d49763Ee7857831aa0679'
const LINK_ABI = [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}, {
        "name": "_data",
        "type": "bytes"
    }],
    "name": "transferAndCall",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_subtractedValue", "type": "uint256"}],
    "name": "decreaseApproval",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_addedValue", "type": "uint256"}],
    "name": "increaseApproval",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "remaining", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
        "indexed": true,
        "name": "to",
        "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}, {"indexed": false, "name": "data", "type": "bytes"}],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
        "indexed": true,
        "name": "spender",
        "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}]

async function getTokenBalance(wallet_address: string, token_address: string, tokenName: string): Promise<BlanceListType> {
    try {
        const web3 = new Web3(ETH_RPC_URL);
        const Contract = new web3.eth.Contract(LINK_ABI, token_address);
        const tokenSymbol = await Contract.methods.symbol().call()
        const balance = await Contract.methods.balanceOf(wallet_address).call()
        const balance_wei: number = balance ? +web3.utils.fromWei(balance, 'ether') : 0
        console.log(`
        代币符号：${tokenSymbol},
        代币余额：${balance},    
        余额转换：${balance_wei}
        `)
        return {
            name: tokenSymbol || tokenName,
            balance: balance_wei
        }
    } catch (err) {
        console.log(`get ${tokenName} balance error ${err}`)
        return {
            name: tokenName,
            balance: 0
        }
    }
}

async function getWalletBalance() {
    const wallet_address: string = '0x2BE3d3a38c6C5Ac27cA2c2DabE6A354b599c4E09'
    const tokenLen: number = Tokens.length
    const balanceList: Array<BlanceListType> = []
    // console.log('token长度',tokenLen)
    const ethBalance = await getEthBalance(wallet_address)
    balanceList.push(ethBalance)
    for (let i: number = 0; i < tokenLen; i++) {
        const {name, balance} = await getTokenBalance(wallet_address, Tokens[i].address, Tokens[i].name)
        if (balance > 0) {
            balanceList.push({
                name,
                balance
            })
        }
    }
    console.log('打印余额列表', balanceList)
}

async function getBatchRequest() {
    try {
        const wallet_address: string = '0x2BE3d3a38c6C5Ac27cA2c2DabE6A354b599c4E09'
        const web3 = new Web3(ETH_RPC_URL);
        const link_address = '0x514910771af9ca656af840dff83e8264ecf986ca';
        const Contract = new web3.eth.Contract(LINK_ABI, link_address);
        const Contract1 = new web3.eth.Contract(LINK_ABI, '0x6b175474e89094c44da98b954eedeac495271d0f');
        const jsonRpc1 = {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_call',
            params: [{
                form:"0x514910771af9ca656af840dff83e8264ecf986ca",
                to: link_address,
                data: Contract.methods.balanceOf('0x2BE3d3a38c6C5Ac27cA2c2DabE6A354b599c4E09').encodeABI()
            }, 'latest']
        }
        const jsonRpc2 = {
            jsonrpc: '2.0',
            id: 2,
            method: 'eth_call',
            params: [{
                form:"0x514910771af9ca656af840dff83e8264ecf986ca",
                to: '0x6b175474e89094c44da98b954eedeac495271d0f', //DAI
                data: Contract1.methods.balanceOf('0x2BE3d3a38c6C5Ac27cA2c2DabE6A354b599c4E09').encodeABI()
            }, 'latest']
        }
        const batch = new web3.BatchRequest()
        batch.add(jsonRpc1)
        batch.add(jsonRpc2)
        const a =  await batch.execute()
        // console.log('返回批量请求',a)
        a.forEach((item, index) => {
            console.log('批量请求', item)
            if (index === 0) {
                console.log('LINK', web3.utils.fromWei(BigInt(item.result), 'ether'))
            } else {
                console.log('DAI', web3.utils.fromWei(BigInt(item.result), 'ether'))
            }
        })
    } catch
        (err) {
        console.log('批量请求失败', err)
    }

}


async function getEthBalance(address: string) {
    try {
        const web3 = new Web3(ETH_RPC_URL);
        const balance = await web3.eth.getBalance(address)
        console.log(`
        ETH余额：${balance},
        余额转换：${web3.utils.fromWei(balance, 'ether')}
        `)
        return {
            name: 'ETH',
            balance: +web3.utils.fromWei(balance, 'ether') || 0
        }
    } catch (err) {
        console.log('get eth balance error', err)
    }
}

getBatchRequest()

// getTokenBalance('0x2BE3d3a38c6C5Ac27cA2c2DabE6A354b599c4E09', '0x514910771af9ca656af840dff83e8264ecf986ca', 'LINK')
// getWalletBalance()
// getEthBalance(user_address)

// console.log('web3实例', web3)
