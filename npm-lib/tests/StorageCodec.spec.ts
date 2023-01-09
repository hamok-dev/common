import { UpdateEntriesNotification, UpdateEntriesRequest, UpdateEntriesResponse } from "../src/messagetypes/UpdateEntries";
import { Message, Message_MessageType as MessageType } from "../src/Models";
import { ClearEntriesNotification, ClearEntriesRequest, ClearEntriesResponse } from "../src/messagetypes/ClearEntries";
import { GetEntriesRequest, GetEntriesResponse } from "../src/messagetypes/GetEntries";
import { GetKeysRequest, GetKeysResponse } from "../src/messagetypes/GetKeys";
import { DeleteEntriesNotification, DeleteEntriesRequest, DeleteEntriesResponse } from "../src/messagetypes/DeleteEntries";
import { RemoveEntriesNotification, RemoveEntriesRequest, RemoveEntriesResponse } from "../src/messagetypes/RemoveEntries";
import { EvictEntriesNotification, EvictEntriesRequest, EvictEntriesResponse } from "../src/messagetypes/EvictEntries";
import { InsertEntriesNotification, InsertEntriesRequest, InsertEntriesResponse } from "../src/messagetypes/InsertEntries";
import { GetSizeRequest, GetSizeResponse } from "../src/messagetypes/GetSize";
import { StorageCodec } from "../src/StorageCodec";
import { OngoingRequestsNotification } from "../src/messagetypes/OngoingRequestsNotification";
import { RestoreEntriesNotification, RestoreEntriesRequest, RestoreEntriesResponse } from "../src/messagetypes/RestoreEntries";


function equalSets<T>(setA: ReadonlySet<T>, setB: ReadonlySet<T>): boolean {
    if (setA.size !== setB.size) return false;
    for (const item of setA) 
        if (!setB.has(item)) return false;
    for (const item of setB) 
        if (!setA.has(item)) return false;
    return true;
}

function equalMaps<K, V>(mapA: ReadonlyMap<K, V>, mapB: ReadonlyMap<K, V>): boolean {
    if (mapA.size !== mapB.size) return false;
    for (const [key, valueA] of mapA)  {
        const valueB = mapB.get(key);
        if (valueA !== valueB) return false;
    }
    for (const [key, valueB] of mapB)  {
        const valueA = mapA.get(key);
        if (valueA !== valueB) return false;
    }
    return true;
}

describe("StorageCodec", () => {
    const codec = new StorageCodec<number, string>(
        // keycodec
        {
            encode: num => new Uint8Array([num]),
            decode: bytes => bytes[0]
        },
        // valuecodec
        {
            encode(data: string): Uint8Array {
                const buffer = Buffer.from(data, "utf-8");
                return Uint8Array.from(buffer);
            },
            decode(data: Uint8Array): string {
                const buffer = Buffer.from(data);
                return buffer.toString("utf-8");
            }
        }
    );
    it("OngoingRequestsNotification", () => {
        const requestIds = new Set<string>(["requestId_1", "requestId_2"]);
        const expected = new OngoingRequestsNotification(
            requestIds,
            "destinationId",
        );
        const message = codec.encode(expected);
        const actual = codec.decode(message) as OngoingRequestsNotification;
        
        expect(message.type).toBe(MessageType.ONGOING_REQUESTS_NOTIFICATION);
        expect(message.keys).not.toBe(undefined);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(equalSets<string>(expected.requestIds, actual.requestIds)).toBe(true);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("ClearEntriesRequest", () => {
        const expected = new ClearEntriesRequest(
            "requestId",
            "sourceId"
        );
        const message = codec.encodeClearEntriesRequest(expected);
        const actual = codec.decodeClearEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.CLEAR_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
    });

    it("ClearEntriesRequest by encode / decode", () => {
        const expected = new ClearEntriesRequest(
            "requestId",
            "sourceId"
        );
        const message = codec.encode(expected);
        const actual = codec.decode(message) as ClearEntriesRequest;
        
        expect(message.type).toBe(MessageType.CLEAR_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
    });

    it("ClearEntriesRequest.createResponse()", () => {
        const request = new ClearEntriesRequest(
            "requestId",
            "sourceId"
         );
         const response = request.createResponse(
         );
 
         expect(request.requestId).toBe(response.requestId);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("ClearEntriesResponse", () => {
        const expected = new ClearEntriesResponse(
            "requestId",
            "destinationId",
        );
        const message = codec.encodeClearEntriesResponse(expected);
        const actual = codec.decodeClearEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.CLEAR_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("ClearEntriesResponse by encode / decode", () => {
        const expected = new ClearEntriesResponse(
            "requestId",
            "destinationId",
        );
        const message = codec.encode(expected);
        const actual = codec.decode(message) as ClearEntriesResponse;
        
        expect(message.type).toBe(MessageType.CLEAR_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("ClearEntriesNotification", () => {
        const expected = new ClearEntriesNotification(
            "requestId",
            "sourceId"
        );
        const message = codec.encodeClearEntriesNotification(expected);
        const actual = codec.decodeClearEntriesNotification(message);
        
        expect(message.type).toBe(MessageType.CLEAR_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("ClearEntriesNotification by encode / decode", () => {
        const expected = new ClearEntriesNotification(
            "requestId",
            "sourceId"
        );
        const message = codec.encode(expected);
        const actual = codec.decode(message) as ClearEntriesNotification;
        
        expect(message.type).toBe(MessageType.CLEAR_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });


    it("GetEntriesRequest", () => {
        const keys = new Set([1, 2]);
        const expected = new GetEntriesRequest<number>(
            keys,
            "requestId",
            "sourceId"
        );
        const message = codec.encodeGetEntriesRequest(expected);
        const actual = codec.decodeGetEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.GET_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
    });

    it("GetEntriesRequest.createResponse()", () => {
        const request = new GetEntriesRequest<number>(
            new Set([1, 2]),
            "requestId",
            "sourceId"
         );
         const response = request.createResponse(
             new Map([[1, "str"]])
         );
 
         expect(request.requestId).toBe(response.requestId);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("GetEntriesResponse", () => {
        const expected = new GetEntriesResponse<number, string>(
            "requestId",
            new Map([[1, "one"]]),
            "destinationId",
        );
        const message = codec.encodeGetEntriesResponse(expected);
        const actual = codec.decodeGetEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.GET_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalMaps(expected.foundEntries, actual.foundEntries)).toBe(true);
    });

    it("GetKeysRequest", () => {
        const expected = new GetKeysRequest(
            "requestId",
            "sourceId"
        );
        const message = codec.encodeGetKeysRequest(expected);
        const actual = codec.decodeGetKeysRequest(message);
        
        expect(message.type).toBe(MessageType.GET_KEYS_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
    });

    it("GetKeysRequest.createResponse()", () => {
        const request = new GetKeysRequest(
            "requestId",
            "sourceId"
         );
         const response = request.createResponse<number>(
             new Set<number>([1, 2])
         );
 
         expect(request.requestId).toBe(response.requestId);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("GetKeysResponse", () => {
        const expected = new GetKeysResponse<number>(
            "requestId",
            new Set<number>([1, 2]),
            "destinationId",
        );
        const message = codec.encodeGetKeysResponse(expected);
        const actual = codec.decodeGetKeysResponse(message);
        
        expect(message.type).toBe(MessageType.GET_KEYS_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalSets(expected.keys, actual.keys)).toBe(true);
    });
    
    it("GetSizeRequest", () => {
        const expected = new GetSizeRequest(
            "requestId",
            "sourceId"
        );
        const message = codec.encodeGetSizeRequest(expected);
        const actual = codec.decodeGetSizeRequest(message);
        
        expect(message.type).toBe(MessageType.GET_SIZE_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
    });

    it("GetSizeRequest.createResponse()", () => {
        const request = new GetSizeRequest(
            "requestId",
            "sourceId"
         );
         const response = request.createResponse(
             1
         );
 
         expect(request.requestId).toBe(response.requestId);
         expect(1).toBe(response.size);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("GetSizeResponse", () => {
        const expected = new GetSizeResponse(
            "requestId",
            1,
            "destinationId",
        );
        const message = codec.encodeGetSizeResponse(expected);
        const actual = codec.decodeGetSizeResponse(message);
        
        expect(message.type).toBe(MessageType.GET_SIZE_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(expected.size).toBe(actual.size);
    });

    it("DeleteEntriesRequest", () => {
        const expected = new DeleteEntriesRequest<number>(
            "requestId",
            new Set<number>([1, 2]),
            "sourceId"
        );
        const message = codec.encodeDeleteEntriesRequest(expected);
        const actual = codec.decodeDeleteEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.DELETE_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
    });

    it("DeleteEntriesRequest.createResponse()", () => {
        const request = new DeleteEntriesRequest<number>(
            "requestId",
            new Set<number>([1, 2]),
            "sourceId"
         );
         const deletedKeys = new Set<number>([1]);
         const response = request.createResponse(
            deletedKeys,
         );

         expect(request.requestId).toBe(response.requestId);
         expect(equalSets(response.deletedKeys, deletedKeys)).toBe(true);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("DeleteEntriesResponse", () => {
        const expected = new DeleteEntriesResponse<number>(
            "requestId",
            new Set<number>([1]),
            "destinationId",
        );
        const message = codec.encodeDeleteEntriesResponse(expected);
        const actual = codec.decodeDeleteEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.DELETE_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalSets(expected.deletedKeys, actual.deletedKeys)).toBe(true);
    });

    it("DeleteEntriesNotification", () => {
        const expected = new DeleteEntriesNotification<number>(
            new Set<number>([1]),
            "sourceId",
            "destinationId",
        );
        const message = codec.encodeDeleteEntriesNotification(expected);
        const actual = codec.decodeDeleteEntriesNotification(message);
        
        expect(message.type).toBe(MessageType.DELETE_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalSets(expected.keys, actual.keys)).toBe(true);
    });

    it("RemoveEntriesRequest", () => {
        const keys = new Set<number>([1, 2]);
        const expected = new RemoveEntriesRequest<number>(
            "requestId",
            keys,
            "sourceId"
        );
        const message = codec.encodeRemoveEntriesRequest(expected);
        const actual = codec.decodeRemoveEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.REMOVE_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(equalSets<number>(keys, actual.keys)).toBe(true);
    });

    it("RemoveEntriesRequest.createResponse()", () => {
        const keys = new Set<number>([1, 2]);
        const request = new RemoveEntriesRequest<number>(
            "requestId",
            keys,
            "sourceId"
         );
         const removedEntries = new Map<number, string>([[1, "one"]]);
         const response = request.createResponse(
            removedEntries,
         );

         expect(request.requestId).toBe(response.requestId);
         expect(equalMaps<number, string>(response.removedEntries, removedEntries)).toBe(true);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("RemoveEntriesResponse", () => {
        const removedEntries = new Map<number, string>([[1, "one"]]);
        const expected = new RemoveEntriesResponse<number, string>(
            "requestId",
            removedEntries,
            "destinationId",
        );
        const message = codec.encodeRemoveEntriesResponse(expected);
        const actual = codec.decodeRemoveEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.REMOVE_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalMaps<number, string>(expected.removedEntries, actual.removedEntries)).toBe(true);
    });

    it("DeleteEntriesNotification", () => {
        const keys = new Set<number>([1]);
        const expected = new DeleteEntriesNotification<number>(
            keys,
            "sourceId",
            "destinationId",
        );
        const message = codec.encodeDeleteEntriesNotification(expected);
        const actual = codec.decodeDeleteEntriesNotification(message);
        
        expect(message.type).toBe(MessageType.DELETE_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalSets<number>(keys, actual.keys)).toBe(true);
    });
    

    it("EvictEntriesRequest", () => {
        const keys = new Set<number>([1, 2]);
        const expected = new EvictEntriesRequest<number>(
            "requestId",
            keys,
            "sourceId"
        );
        const message = codec.encodeEvictEntriesRequest(expected);
        const actual = codec.decodeEvictEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.EVICT_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(equalSets<number>(keys, actual.keys)).toBe(true);
    });

    it("EvictEntriesRequest.createResponse()", () => {
        const keys = new Set<number>([1, 2]);
        const request = new EvictEntriesRequest<number>(
            "requestId",
            keys,
            "sourceId"
         );
         const response = request.createResponse();

         expect(request.requestId).toBe(response.requestId);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("EvictEntriesResponse", () => {
        const expected = new EvictEntriesResponse(
            "requestId",
            "destinationId",
        );
        const message = codec.encodeEvictEntriesResponse(expected);
        const actual = codec.decodeEvictEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.EVICT_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("EvictEntriesNotification", () => {
        const keys = new Set<number>([1]);
        const expected = new EvictEntriesNotification<number>(
            keys,
            "sourceId",
            "destinationId",
        );
        const message = codec.encodeEvictEntriesNotification(expected);
        const actual = codec.decodeEvictEntriesNotification(message);
        
        expect(message.type).toBe(MessageType.EVICT_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalSets<number>(keys, actual.keys)).toBe(true);
    });

    it("InsertEntriesRequest", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const expected = new InsertEntriesRequest<number, string>(
            "requestId",
            entries,
            "sourceId"
        );
        const message = codec.encodeInsertEntriesRequest(expected);
        const actual = codec.decodeInsertEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.INSERT_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(equalMaps<number, string>(entries, actual.entries)).toBe(true);
    });

    it("InsertEntriesRequest.createResponse()", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const request = new InsertEntriesRequest<number, string>(
            "requestId",
            entries,
            "sourceId"
        );

        const removedEntries = new Map<number, string>([[1, "one"]]);
        const response = request.createResponse(
            removedEntries
        );

        expect(request.requestId).toBe(response.requestId);
        expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("InsertEntriesResponse", () => {
        const removedEntries = new Map<number, string>([[1, "one"]]);
        const expected = new InsertEntriesResponse<number, string>(
            "requestId",
            removedEntries,
            "destinationId",
        );
        const message = codec.encodeInsertEntriesResponse(expected);
        const actual = codec.decodeInsertEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.INSERT_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("InsertEntriesNotification", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const expected = new InsertEntriesNotification<number, string>(
            entries,
            "sourceId",
            "destinationId",
        );
        const message = codec.encodeInsertEntriesNotification(expected);
        const actual = codec.decodeInsertEntriesNotification(message);
        
        expect(message.type).toBe(MessageType.INSERT_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalMaps<number, string>(entries, actual.entries)).toBe(true);
    });

    it("UpdateEntriesRequest", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const expected = new UpdateEntriesRequest<number, string>(
            "requestId",
            entries,
            "sourceId"
        );
        const message = codec.encodeUpdateEntriesRequest(expected);
        const actual = codec.decodeUpdateEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.UPDATE_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(equalMaps<number, string>(entries, actual.entries)).toBe(true);
    });

    it("UpdateEntriesRequest.createResponse()", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const request = new UpdateEntriesRequest<number, string>(
            "requestId",
            entries,
            "sourceId"
        );

        const updatedEntries = new Map<number, string>([[1, "one"]]);
        const response = request.createResponse(
            updatedEntries
        );

        expect(request.requestId).toBe(response.requestId);
        expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
        expect(equalMaps<number, string>(updatedEntries, response.updatedEntries)).toBe(true);
    });

    it("UpdateEntriesResponse", () => {
        const removedEntries = new Map<number, string>([[1, "one"]]);
        const expected = new UpdateEntriesResponse<number, string>(
            "requestId",
            removedEntries,
            "destinationId",
        );
        const message = codec.encodeUpdateEntriesResponse(expected);
        const actual = codec.decodeUpdateEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.UPDATE_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("UpdateEntriesNotification", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const expected = new UpdateEntriesNotification<number, string>(
            entries,
            "sourceId",
            "destinationId",
        );
        const message = codec.encodeUpdateEntriesNotification(expected);
        const actual = codec.decodeUpdateEntriesNotification(message);
        
        expect(message.type).toBe(MessageType.UPDATE_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalMaps<number, string>(entries, actual.updatedEntries)).toBe(true);
    });


    it("RestoreEntriesRequest", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const expected = new RestoreEntriesRequest<number, string>(
            "requestId",
            entries,
            "sourceId"
        );
        const message = codec.encodeRestoreEntriesRequest(expected);
        const actual = codec.decodeRestoreEntriesRequest(message);
        
        expect(message.type).toBe(MessageType.RESTORE_ENTRIES_REQUEST);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(equalMaps<number, string>(entries, actual.entries)).toBe(true);
    });

    it("RestoreEntriesRequest.createResponse()", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const request = new RestoreEntriesRequest<number, string>(
            "requestId",
            entries,
            "sourceId"
         );
         const response = request.createResponse();

         expect(request.requestId).toBe(response.requestId);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
    });

    it("RestoreEntriesResponse", () => {
        const expected = new RestoreEntriesResponse(
            "requestId",
            "destinationId",
        );
        const message = codec.encodeRestoreEntriesResponse(expected);
        const actual = codec.decodeRestoreEntriesResponse(message);
        
        expect(message.type).toBe(MessageType.RESTORE_ENTRIES_RESPONSE);
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("RestoreEntriesNotification", () => {
        const entries = new Map<number, string>([[1, "one"], [2, "two"]]);
        const expected = new RestoreEntriesNotification<number, string>(
            entries,
            "sourceId",
            "destinationId",
        );
        const message = codec.encodeRestoreEntriesNotification(expected);
        const actual = codec.decodeRestoreEntriesNotification(message);
        
        expect(message.type).toBe(MessageType.RESTORE_ENTRIES_NOTIFICATION);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(equalMaps<number, string>(entries, actual.entries)).toBe(true);
    });
});
