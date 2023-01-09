import { RaccoonCodec } from "../src/RaccoonCodec";
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

describe("RaccoonCodec", () => {
    const codec = new RaccoonCodec();
    it("HelloNotification", () => {
        const expected = new HelloNotification(
            "sourcePeerId",
            "destinationPeerId",
            "raftLeaderId"
        );
        const message = codec.encodeHelloNotification(expected);
        const actual = codec.decodeHelloNotification(message);
        
        expect(message.sourceId).toBe(expected.sourcePeerId);
        expect(message.destinationId).toBe(expected.destinationPeerId);
        expect(message.raftLeaderId).toBe(expected.raftLeaderId);

        expect(expected.sourcePeerId).toBe(actual.sourcePeerId);
        expect(expected.destinationPeerId).toBe(actual.destinationPeerId);
        expect(expected.raftLeaderId).toBe(actual.raftLeaderId);
    });

    it("EndpointStatesNotification", () => {
        const expected = new EndpointStatesNotification(
            "sourcePeerId",
            "destinationId",
            1,
            2,
            3,
            4,
            new Set<string>("activeEndpointId")
        );
        const message = codec.encodeEndpointStateNotification(expected);
        const actual = codec.decodeEndpointStateNotification(message);
        
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.destinationId).toBe(expected.destinationEndpointId);
        expect(message.raftTerm).toBe(expected.term);
        expect(message.raftCommitIndex).toBe(expected.commitIndex);
        expect(message.raftLeaderNextIndex).toBe(expected.leaderNextIndex);
        expect(message.raftNumberOfLogs).toBe(expected.numberOfLogs);
        expect(true).toBe(equalSets<string>(new Set<string>(message.activeEndpointIds!), expected.activeEndpointIds!));

        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
        expect(expected.destinationEndpointId).toBe(actual.destinationEndpointId);
        expect(expected.term).toBe(actual.term);
        expect(expected.commitIndex).toBe(actual.commitIndex);
        expect(expected.leaderNextIndex).toBe(actual.leaderNextIndex);
        expect(expected.numberOfLogs).toBe(actual.numberOfLogs);
        expect(expected.activeEndpointIds!.size).toBe(actual.activeEndpointIds!.size);
        expect(true).toBe(equalSets<string>(expected.activeEndpointIds!, actual.activeEndpointIds!));
    });


    it("RaftVoteRequest", () => {
        const expected = new RaftVoteRequest(
           1,
           2,
           3,
           "peerId",
           "candidateId"
        );
        const message = codec.encodeRaftVoteRequest(expected);
        const actual = codec.decodeRaftVoteRequest(message);
        
        expect(message.raftTerm).toBe(expected.term);
        expect(message.raftPrevLogIndex).toBe(expected.lastLogIndex);
        expect(message.raftPrevLogTerm).toBe(expected.lastLogTerm);
        expect(message.destinationId).toBe(expected.peerId);
        expect(message.raftCandidateId).toBe(expected.candidateId);

        expect(expected.term).toBe(actual.term);
        expect(expected.lastLogIndex).toBe(actual.lastLogIndex);
        expect(expected.lastLogTerm).toBe(actual.lastLogTerm);
        expect(expected.peerId).toBe(actual.peerId);
        expect(expected.candidateId).toBe(actual.candidateId);
    });


    it("RaftVoteRequest.createResponse", () => {
        const request = new RaftVoteRequest(
           1,
           2,
           3,
           "peerId",
           "candidateId"
        );
        const response = request.createResponse(
            true
        );

        expect(response.voteGranted).toBe(true);
        expect(request.peerId).toBe(response.sourcePeerId);
        expect(request.candidateId).toBe(response.destinationPeerId);
        expect(request.term).toBe(response.term);
    });
    
    it("RaftVoteResponse", () => {
        const expected = new RaftVoteResponse(
           1,
           true,
           "destinationId",
           "sourceId"
        );
        const message = codec.encodeRaftVoteResponse(expected);
        const actual = codec.decodeRaftVoteResponse(message);
        
        expect(message.raftTerm).toBe(expected.term);
        expect(message.success).toBe(expected.voteGranted);
        expect(message.destinationId).toBe(expected.destinationPeerId);
        expect(message.sourceId).toBe(expected.sourcePeerId);

        expect(expected.term).toBe(actual.term);
        expect(expected.voteGranted).toBe(actual.voteGranted);
        expect(expected.destinationPeerId).toBe(actual.destinationPeerId);
        expect(expected.sourcePeerId).toBe(actual.sourcePeerId);
    });

    it("RaftAppendEntriesRequestChunk", () => {
        const expected = new RaftAppendEntriesRequestChunk(
           "requestId",
           "peerId",
           "leaderId",
           1,
           2,
           3,
           4,
           5,
           6,
           true,
           new Message({
               sourceId: "embedded"
           })
        );
        const message = codec.encodeRaftAppendEntriesRequest(expected);
        const actual = codec.decodeRaftAppendEntriesRequest(message);
        
        expect(message.requestId).toBe(expected.requestId);
        expect(message.destinationId).toBe(expected.peerId);
        expect(message.raftLeaderId).toBe(expected.leaderId);
        expect(message.raftCommitIndex).toBe(expected.leaderCommit);
        expect(message.raftLeaderNextIndex).toBe(expected.leaderNextIndex);
        expect(message.raftPrevLogIndex).toBe(expected.prevLogIndex);
        expect(message.raftPrevLogTerm).toBe(expected.prevLogTerm);
        expect(message.raftTerm).toBe(expected.term);
        expect(message.sequence).toBe(expected.sequence);
        expect(message.lastMessage).toBe(expected.lastMessage);
        expect(message.embeddedMessages![0].sourceId).toBe(expected.entry!.sourceId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.peerId).toBe(actual.peerId);
        expect(expected.leaderId).toBe(actual.leaderId);
        expect(expected.leaderCommit).toBe(actual.leaderCommit);
        expect(expected.leaderNextIndex).toBe(actual.leaderNextIndex);
        expect(expected.prevLogIndex).toBe(actual.prevLogIndex);
        expect(expected.prevLogTerm).toBe(actual.prevLogTerm);
        expect(expected.term).toBe(actual.term);
        expect(expected.sequence).toBe(actual.sequence);
        expect(expected.lastMessage).toBe(actual.lastMessage);
        expect(expected.entry!.sourceId).toBe(actual.entry!.sourceId);
    });

    it("RaftAppendEntriesRequestChunk.createResponse()", () => {
        const request = new RaftAppendEntriesRequestChunk(
           "requestId",
           "peerId",
           "leaderId",
           1,
           2,
           3,
           4,
           5,
           6,
           true,
           new Message({
               sourceId: "embedded"
           })
        );
        const response = request.createResponse(
            true,
            7,
            true,
        )
        
        expect(request.requestId).toBe(response.requestId);
        expect(request.peerId).toBe(response.sourcePeerId);
        expect(request.leaderId).toBe(response.destinationPeerId);
        expect(request.term).toBe(response.term);
        expect(true).toBe(response.success);
        expect(7).toBe(response.peerNextIndex);
        expect(true).toBe(response.processed);
    });

    it("RaftAppendEntriesResponse", () => {
        const expected = new RaftAppendEntriesResponse(
           "requestId",
           "sourcePeerId",
           "destinationPeerId",
           1,
           true,
           3,
           false,
        );
        const message = codec.encodeRaftAppendEntriesResponse(expected);
        const actual = codec.decodeRaftAppendEntriesResponse(message);
        
        expect(message.requestId).toBe(expected.requestId);
        expect(message.sourceId).toBe(expected.sourcePeerId);
        expect(message.destinationId).toBe(expected.destinationPeerId);
        expect(message.raftTerm).toBe(expected.term);
        expect(message.success).toBe(expected.success);
        expect(message.raftPeerNextIndex).toBe(expected.peerNextIndex);
        expect(message.lastMessage).toBe(expected.processed);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.sourcePeerId).toBe(actual.sourcePeerId);
        expect(expected.destinationPeerId).toBe(actual.destinationPeerId);
        expect(expected.term).toBe(actual.term);
        expect(expected.success).toBe(actual.success);
        expect(expected.peerNextIndex).toBe(actual.peerNextIndex);
        expect(expected.processed).toBe(actual.processed);
    });
});
