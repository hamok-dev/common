import * as Collections from "./Collections";
import { Codec, createCodec, Decoder, Encoder } from "./codecs/Codec";
import { UpdateEntriesNotification, UpdateEntriesRequest, UpdateEntriesResponse } from "./messagetypes/UpdateEntries";
import { Message, Message_MessageType as MessageType } from "./Models";
import { ClearEntriesNotification, ClearEntriesRequest, ClearEntriesResponse } from "./messagetypes/ClearEntries";
import { GetEntriesRequest, GetEntriesResponse } from "./messagetypes/GetEntries";
import { GetKeysRequest, GetKeysResponse } from "./messagetypes/GetKeys";
import { DeleteEntriesNotification, DeleteEntriesRequest, DeleteEntriesResponse } from "./messagetypes/DeleteEntries";
import { RemoveEntriesNotification, RemoveEntriesRequest, RemoveEntriesResponse } from "./messagetypes/RemoveEntries";
import { EvictEntriesNotification, EvictEntriesRequest, EvictEntriesResponse } from "./messagetypes/EvictEntries";
import { InsertEntriesNotification, InsertEntriesRequest, InsertEntriesResponse } from "./messagetypes/InsertEntries";
import { GetSizeRequest, GetSizeResponse } from "./messagetypes/GetSize";
import { OngoingRequestsNotification } from "./messagetypes/OngoingRequestsNotification";
import { RestoreEntriesNotification, RestoreEntriesRequest, RestoreEntriesResponse } from "./messagetypes/RestoreEntries";

const EMPTY_ARRAY: Uint8Array[] = [];

type Input<K, V> = 
    ClearEntriesNotification |
    ClearEntriesRequest |
    ClearEntriesResponse |
    GetEntriesRequest<K> |
    GetEntriesResponse<K, V> |
    GetKeysRequest |
    GetKeysResponse<K> |
    GetSizeRequest |
    GetSizeResponse |
    DeleteEntriesNotification<K> |
    DeleteEntriesRequest<K> |
    DeleteEntriesResponse<K> |
    RemoveEntriesNotification<K> |
    RemoveEntriesRequest<K> |
    RemoveEntriesResponse<K, V> |
    EvictEntriesNotification<K> |
    EvictEntriesRequest<K> |
    EvictEntriesResponse |
    InsertEntriesNotification<K, V> |
    InsertEntriesRequest<K, V> |
    InsertEntriesResponse<K, V> |
    UpdateEntriesNotification<K, V> |
    UpdateEntriesRequest<K, V> |
    UpdateEntriesResponse<K, V>
    ;

const strCodec = createCodec<string, Uint8Array>(
    (input: string) => Buffer.from(input, "utf-8"),
    (input: Uint8Array) => Buffer.from(input).toString("utf-8")
)

export class StorageCodec<K, V> implements Codec<Input<K, V>, Message> {
    private _keyCodec: Codec<K, Uint8Array>;
    private _valueCodec: Codec<V, Uint8Array>;

    public constructor(keyCodec: Codec<K, Uint8Array>, valueCodec: Codec<V, Uint8Array>) {
        this._keyCodec = keyCodec;
        this._valueCodec = valueCodec;
    }

    encode(input: Input<K, V>): Message {
        switch (input.constructor) {
            case OngoingRequestsNotification:
                return this.encodeOngoingRequestsNotification(input as OngoingRequestsNotification);

            case ClearEntriesRequest:
                return this.encodeClearEntriesRequest(input as ClearEntriesRequest);
            case ClearEntriesResponse:
                return this.encodeClearEntriesResponse(input as ClearEntriesResponse);
            case ClearEntriesNotification:
                return this.encodeClearEntriesNotification(input as ClearEntriesNotification);

            case GetEntriesRequest:
                return this.encodeGetEntriesRequest(input as GetEntriesRequest<K>);
            case GetEntriesResponse:
                return this.encodeGetEntriesResponse(input as GetEntriesResponse<K, V>);
   
            case GetKeysRequest:
                return this.encodeGetKeysRequest(input as GetKeysRequest);
            case GetKeysResponse:
                return this.encodeGetKeysResponse(input as GetKeysResponse<K>);

            case GetSizeRequest:
                return this.encodeGetSizeRequest(input as GetSizeRequest);
            case GetSizeResponse:
                return this.encodeGetSizeResponse(input as GetSizeResponse);

            case DeleteEntriesRequest:
                return this.encodeDeleteEntriesRequest(input as DeleteEntriesRequest<K>);
            case DeleteEntriesResponse:
                return this.encodeDeleteEntriesResponse(input as DeleteEntriesResponse<K>);
            case DeleteEntriesNotification:
                return this.encodeDeleteEntriesNotification(input as DeleteEntriesNotification<K>);

            case RemoveEntriesRequest:
                return this.encodeRemoveEntriesRequest(input as RemoveEntriesRequest<K>);
            case RemoveEntriesResponse:
                return this.encodeRemoveEntriesResponse(input as RemoveEntriesResponse<K, V>);
            case RemoveEntriesNotification:
                return this.encodeDeleteEntriesNotification(input as RemoveEntriesNotification<K>);

            case EvictEntriesRequest:
                return this.encodeEvictEntriesRequest(input as EvictEntriesRequest<K>);
            case EvictEntriesResponse:
                return this.encodeEvictEntriesResponse(input as EvictEntriesResponse);
            case EvictEntriesNotification:
                return this.encodeRemoveEntriesNotification(input as EvictEntriesNotification<K>);
                
            case InsertEntriesRequest:
                return this.encodeInsertEntriesRequest(input as InsertEntriesRequest<K, V>);
            case InsertEntriesResponse:
                return this.encodeInsertEntriesResponse(input as InsertEntriesResponse<K, V>);
            case InsertEntriesNotification:
                return this.encodeInsertEntriesNotification(input as InsertEntriesNotification<K, V>);

            case UpdateEntriesRequest:
                return this.encodeUpdateEntriesRequest(input as UpdateEntriesRequest<K, V>);
            case UpdateEntriesResponse:
                return this.encodeUpdateEntriesResponse(input as UpdateEntriesResponse<K, V>);
            case UpdateEntriesNotification:
                return this.encodeUpdateEntriesNotification(input as UpdateEntriesNotification<K, V>);

            case RestoreEntriesRequest:
                return this.encodeRestoreEntriesRequest(input as RestoreEntriesRequest<K, V>);
            case RestoreEntriesResponse:
                return this.encodeRestoreEntriesResponse(input as RestoreEntriesResponse);
            case RestoreEntriesNotification:
                return this.encodeRestoreEntriesNotification(input as RestoreEntriesNotification<K, V>);
            default:
                throw new Error(`Cannot encode input` + input);
        }
    }

    decode(message: Message): Input<K, V> {
        switch (message.type) {
            case MessageType.ONGOING_REQUESTS_NOTIFICATION:
                return this.decodeOngoingRequestsNotification(message);

            case MessageType.CLEAR_ENTRIES_REQUEST:
                return this.decodeClearEntriesRequest(message);
            case MessageType.CLEAR_ENTRIES_RESPONSE:
                return this.decodeClearEntriesResponse(message);
            case MessageType.CLEAR_ENTRIES_NOTIFICATION:
                return this.decodeClearEntriesNotification(message);

            case MessageType.GET_ENTRIES_REQUEST:
                return this.decodeGetEntriesRequest(message);
            case MessageType.GET_ENTRIES_RESPONSE:
                return this.decodeGetEntriesResponse(message);

            case MessageType.GET_SIZE_REQUEST:
                return this.decodeGetSizeRequest(message);
            case MessageType.GET_SIZE_RESPONSE:
                return this.decodeGetSizeResponse(message);

            case MessageType.GET_KEYS_REQUEST:
                return this.decodeGetKeysRequest(message);
            case MessageType.GET_KEYS_RESPONSE:
                return this.decodeGetKeysResponse(message);

            case MessageType.DELETE_ENTRIES_REQUEST:
                return this.decodeDeleteEntriesRequest(message);
            case MessageType.DELETE_ENTRIES_RESPONSE:
                return this.decodeDeleteEntriesResponse(message);
            case MessageType.DELETE_ENTRIES_NOTIFICATION:
                return this.decodeDeleteEntriesNotification(message);

            case MessageType.REMOVE_ENTRIES_REQUEST:
                return this.decodeRemoveEntriesRequest(message);
            case MessageType.REMOVE_ENTRIES_RESPONSE:
                return this.decodeRemoveEntriesResponse(message);
            case MessageType.REMOVE_ENTRIES_NOTIFICATION:
                return this.decodeRemoveEntriesNotification(message);

            case MessageType.EVICT_ENTRIES_REQUEST:
                return this.decodeEvictEntriesRequest(message);
            case MessageType.EVICT_ENTRIES_RESPONSE:
                return this.decodeRemoveEntriesResponse(message);
            case MessageType.EVICT_ENTRIES_NOTIFICATION:
                return this.decodeEvictEntriesNotification(message);
                
            case MessageType.INSERT_ENTRIES_REQUEST:
                return this.decodeInsertEntriesRequest(message);
            case MessageType.INSERT_ENTRIES_RESPONSE:
                return this.decodeInsertEntriesResponse(message);
            case MessageType.INSERT_ENTRIES_NOTIFICATION:
                return this.decodeInsertEntriesNotification(message);

            case MessageType.UPDATE_ENTRIES_REQUEST:
                return this.decodeUpdateEntriesRequest(message);
            case MessageType.UPDATE_ENTRIES_RESPONSE:
                return this.decodeUpdateEntriesResponse(message);
            case MessageType.UPDATE_ENTRIES_NOTIFICATION:
                return this.decodeUpdateEntriesNotification(message);

            case MessageType.RESTORE_ENTRIES_REQUEST:
                return this.decodeRestoreEntriesRequest(message);
            case MessageType.RESTORE_ENTRIES_RESPONSE:
                return this.decodeRestoreEntriesResponse(message);
            case MessageType.RESTORE_ENTRIES_NOTIFICATION:
                return this.decodeRestoreEntriesNotification(message);
            default:
                throw new Error(`Cannot decode message` + message);
        }
    }

    public encodeOngoingRequestsNotification(notification: OngoingRequestsNotification): Message {
        const keys = this._encodeSet<string>(notification.requestIds, strCodec);
        return new Message({
            type: MessageType.ONGOING_REQUESTS_NOTIFICATION,
            destinationId: notification.destinationEndpointId,
            keys,
        });
    }

    public decodeOngoingRequestsNotification(message: Message): OngoingRequestsNotification {
        if (message.type !== MessageType.ONGOING_REQUESTS_NOTIFICATION) {
            throw new Error(`decodeOngoingRequestsNotification(): Message type must be ONGOING_REQUESTS_NOTIFICATION`);
        }
        const requestIds = this._decodeSet<string>(message.keys, strCodec);
        return new OngoingRequestsNotification(
            requestIds,
            message.destinationId,
        );
    }

    public encodeClearEntriesRequest(request: ClearEntriesRequest): Message {
        return new Message({
            type: MessageType.CLEAR_ENTRIES_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId,
        });
    }

    public decodeClearEntriesRequest(message: Message): ClearEntriesRequest {
        if (message.type !== MessageType.CLEAR_ENTRIES_REQUEST) {
            throw new Error(`decodeClearEntriesRequest(): Message type must be CLEAR_ENTRIES_REQUEST`);
        }
        return new ClearEntriesRequest(
            message.requestId!,
            message.sourceId,
        );
    }
    
    public encodeClearEntriesResponse(response: ClearEntriesResponse): Message {
        return new Message({
            type: MessageType.CLEAR_ENTRIES_RESPONSE,
            requestId: response.requestId,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeClearEntriesResponse(message: Message): ClearEntriesResponse {
        if (message.type !== MessageType.CLEAR_ENTRIES_RESPONSE) {
            throw new Error(`decodeClearEntriesResponse(): Message type must be CLEAR_ENTRIES_RESPONSE`);
        }
        return new ClearEntriesResponse(
            message.requestId!,
            message.destinationId,
        );
    }

    public encodeClearEntriesNotification(notification: ClearEntriesNotification): Message {
        return new Message({
            type: MessageType.CLEAR_ENTRIES_NOTIFICATION,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
        });
    }

    public decodeClearEntriesNotification(message: Message): ClearEntriesNotification {
        if (message.type !== MessageType.CLEAR_ENTRIES_NOTIFICATION) {
            throw new Error(`decodeClearEntriesNotification(): Message type must be CLEAR_ENTRIES_NOTIFICATION`);
        }
        return new ClearEntriesNotification(
            message.sourceId,
            message.destinationId,
        );
    }


    public encodeGetEntriesRequest(request: GetEntriesRequest<K>): Message {
        const keys = this._encodeKeys(request.keys);
        return new Message({
            type: MessageType.GET_ENTRIES_REQUEST,
            requestId: request.requestId,
            keys,
            sourceId: request.sourceEndpointId,
        });
    }

    public decodeGetEntriesRequest(message: Message): GetEntriesRequest<K> {
        if (message.type !== MessageType.GET_ENTRIES_REQUEST) {
            throw new Error(`decodeGetEntriesRequest(): Message type must be GET_ENTRIES_REQUEST`);
        }
        const keys = this._decodeKeys(message.keys);
        return new GetEntriesRequest<K>(
            keys,
            message.requestId!,
            message.sourceId,
        );
    }

    public encodeGetEntriesResponse(response: GetEntriesResponse<K, V>): Message {
        const [keys, values] = this._encodeEntries(response.foundEntries);
        return new Message({
            type: MessageType.GET_ENTRIES_RESPONSE,
            requestId: response.requestId,
            keys,
            values,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeGetEntriesResponse(message: Message): GetEntriesResponse<K, V> {
        if (message.type !== MessageType.GET_ENTRIES_RESPONSE) {
            throw new Error(`decodeGetEntriesResponse(): Message type must be GET_ENTRIES_RESPONSE`);
        }
        const foundEntries = this._decodeEntries(message.keys, message.values);
        return new GetEntriesResponse<K, V>(
            message.requestId!,
            foundEntries,
            message.destinationId,
        );
    }

    public encodeGetSizeRequest(request: GetSizeRequest): Message {
        return new Message({
            type: MessageType.GET_SIZE_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId
        });
    }


    public decodeGetSizeRequest(message: Message): GetSizeRequest {
        if (message.type !== MessageType.GET_SIZE_REQUEST) {
            throw new Error(`decodeGetSizeRequest(): Message type must be GET_SIZE_REQUEST`);
        }
        return new GetSizeRequest(
            message.requestId!,
            message.sourceId,
        );
    }
    
    public encodeGetSizeResponse(response: GetSizeResponse): Message {
        return new Message({
            type: MessageType.GET_SIZE_RESPONSE,
            requestId: response.requestId,
            storageSize: response.size,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeGetSizeResponse(message: Message): GetSizeResponse {
        if (message.type !== MessageType.GET_SIZE_RESPONSE) {
            throw new Error(`decodeGetSizeResponse(): Message type must be GET_SIZE_RESPONSE`);
        }
        return new GetSizeResponse(
            message.requestId!,
            message.storageSize!,
            message.destinationId,
        );
    }

    public encodeGetKeysRequest(request: GetKeysRequest): Message {
        return new Message({
            type: MessageType.GET_KEYS_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId
        });
    }

    public decodeGetKeysRequest(message: Message): GetKeysRequest {
        if (message.type !== MessageType.GET_KEYS_REQUEST) {
            throw new Error(`decodeGetKeysRequest(): Message type must be GET_KEYS_REQUEST`);
        }
        return new GetKeysRequest(
            message.requestId!,
            message.sourceId,
        );
    }
    
    public encodeGetKeysResponse(response: GetKeysResponse<K>): Message {
        const keys = this._encodeKeys(response.keys);
        return new Message({
            type: MessageType.GET_KEYS_RESPONSE,
            requestId: response.requestId,
            destinationId: response.destinationEndpointId,
            keys
        });
    }

    public decodeGetKeysResponse(message: Message): GetKeysResponse<K> {
        if (message.type !== MessageType.GET_KEYS_RESPONSE) {
            throw new Error(`decodeGetKeysResponse(): Message type must be GET_ENTRIES_RESPONSE`);
        }
        const keys = this._decodeKeys(message.keys);
        return new GetKeysResponse<K>(
            message.requestId!,
            keys,
            message.destinationId,
        );
    }


    public encodeDeleteEntriesRequest(request: DeleteEntriesRequest<K>): Message {
        const keys = this._encodeKeys(request.keys);
        return new Message({
            type: MessageType.DELETE_ENTRIES_REQUEST,
            requestId: request.requestId,
            keys,
            sourceId: request.sourceEndpointId
        });
    }

    public decodeDeleteEntriesRequest(message: Message): DeleteEntriesRequest<K> {
        if (message.type !== MessageType.DELETE_ENTRIES_REQUEST) {
            throw new Error(`decodeDeleteEntriesRequest(): Message type must be DELETE_ENTRIES_REQUEST`);
        }
        const keys = this._decodeKeys(message.keys);
        return new DeleteEntriesRequest<K>(
            message.requestId!,
            keys,
            message.sourceId,
        );
    }
    
    public encodeDeleteEntriesResponse(response: DeleteEntriesResponse<K>): Message {
        const keys = this._encodeKeys(response.deletedKeys);
        return new Message({
            type: MessageType.DELETE_ENTRIES_RESPONSE,
            requestId: response.requestId,
            keys,
            destinationId: response.destinationEndpointId
        });
    }

    public decodeDeleteEntriesResponse(message: Message): DeleteEntriesResponse<K> {
        if (message.type !== MessageType.DELETE_ENTRIES_RESPONSE) {
            throw new Error(`decodeDeleteEntriesResponse(): Message type must be DELETE_ENTRIES_RESPONSE`);
        }
        const deletedKeys = this._decodeKeys(message.keys);
        return new DeleteEntriesResponse<K>(
            message.requestId!,
            deletedKeys,
            message.destinationId,
        );
    }

    public encodeDeleteEntriesNotification(notification: DeleteEntriesNotification<K>): Message {
        const keys = this._encodeKeys(notification.keys);
        return new Message({
            type: MessageType.DELETE_ENTRIES_NOTIFICATION,
            keys,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId
        });
    }

    public decodeDeleteEntriesNotification(message: Message): DeleteEntriesNotification<K> {
        if (message.type !== MessageType.DELETE_ENTRIES_NOTIFICATION) {
            throw new Error(`decodeDeleteNotification(): Message type must be DELETE_ENTRIES_NOTIFICATION`);
        }
        const keys = this._decodeKeys(message.keys);
        return new DeleteEntriesNotification<K>(
            keys,
            message.sourceId,
            message.destinationId,
        );
    }
    
    public encodeRemoveEntriesRequest(request: RemoveEntriesRequest<K>): Message {
        const keys = this._encodeKeys(request.keys);
        return new Message({
            type: MessageType.REMOVE_ENTRIES_REQUEST,
            requestId: request.requestId,
            keys,
            sourceId: request.sourceEndpointId
        });
    }

    public decodeRemoveEntriesRequest(message: Message): RemoveEntriesRequest<K> {
        if (message.type !== MessageType.REMOVE_ENTRIES_REQUEST) {
            throw new Error(`decodeRemoveRequest(): Message type must be REMOVE_ENTRIES_REQUEST`);
        }
        const keys = this._decodeKeys(message.keys);
        return new RemoveEntriesRequest<K>(
            message.requestId!,
            keys,
            message.sourceId,
        );
    }
    
    public encodeRemoveEntriesResponse(response: RemoveEntriesResponse<K, V>): Message {
        const [keys, values] = this._encodeEntries(response.removedEntries);
        return new Message({
            type: MessageType.REMOVE_ENTRIES_RESPONSE,
            requestId: response.requestId,
            keys,
            values,
            destinationId: response.destinationEndpointId
        });
    }

    public decodeRemoveEntriesResponse(message: Message): RemoveEntriesResponse<K, V> {
        if (message.type !== MessageType.REMOVE_ENTRIES_RESPONSE) {
            throw new Error(`decodeRemoveResponse(): Message type must be REMOVE_ENTRIES_RESPONSE`);
        }
        const removedEntries = this._decodeEntries(message.keys, message.values);
        return new RemoveEntriesResponse<K, V>(
            message.requestId!,
            removedEntries,
            message.destinationId,
        );
    }

    public encodeRemoveEntriesNotification(notification: RemoveEntriesNotification<K>): Message {
        const keys = this._encodeKeys(notification.keys);
        return new Message({
            type: MessageType.REMOVE_ENTRIES_NOTIFICATION,
            keys,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId
        });
    }

    public decodeRemoveEntriesNotification(message: Message): RemoveEntriesNotification<K> {
        if (message.type !== MessageType.REMOVE_ENTRIES_NOTIFICATION) {
            throw new Error(`decodeRemoveNotification(): Message type must be REMOVE_ENTRIES_NOTIFICATION`);
        }
        const keys = this._decodeKeys(message.keys);
        return new RemoveEntriesNotification<K>(
            keys,
            message.sourceId,
            message.destinationId,
        );
    }

    
    public encodeEvictEntriesRequest(request: EvictEntriesRequest<K>): Message {
        const keys = this._encodeKeys(request.keys);
        return new Message({
            type: MessageType.EVICT_ENTRIES_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId,
            keys,
        });
    }

    public decodeEvictEntriesRequest(message: Message): EvictEntriesRequest<K> {
        if (message.type !== MessageType.EVICT_ENTRIES_REQUEST) {
            throw new Error(`decodeEvictRequest(): Message type must be EVICT_ENTRIES_REQUEST`);
        }
        const keys = this._decodeKeys(message.keys);
        return new EvictEntriesRequest<K>(
            message.requestId!,
            keys,
            message.sourceId,
        );
    }
    
    public encodeEvictEntriesResponse(response: EvictEntriesResponse): Message {
        return new Message({
            type: MessageType.EVICT_ENTRIES_RESPONSE,
            requestId: response.requestId,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeEvictEntriesResponse(message: Message): EvictEntriesResponse {
        if (message.type !== MessageType.EVICT_ENTRIES_RESPONSE) {
            throw new Error(`decodeEvictResponse(): Message type must be EVICT_ENTRIES_RESPONSE`);
        }
        return new EvictEntriesResponse(
            message.requestId!,
            message.destinationId,
        );
    }

    public encodeEvictEntriesNotification(notification: EvictEntriesNotification<K>): Message {
        const keys = this._encodeKeys(notification.keys);
        return new Message({
            type: MessageType.EVICT_ENTRIES_NOTIFICATION,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
            keys,
        });
    }

    public decodeEvictEntriesNotification(message: Message): EvictEntriesNotification<K> {
        if (message.type !== MessageType.EVICT_ENTRIES_NOTIFICATION) {
            throw new Error(`decodeEvictNotification(): Message type must be EVICT_ENTRIES_NOTIFICATION`);
        }
        const keys = this._decodeKeys(message.keys);
        return new EvictEntriesNotification<K>(
            keys,
            message.sourceId,
            message.destinationId
        );
    }
    


    public encodeInsertEntriesRequest(request: InsertEntriesRequest<K, V>): Message {
        const [keys, values] = this._encodeEntries(request.entries);
        return new Message({
            type: MessageType.INSERT_ENTRIES_REQUEST,
            requestId: request.requestId,
            keys,
            values,
            sourceId: request.sourceEndpointId
        });
    }

    public decodeInsertEntriesRequest(message: Message): InsertEntriesRequest<K, V> {
        if (message.type !== MessageType.INSERT_ENTRIES_REQUEST) {
            throw new Error(`decodeInsertRequest(): Message type must be INSERT_ENTRIES_REQUEST`);
        }
        const entries = this._decodeEntries(message.keys, message.values);
        return new InsertEntriesRequest<K, V>(
            message.requestId!,
            entries,
            message.sourceId,
        );
    }
    
    public encodeInsertEntriesResponse(response: InsertEntriesResponse<K, V>): Message {
        const [keys, values] = this._encodeEntries(response.existingEntries);
        return new Message({
            type: MessageType.INSERT_ENTRIES_RESPONSE,
            requestId: response.requestId,
            keys,
            values,
            destinationId: response.destinationEndpointId
        });
    }

    public decodeInsertEntriesResponse(message: Message): InsertEntriesResponse<K, V> {
        if (message.type !== MessageType.INSERT_ENTRIES_RESPONSE) {
            throw new Error(`decodeInsertResponse(): Message type must be INSERT_ENTRIES_RESPONSE`);
        }
        const entries = this._decodeEntries(message.keys, message.values);
        return new InsertEntriesResponse<K, V>(
            message.requestId!,
            entries,
            message.destinationId,
        );
    }

    public encodeInsertEntriesNotification(notification: InsertEntriesNotification<K, V>): Message {
        const [keys, values] = this._encodeEntries(notification.entries);
        return new Message({
            type: MessageType.INSERT_ENTRIES_NOTIFICATION,
            sourceId: notification.sourceEndpointId,
            keys,
            values,
            destinationId: notification.destinationEndpointId
        });
    }

    public decodeInsertEntriesNotification(message: Message): InsertEntriesNotification<K, V> {
        if (message.type !== MessageType.INSERT_ENTRIES_NOTIFICATION) {
            throw new Error(`decodeInsertNotification(): Message type must be INSERT_ENTRIES_NOTIFICATION`);
        }
        const entries = this._decodeEntries(message.keys, message.values);
        return new InsertEntriesNotification<K, V>(
            entries,
            message.sourceId,
            message.destinationId
        );
    }

    public encodeUpdateEntriesRequest(request: UpdateEntriesRequest<K, V>): Message {
        const [keys, values] = this._encodeEntries(request.entries);
        return new Message({
            type: MessageType.UPDATE_ENTRIES_REQUEST,
            sourceId: request.sourceEndpointId,
            requestId: request.requestId,
            keys,
            values,
        });
    }

    public decodeUpdateEntriesRequest(message: Message): UpdateEntriesRequest<K, V>  {
        if (message.type !== MessageType.UPDATE_ENTRIES_REQUEST) {
            throw new Error(`decodeUpdateEntriesRequest(): Message type must be UPDATE_ENTRIES_REQUEST`);
        }
        const entries = this._decodeEntries(message.keys, message.values);
        return new UpdateEntriesRequest<K, V>(
            message.requestId!,
            entries,
            message.sourceId,
        );
    }
    
    public encodeUpdateEntriesResponse(response: UpdateEntriesResponse<K, V>): Message {
        const [keys, values] = this._encodeEntries(response.updatedEntries);
        return new Message({
            type: MessageType.UPDATE_ENTRIES_RESPONSE,
            requestId: response.requestId,
            keys,
            values,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeUpdateEntriesResponse(message: Message): UpdateEntriesResponse<K, V>  {
        if (message.type !== MessageType.UPDATE_ENTRIES_RESPONSE) {
            throw new Error(`decodeUpdateEntriesResponse(): Message type must be UPDATE_ENTRIES_RESPONSE`);
        }
        const updatedEntries = this._decodeEntries(message.keys, message.values);
        return new UpdateEntriesResponse<K, V>(
            message.requestId!,
            updatedEntries,
            message.destinationId,
        );
    }

    public encodeUpdateEntriesNotification(notification: UpdateEntriesNotification<K, V>): Message {
        const [keys, values] = this._encodeEntries(notification.updatedEntries);
        return new Message({
            type: MessageType.UPDATE_ENTRIES_NOTIFICATION,
            keys,
            values,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
        });
    }

    public decodeUpdateEntriesNotification(message: Message): UpdateEntriesNotification<K, V> {
        if (message.type !== MessageType.UPDATE_ENTRIES_NOTIFICATION) {
            throw new Error(`decodeUpdateEntriesResponse(): Message type must be UPDATE_ENTRIES_RESPONSE`);
        }
        const updatedEntries = this._decodeEntries(message.keys, message.values);
        return new UpdateEntriesNotification<K, V>(
            updatedEntries,
            message.sourceId,
            message.destinationId,
        );
    }

    public encodeRestoreEntriesRequest(request: RestoreEntriesRequest<K, V>): Message {
        const [keys, values] = this._encodeEntries(request.entries);
        return new Message({
            type: MessageType.RESTORE_ENTRIES_REQUEST,
            sourceId: request.sourceEndpointId,
            requestId: request.requestId,
            keys,
            values,
        });
    }

    public decodeRestoreEntriesRequest(message: Message): RestoreEntriesRequest<K, V>  {
        if (message.type !== MessageType.RESTORE_ENTRIES_REQUEST) {
            throw new Error(`decodeRestoreEntriesRequest(): Message type must be RESTORE_ENTRIES_REQUEST`);
        }
        const entries = this._decodeEntries(message.keys, message.values);
        return new RestoreEntriesRequest<K, V>(
            message.requestId!,
            entries,
            message.sourceId,
        );
    }
    
    public encodeRestoreEntriesResponse(response: RestoreEntriesResponse): Message {
        return new Message({
            type: MessageType.RESTORE_ENTRIES_RESPONSE,
            requestId: response.requestId,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeRestoreEntriesResponse(message: Message): RestoreEntriesResponse  {
        if (message.type !== MessageType.RESTORE_ENTRIES_RESPONSE) {
            throw new Error(`decodeRestoreEntriesResponse(): Message type must be RESTORE_ENTRIES_RESPONSE`);
        }
        return new RestoreEntriesResponse(
            message.requestId!,
            message.destinationId,
        );
    }

    public encodeRestoreEntriesNotification(notification: RestoreEntriesNotification<K, V>): Message {
        const [keys, values] = this._encodeEntries(notification.entries);
        return new Message({
            type: MessageType.RESTORE_ENTRIES_NOTIFICATION,
            keys,
            values,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
        });
    }

    public decodeRestoreEntriesNotification(message: Message): RestoreEntriesNotification<K, V> {
        if (message.type !== MessageType.RESTORE_ENTRIES_NOTIFICATION) {
            throw new Error(`decodeRestoreEntriesResponse(): Message type must be RESTORE_ENTRIES_RESPONSE`);
        }
        const restoredEntries = this._decodeEntries(message.keys, message.values);
        return new RestoreEntriesNotification<K, V>(
            restoredEntries,
            message.sourceId,
            message.destinationId,
        );
    }

    private _encodeKeys(keys: ReadonlySet<K>): Uint8Array[] {
        return this._encodeSet<K>(keys, this._keyCodec);
    }

    private _decodeKeys(keys: Uint8Array[]): ReadonlySet<K> {
        return this._decodeSet<K>(keys, this._keyCodec);
    }
    
    private _encodeSet<T>(keys: ReadonlySet<T>, encoder: Encoder<T, Uint8Array>): Uint8Array[] {
        if (keys.size < 1) {
            return EMPTY_ARRAY;
        }
        const result: Uint8Array[] = [];
        for (const key of keys) {
            const encodedKey = encoder.encode(key);
            result.push(encodedKey);
        }
        return result;
    }

    private _decodeSet<T>(keys: Uint8Array[], decoder: Decoder<T, Uint8Array>): ReadonlySet<T> {
        if (keys.length < 1) {
            return Collections.EMPTY_SET;
        }
        const result = new Set<T>();
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            const decodedKey = decoder.decode(key);
            result.add(decodedKey);
        }
        return result;
    }

    private _encodeEntries(entries: ReadonlyMap<K, V>): [Uint8Array[], Uint8Array[]] {
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