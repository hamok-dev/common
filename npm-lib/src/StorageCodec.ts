import * as Collections from "./Collections";
import { Codec } from "./codecs/Codec";
import { UpdateEntriesNotification, UpdateEntriesRequest, UpdateEntriesResponse } from "./messagetypes/UpdateEntries";
import { Message, Message_MessageType } from "./Models";
import { ClearEntriesNotification, ClearEntriesRequest, ClearEntriesResponse } from "./messagetypes/ClearEntries";
import { GetEntriesRequest, GetEntriesResponse } from "./messagetypes/GetEntries";
import { GetKeysRequest, GetKeysResponse } from "./messagetypes/GetKeys";
import { DeleteEntriesNotification, DeleteEntriesRequest, DeleteEntriesResponse } from "./messagetypes/DeleteEntries";
import { RemoveEntriesNotification, RemoveEntriesRequest, RemoveEntriesResponse } from "./messagetypes/RemoveEntries";
import { EvictEntriesNotification, EvictEntriesRequest, EvictEntriesResponse } from "./messagetypes/EvictEntries";
import { InsertEntriesNotification, InsertEntriesRequest, InsertEntriesResponse } from "./messagetypes/InsertEntries";
import { PublishCustomDataNotification, PublishCustomDataRequest, PublishCustomDataResponse } from "./messagetypes/PublishCustomData";

const EMPTY_ARRAY: Uint8Array[] = [];

export type UpdateRequestListener<K, V> = (request: UpdateEntriesRequest<K, V>) => void;

export class StorageCodec<K, V> {
    private _keyCodec: Codec<K, Uint8Array>;
    private _valueCodec: Codec<V, Uint8Array>;

    public constructor(keyCodec: Codec<K, Uint8Array>, valueCodec: Codec<V, Uint8Array>) {
        this._keyCodec = keyCodec;
        this._valueCodec = valueCodec;
    }

    // public encodeClearEntriesRequest(request: ClearEntriesRequest<K>): Message | undefined {

    // }

    // public decodeClearEntriesRequest(message: Message): ClearEntriesRequest<K> | undefined {

    // }
    
    // public encodeClearEntriesResponse(response: ClearEntriesResponse): Message | undefined {

    // }

    // public decodeClearEntriesResponse(message: Message): ClearEntriesResponse | undefined {

    // }

    // public encodeClearEntriesNotification(notification: ClearEntriesNotification): Message | undefined {

    // }

    // public decodeClearEntriesNotification(message: Message): ClearEntriesNotification | undefined {

    // }


    // public encodeGetEntriesRequest(request: GetEntriesRequest<K>): Message | undefined {

    // }

    // public decodeGetEntriesRequest(message: Message): GetEntriesRequest<K> | undefined {

    // }
    
    // public encodeGetEntriesResponse(response: GetEntriesResponse<K, V>): Message | undefined {

    // }

    // public decodeGetEntriesResponse(message: Message): GetEntriesResponse<K, V> | undefined {

    // }


    // public encodeGetKeysRequest(request: GetKeysRequest): Message | undefined {

    // }

    // public decodeGetKeysRequest(message: Message): GetKeysRequest | undefined {

    // }
    
    // public encodeGetKeysResponse(response: GetKeysResponse<K>): Message | undefined {

    // }

    // public decodeGetKeysResponse(message: Message): GetKeysResponse<K> | undefined {

    // }


    // public encodeDeleteRequest(request: DeleteEntriesRequest<K>): Message | undefined {

    // }

    // public decodeDeleteRequest(message: Message): DeleteEntriesRequest<K> | undefined {

    // }
    
    // public encodeDeleteResponse(response: DeleteEntriesResponse<K>): Message | undefined {

    // }

    // public decodeDeleteResponse(message: Message): DeleteEntriesResponse<K> | undefined {

    // }

    // public encodeDeleteNotification(response: DeleteEntriesNotification<K>): Message | undefined {

    // }

    // public decodeDeleteNotification(message: Message): DeleteEntriesNotification<K> | undefined {

    // }

    
    
    // public encodeRemoveRequest(request: RemoveEntriesRequest<K>): Message | undefined {

    // }

    // public decodeRemoveRequest(message: Message): RemoveEntriesRequest<K> | undefined {

    // }
    
    // public encodeRemoveResponse(response: RemoveEntriesResponse<K, V>): Message | undefined {

    // }

    // public decodeRemoveResponse(message: Message): RemoveEntriesResponse<K, V> | undefined {

    // }

    // public encodeRemoveNotification(response: RemoveEntriesNotification<K>): Message | undefined {

    // }

    // public decodeRemoveNotification(message: Message): RemoveEntriesNotification<K> | undefined {

    // }



    
    // public encodeEvictRequest(request: EvictEntriesRequest<K>): Message | undefined {

    // }

    // public decodeEvictRequest(message: Message): EvictEntriesRequest<K> | undefined {

    // }
    
    // public encodeEvictResponse(response: EvictEntriesResponse): Message | undefined {

    // }

    // public decodeEvictResponse(message: Message): EvictEntriesResponse | undefined {

    // }

    // public encodeEvictNotification(response: EvictEntriesNotification<K>): Message | undefined {

    // }

    // public decodeEvictNotification(message: Message): EvictEntriesNotification<K> | undefined {

    // }
    


    // public encodeInsertRequest(request: InsertEntriesRequest<K, V>): Message | undefined {

    // }

    // public decodeInsertRequest(message: Message): InsertEntriesRequest<K, V> | undefined {

    // }
    
    // public encodeInsertResponse(response: InsertEntriesResponse<K, V>): Message | undefined {

    // }

    // public decodeInsertResponse(message: Message): InsertEntriesResponse<K, V> | undefined {

    // }

    // public encodeInsertNotification(response: InsertEntriesNotification<K, V>): Message | undefined {

    // }

    // public decodeInsertNotification(message: Message): InsertEntriesNotification<K, V> | undefined {

    // }



    // public encodeUpdateEntriesRequest(request: UpdateEntriesRequest<K, V>): Message | undefined {
    //     const [keys, values] = this._encodeEntries(request.entries);
    //     return new Message({
    //         type: Message_MessageType.UPDATE_ENTRIES_REQUEST,
    //         sourceId: request.sourceEndpointId,
    //         requestId: request.requestId,
    //         keys,
    //         values,
    //     });
    // }

    // public decodeUpdateEntriesRequest(message: Message): UpdateEntriesRequest<K, V> | undefined {

    // }
    
    // public encodeUpdateEntriesResponse(response: UpdateEntriesResponse<K, V>): Message | undefined {

    // }

    // public decodeUpdateEntriesResponse(message: Message): UpdateEntriesResponse<K, V> | undefined {

    // }

    // public encodeUpdateEntriesNotification(notification: UpdateEntriesNotification<K, V>): Message | undefined {

    // }

    // public decodeUpdateEntriesNotification(message: Message): UpdateEntriesNotification<K, V> | undefiend {
        
    // }



    // public encodePublishCustomDataRequest(request: PublishCustomDataRequest<K>): Message | undefined {

    // }

    // public decodePublishCustomDataRequest(message: Message): PublishCustomDataRequest<K> | undefined {

    // }
    
    // public encodePublishCustomDataResponse(response: PublishCustomDataResponse): Message | undefined {

    // }

    // public decodePublishCustomDataResponse(message: Message): PublishCustomDataResponse | undefined {

    // }

    // public encodePublishCustomDataNotification(notification: PublishCustomDataNotification<K>): Message | undefined {

    // }

    // public decodePublishCustomDataNotification(message: Message): PublishCustomDataNotification<K> | undefined {
        
    // }


    private _encodeKeys(keys: Set<K>): Readonly<Uint8Array[]> {
        if (keys.size < 1) {
            return EMPTY_ARRAY;
        }
        const result: Uint8Array[] = [];
        for (const key of keys) {
            const encodedKey = this._keyCodec.encode(key);
            result.push(encodedKey);
        }
        return result;
    }

    private _decodeKeys(keys: Uint8Array[]): ReadonlySet<K> {
        if (keys.length < 1) {
            return Collections.EMPTY_SET;
        }
        const result = new Set<K>();
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            const decodedKey = this._keyCodec.decode(key);
            result.add(decodedKey);
        }
        return result;
    }

    private _encodeEntries(entries: Map<K, V>): Readonly<[Uint8Array[], Uint8Array[]]> {
        if (entries.size < 1) {
            return [[], []];
        }
        const encodedKeys: Uint8Array[] = [];
        const encodedValues: Uint8Array[] = [];
        for (const [key, value] of entries) {
            const encodedKey = this._keyCodec.encode(key);
            const encodedValue = this._valueCodec.encode(value);
            encodedKeys.push(encodedKey);
            encodedValues.push(encodedValue);
        }
        return [encodedKeys, encodedValues];
    }

    private _decodeEntries(keys: Uint8Array[], values: Uint8Array[]): ReadonlyMap<K, V> {
        if (keys.length < 1 || values.length < 1) {
            return Collections.EMPTY_MAP;
        }
        const result = new Map<K, V>();
        const length = Math.min(keys.length, values.length);
        for (let i = 0; i < length; ++i) {
            const key = keys[i];
            const value = values[i];
            const decodedKey = this._keyCodec.decode(key);
            const decodedValue = this._valueCodec.decode(value);
            result.set(decodedKey, decodedValue);
        }
        return result;
    }
}