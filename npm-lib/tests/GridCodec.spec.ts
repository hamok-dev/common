import { GridCodec } from "../src/GridCodec";
import { EndpointStatesNotification } from "../src/messagetypes/EndpointNotification";
import { HelloNotification } from "../src/messagetypes/HelloNotification";
import { RaftAppendEntriesRequestChunk, RaftAppendEntriesResponse } from "../src/messagetypes/RaftAppendEntries";
import { RaftVoteRequest, RaftVoteResponse } from "../src/messagetypes/RaftVote";
import { StorageSyncRequest, StorageSyncResponse } from "../src/messagetypes/StorageSync";
import { SubmitMessageRequest, SubmitMessageResponse } from "../src/messagetypes/SubmitMessage";
import { Message } from "../src/Models";

function equalSets<T>(setA: ReadonlySet<T>, setB: ReadonlySet<T>): boolean {
    if (setA.size !== setB.size) return false;
    for (const item of setA) 
        if (!setB.has(item)) return false;
    for (const item of setB) 
        if (!setA.has(item)) return false;
    return true;
}

describe("GridCodec", () => {
    const codec = new GridCodec();

    it("StorageSyncRequest", () => {
        const expected = new StorageSyncRequest(
            "requestId",
            "leaderId",
            "sourceId",
        );
        const message = codec.encodeStorageSyncRequest(expected);
        const actual = codec.decodeStorageSyncRequest(message);
        
        expect(message.requestId).toBe(expected.requestId);
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.leaderId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.leaderId).toBe(actual.leaderId);
    });

    it("StorageSyncRequest.createResponse()", () => {
        const request = new StorageSyncRequest(
            "requestId",
            "leaderId",
            "sourceEndpointId",
        );
        const response = request.createResponse(
            "leaderId",
            1,
            2,
            3
        );

        expect(response.requestId).toBe(request.requestId);
        expect(response.destinationId).toBe(request.sourceEndpointId);
        expect(response.leaderId).toBe(request.leaderId);
        expect(response.numberOfLogs).toBe(1);
        expect(response.lastApplied).toBe(2);
        expect(response.commitIndex).toBe(3);
    });

    it("StorageSyncResponse", () => {
        const expected = new StorageSyncResponse(
            "requestId",
            "destinationId",
            "sourceId",
            1,
            2,
            3
        );
        const message = codec.encodeStorageSyncResponse(expected);
        const actual = codec.decodeStorageSyncResponse(message);
        
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.destinationId);
        expect(message.raftLeaderId).toBe(expected.leaderId);
        expect(message.raftNumberOfLogs).toBe(expected.numberOfLogs);
        expect(message.raftLastAppliedIndex).toBe(expected.lastApplied);
        expect(message.raftCommitIndex).toBe(expected.commitIndex);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.destinationId).toBe(actual.destinationId);
        expect(expected.leaderId).toBe(actual.leaderId);
        expect(expected.numberOfLogs).toBe(actual.numberOfLogs);
        expect(expected.lastApplied).toBe(actual.lastApplied);
        expect(expected.commitIndex).toBe(actual.commitIndex);
    });

    it("SubmitMessageRequest", () => {
        const expected = new SubmitMessageRequest(
           "requestId",
           "destinationId",
           new Message({
               sourceId: "myMessage"
           })
        );
        const message = codec.encodeSubmitMessageRequest(expected);
        const actual = codec.decodeSubmitMessageRequest(message);
        
        expect(message.requestId).toBe(expected.requestId);
        expect(message.embeddedMessages[0].sourceId).toBe(expected.entry.sourceId);
        expect(message.sourceId).toBe(expected.sourceEndpointId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.entry.sourceId).toBe(actual.entry.sourceId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
    });

    it("SubmitMessageRequest.createResponse()", () => {
        const request = new SubmitMessageRequest(
            "requestId",
            "destinationId",
            new Message({
                sourceId: "myMessage"
            })
         );
         const response = request.createResponse(
             true,
             "leaderId",
         );
         
         expect(request.requestId).toBe(response.requestId);
         expect(request.sourceEndpointId).toBe(response.destinationEndpointId);
         expect(true).toBe(response.success);
         expect("leaderId").toBe(response.leaderId);
    });

    it("SubmitMessageResponse", () => {
        const expected = new SubmitMessageResponse(
          "requestId",
          true,
          "destinationId",
          "raftLeaderId"
        );
        const message = codec.encodeSubmitMessageResponse(expected);
        const actual = codec.decodeSubmitMessageResponse(message);
        
        expect(message.requestId).toBe(expected.requestId);
        expect(message.success).toBe(expected.success);
        expect(message.destinationId).toBe(expected.destinationEndpointId);
        expect(message.raftLeaderId).toBe(expected.leaderId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.success).toBe(actual.success);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(expected.leaderId).toBe(actual.leaderId);
    });
});
