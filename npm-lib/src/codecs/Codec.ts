export interface Encoder<U, R> {
    encode(data: U): R;
}

export interface Decoder<U, R> {
    decode(data: R): U;
}

export interface Codec<U, R> extends Encoder<U, R>, Decoder<U, R> {}


