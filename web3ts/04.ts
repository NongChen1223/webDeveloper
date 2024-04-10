import Web3 from "web3";
import { ERC20ABI } from "./data/TokenABI";
import { Tokens } from "/uniswap/data/tokens";
import { JsonRpcOptionalRequest, JsonRpcBatchResponse,JsonRpcResult } from 'web3-types';
const ETH_RPC_URL = "https://eth-mainnet.alchemyapi.io/v2/R6mZwt31pb4DdV4cAriiPoxHYJhKcKVa";
// const ETH_RPC_URL = "https://eth.llamarpc.com";
const WALLET_ADDRESS = "0xdD831352762e9de7ad5a264990e1bB9F87A6Fc21";
const web3 = new Web3(ETH_RPC_URL);
type TokensType = Record<"name" | "address" | "symbol", string>;
interface RpcType {
    id: number;
    token: string;
}
interface HoldType {
    token: string;
    balance: number;
}
interface JsonRpcBatchRes {
    jsonrpc: string;
    id: number;
    result: string;
}

const newTokenContract = (address: string) => {
    const contract = new web3.eth.Contract(ERC20ABI, address);
    return contract;
};
const createRpc = (item: TokensType, index: number): RpcType => {
    return {
        id: index,
        token: item.symbol,
    };
};
const tokenList: TokensType[] = Tokens;
const JSON_RPC_LIST = tokenList.map<RpcType>(createRpc);

const createRequest = (item: TokensType, index: number): JsonRpcOptionalRequest => {
    const baseData: Partial<JsonRpcOptionalRequest> = {
        jsonrpc: "2.0",
        id: index,
    };
    // if (index === 0) {
    //     return {
    //         ...baseData,
    //         method: "eth_getBalance",
    //         params: [WALLET_ADDRESS, "latest"],
    //     };
    // }
    return {
        ...baseData,
        method: "eth_call",
        params: [
            {
                form: "0x514910771af9ca656af840dff83e8264ecf986ca",
                to: item.address,
                data: newTokenContract(item.address).methods.balanceOf(WALLET_ADDRESS).encodeABI(),
            },
            "latest",
        ],
    };
};

const waitMapped = <
    R extends JsonRpcResult = JsonRpcResult,
    E extends JsonRpcResult = JsonRpcResult,
>(
    item: JsonRpcBatchResponse<R, E>[number],
): HoldType => ({
    token: JSON_RPC_LIST.find(item1 => item1.id === item.id)?.token || "",
    balance: Number(web3.utils.fromWei(BigInt(item.result as string), "ether")),
});
const predicate = (item: HoldType) => item.balance > 0 && item.token;

const createTokenJsonRpcList = async <
    R extends JsonRpcResult = JsonRpcResult,
    E extends JsonRpcResult = JsonRpcResult,
>(list:any[]):Promise<HoldType[]> => {
    const web3 = new Web3(ETH_RPC_URL);
    const batch = new web3.BatchRequest();
    list.forEach((item, i) => {
        batch.add(createRequest(item, i));
    });
    const jsonResponse = (await batch.execute()) as JsonRpcBatchResponse<R, E>;
    const holdList = jsonResponse.map<HoldType>(waitMapped).filter(predicate);
    console.log("结果", holdList);
    return holdList
};
const createchunkJsonRpc = async (list:any,chunkSize:number)=>{
    const waitMapFn = (_: (typeof list)[number], index: number) => list.slice(index * chunkSize, (index + 1) * chunkSize)
    const chunkList:any[] = Array.from({length: Math.ceil(list.length / chunkSize)}, waitMapFn)
    return chunkList
}
const getWalletBalance = async (list:TokensType[],chunkSize:number = 50) => {
    const chunkList = await createchunkJsonRpc(list,chunkSize)
    const promiseList = chunkList.map(async (item:any,index:number) => {
        return await createTokenJsonRpcList(item)
    })
    // console.log('分批请求',promiseList)
    const result = await Promise.all(promiseList)
     console.log('分批请求',result.flat())
}
getWalletBalance(Tokens,50)