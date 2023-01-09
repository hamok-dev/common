export interface Encoder<U, R> {
    encode(data: U): R;
}

export interface Decoder<U, R> {
    decode(data: R): U;
}

export function createCodec<U, R>(encode: (input: U) => R, decode: (input: R) => U): Codec<U, R> {
    return {
        encode,
        decode,
    }
}

export interface Codec<U, R> extends Encoder<U, R>, Decoder<U, R> {}


