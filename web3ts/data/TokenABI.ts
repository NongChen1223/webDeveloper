import type { BalanceOfInterface,TokensType } from  '../type/web3'
const Tokens: TokensType[] = [{
    name: "USDT",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
},{
    name:"BNB",
    address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
},{
    name: "stETH",
    address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
},{
    name: "USDC",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
},{
    name: "TONCOIN",
    address: "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
},{
    name:"SHIB",
    address: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
},{
    name:"LINK",
    address:"0x514910771af9ca656af840dff83e8264ecf986ca"
},{
    name: "WBTC",
    address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
},{
    name:"TRX",
    address:"0x50327c6c5a14dcade707abad2e27eb517df87ab5"
},{
    name:"UNI",
    address:"0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
},{
    name: "ALT",
    address: "0x8457CA5040ad67fdebbCC8EdCE889A335Bc0fbFB",
}, {
    name:"NEAR",
    address: "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4"
},{
    name:"LEO",
    address:"0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3"
},{
    name:"DAI",
    address:"0x6b175474e89094c44da98b954eedeac495271d0f"
},,{
    name:"ARB",
    address:"0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1"
},,{
    name:"IMX",
    address:"0xf57e7e7c23978c3caec3c3548e3d615c346e79ff"
},,{
    name:"RNDR",
    address:"0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24"
},,{
    name:"CRO",
    address:"0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b"
},,{ni
    name:"OKB",
    address:"0x75231f58b43240c9718dd58b4967c5114342a86c"
},,{
    name:"INJ",
    address:"0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30"
},,{
    name:"PEPE",
    address:"0x6982508145454ce325ddbe47a25d4ec3d2311933"
},,{
    name:"VEN",
    address:"0xd850942ef8811f2a866692a623011bde52a462c1"
},,{
    name:"FTM",
    address:"0x4e15361fd6b4bb609fa63c81a2be19d873717870"
},,{
    name:"THETA",
    address:"0x3883f5e181fccaf8410fa61e12b59bad963fb645"
},,{
    name:"MKR",
    address:"0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},,{
    name:"",
    address:""
},{
    name: "INST",
    address: "0x6f40d4a6237c257fff2db00fa0510deeecd303eb",
}, {
    name: "GRT",
    address: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
}, {
    name: "LDO",
    address: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
}]

const ContractABI:BalanceOfInterface[] = [{
    "constant": true,
    "inputs": [{"name": "who", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}]


export {
    Tokens,
    ContractABI
}