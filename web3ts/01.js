"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var WebSocket = require("isomorphic-ws");
var ETH_RPC_URL = 'https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa';
var web3 = new Web3(ETH_RPC_URL);
var ws;
try {
    ws = new WebSocket('ws://www.host.com/path');
}
catch (e) {
    console.error("ws create error ".concat(e));
}
console.log('web3实例', web3);
