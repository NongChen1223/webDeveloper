type TokensType = Record<"address" | "symbol", string>;
interface OnlyAddress <T extends Record<PropertyKey, unknown>> {
    address: string;
    [key: PropertyKey]: T[keyof T];
}
interface OnlyId <T extends Record<PropertyKey, unknown>> {
    address: string;
    [key: PropertyKey]: T[keyof T];
}

export type {
    OnlyAddress,
    OnlyId,
    TokensType
}