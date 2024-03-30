type  TokensType = Record<"name" | "address" | "symbol", string>;
type  PutType = Record<"name" | "type", string>;
type  BlanceListType = {
    name:string,
    balance:number
}

type JsonRpcParams = Record<"form" | "to" | "data">
type AbiEntry = AbiFunction | AbiEvent | AbiFallback;
interface BalanceOfInterface {
    constant: boolean;
    inputs: PutType[];
    name: string;
    outputs: PutType[];
    payable: boolean;
    stateMutability: string;
    type: string;
}

interface AbiFunction {
    constant: boolean;
    inputs: PutType[];
    name: string;
    outputs: PutType[];
    payable: boolean;
    stateMutability: string;
    type: string;

}

interface AbiEventInput {
    indexed: boolean;
    name: string;
    type: string;
}

interface AbiEvent {
    anonymous: boolean;
    inputs: AbiEventInput[];
    name: string;
    type: string;
}

interface AbiFallback {
    payable:boolean;
    stateMutability:string;
    type:string;
}

interface JsonRpcRequestBody {
    id: number;
    jsonrpc: string;
    method: string;
    params: any[];
}
interface JsonRpcParams {

}

export type {
    TokensType,
    PutType,
    BalanceOfInterface,
    BlanceListType,
    AbiEntry
}
