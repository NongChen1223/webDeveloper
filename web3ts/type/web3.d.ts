type  TokensType = Record<"name" | "address" | "symbol", string>;
type  PutType = Record<"name" | "type", string>;
type  BlanceListType = {
    name:string,
    balance:number
}

interface BalanceOfInterface {
    constant: boolean;
    inputs: PutType[];
    name: string;
    outputs: PutType[];
    payable: boolean;
    stateMutability: string;
    type: string;
}

export type {
    TokensType,
    PutType,
    BalanceOfInterface,
    BlanceListType
}
