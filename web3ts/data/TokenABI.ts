import type {AbiEntry, TokensType} from '../type/web3'

const Tokens: TokensType[] = [{
    "name": "Tether USD",
    "symbol": "USDT",
    "address": "0xdac17f958d2ee523a2206206994597c13d831ec7"
}, {"name": "BNB", "symbol": "BNB", "address": "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"}, {
    "name": "stETH",
    "symbol": "stETH",
    "address": "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
}, {"name": "USDC", "symbol": "USDC", "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"}, {
    "name": "SHIBA INU",
    "symbol": "SHIB",
    "address": "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"
}, {
    "name": "Wrapped TON Coin",
    "symbol": "TONCOIN",
    "address": "0x582d872a1b094fc48f5de31d3b73f2d9be47def1"
}, {
    "name": "ChainLink Token",
    "symbol": "LINK",
    "address": "0x514910771af9ca656af840dff83e8264ecf986ca"
}, {"name": "Wrapped BTC", "symbol": "WBTC", "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"}, {
    "name": "TRON",
    "symbol": "TRX",
    "address": "0x50327c6c5a14dcade707abad2e27eb517df87ab5"
}, {"name": "Uniswap", "symbol": "UNI", "address": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"}, {
    "name": "NEAR",
    "symbol": "NEAR",
    "address": "0x85f17cf997934a597031b2e18a9ab6ebd4b9f6a4"
}, {
    "name": "Bitfinex LEO Token",
    "symbol": "LEO",
    "address": "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3"
}, {
    "name": "Dai Stablecoin",
    "symbol": "DAI",
    "address": "0x6b175474e89094c44da98b954eedeac495271d0f"
}, {
    "name": "Arbitrum",
    "symbol": "ARB",
    "address": "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1"
}, {
    "name": "Render Token",
    "symbol": "RNDR",
    "address": "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24"
}, {"name": "Mantle", "symbol": "MNT", "address": "0x3c3a81e81dc49a522a592e7622a7e711c06bf354"}, {
    "name": "Immutable X",
    "symbol": "IMX",
    "address": "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff"
}, {"name": "OKB", "symbol": "OKB", "address": "0x75231f58b43240c9718dd58b4967c5114342a86c"}, {
    "name": "Cronos Coin",
    "symbol": "CRO",
    "address": "0xa0b73e1ff0b80914ab6fe0444e65848c4c34450b"
}, {
    "name": "Graph Token",
    "symbol": "GRT",
    "address": "0xc944e90c64b2c07662a292be6244bdf05cda44a7"
}, {
    "name": "Injective Token",
    "symbol": "INJ",
    "address": "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30"
}, {"name": "Pepe", "symbol": "PEPE", "address": "0x6982508145454ce325ddbe47a25d4ec3d2311933"}, {
    "name": "Fetch",
    "symbol": "FET",
    "address": "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85"
}, {
    "name": "VeChain",
    "symbol": "VEN",
    "address": "0xd850942ef8811f2a866692a623011bde52a462c1"
}, {
    "name": "Fantom Token",
    "symbol": "FTM",
    "address": "0x4e15361fd6b4bb609fa63c81a2be19d873717870"
}, {
    "name": "Theta Token",
    "symbol": "THETA",
    "address": "0x3883f5e181fccaf8410fa61e12b59bad963fb645"
}, {
    "name": "Maker",
    "symbol": "MKR",
    "address": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2"
}, {
    "name": "Lido DAO Token",
    "symbol": "LDO",
    "address": "0x5a98fcbea516cf06857215779fd812ca3bef1b32"
}, {
    "name": "First Digital USD",
    "symbol": "FDUSD",
    "address": "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409"
}, {"name": "FLOKI", "symbol": "FLOKI", "address": "0xcf0c122c6b73ff809c693db761e7baebe62b6a2e"}, {
    "name": "mETH",
    "symbol": "mETH",
    "address": "0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa"
}, {
    "name": "Rocket Pool ETH",
    "symbol": "rETH",
    "address": "0xae78736cd615f374d3085123a210448e74fc6393"
}, {"name": "Quant", "symbol": "QNT", "address": "0x4a220e6096b25eadb88358cb44068a3248254675"}, {
    "name": "Beam",
    "symbol": "BEAM",
    "address": "0x62D0A8458eD7719FDAF978fe5929C6D342B0bFcE"
}, {
    "name": "Staked Aave",
    "symbol": "stkAAVE",
    "address": "0x4da27a545c0c5b758a6ba100e3a049001de870f5"
}, {
    "name": "Wrapped eETH",
    "symbol": "weETH",
    "address": "0xcd5fe23c85820f7b72d0926fc9b05b43e359b7ee"
}, {
    "name": "Synthetix Network Token",
    "symbol": "SNX",
    "address": "0xd0dA9cBeA9C3852C5d63A95F9ABCC4f6eA0F9032"
}, {
    "name": "Synthetix Network Token",
    "symbol": "SNX",
    "address": "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f"
}, {
    "name": "Axie Infinity Shard",
    "symbol": "AXS",
    "address": "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b"
}, {
    "name": "SAND",
    "symbol": "SAND",
    "address": "0x3845badAde8e6dFF049820680d1F14bD3903a5d0"
}, {
    "name": "SingularityNET Token",
    "symbol": "AGIX",
    "address": "0x5b7533812759b45c2b44c19e320ba2cd2681b542"
}, {
    "name": "BitTorrent",
    "symbol": "BTT",
    "address": "0xc669928185dbce49d2230cc9b0979be6dc797957"
}, {
    "name": "ether.fi ETH",
    "symbol": "eETH",
    "address": "0x35fa164735182de50811e8e2e824cfb9b6118ac2"
}, {"name": "Worldcoin", "symbol": "WLD", "address": "0x163f8c2467924be0ae7b5347228cabf260318753"}, {
    "name": "Ribbon",
    "symbol": "RBN",
    "address": "0x6123b0049f904d730db3c36a31167d9d4121fa6b"
}, {"name": "Staked USDe", "symbol": "sUSDe", "address": "0x9D39A5DE30e57443BfF2A8307A4256c8797A3497"}, {
    "name": "USDe",
    "symbol": "USDe",
    "address": "0x4c9edd5852cd905f086c759e8383e09bff1e68b3"
}, {"name": "BitgetToken", "symbol": "BGB", "address": "0x19de6b897ed14a376dda0fe53a5420d2ac828a28"}, {
    "name": "chiliZ",
    "symbol": "CHZ",
    "address": "0x3506424f91fd33084466f402d5d97f05f8e3b4af"
}, {"name": "ApeCoin", "symbol": "APE", "address": "0x4d224452801aced8b2f0aebe155379bb5d594381"}]


const ERC20ABI: AbiEntry[] = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
]


export {
    Tokens,
    ERC20ABI
}