type  TokensType = Record<"name"| "address",string>;
type PutType = Record<"name"| "type",string>;
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
    BalanceOfInterface
}
