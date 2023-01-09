import { Codec } from ".";
import { createLogger } from "./logger";
import { EndpointStatesNotification } from "./messagetypes/EndpointNotification";
import { HelloNotification } from "./messagetypes/HelloNotification";
import { RaftAppendEntriesRequestChunk, RaftAppendEntriesResponse } from "./messagetypes/RaftAppendEntries";
import { RaftVoteRequest, RaftVoteResponse } from "./messagetypes/RaftVote";
import { Message, Message_MessageType as MessageType } from "./Models";

type Input = 
    HelloNotification |
    EndpointStatesNotification |
    RaftVoteRequest |
    RaftVoteResponse |
    RaftAppendEntriesRequestChunk | 
    RaftAppendEntriesResponse
    ;

const logger = createLogger("RaccoonCodec");

function setToArray<T>(set?: ReadonlySet<T>): T[] | undefined {
    if (!set) return;
    return Array.from(set);
}

function arrayToSet<T>(array?: T[]): Set<T> | undefined {
    if (!array) return;
    return new Set<T>(array);
}

export class RaccoonCodec implements Codec<Input, Message> {
    
    public encode(input: Input): Message {
        switch (input.constructor) {
            case HelloNotification:
                return this.encodeHelloNotification(input as HelloNotification);
            case EndpointStatesNotification:
                return this.encodeEndpointStateNotification(input as EndpointStatesNotification);
            case RaftVoteRequest:
                return this.encodeRaftVoteRequest(input as RaftVoteRequest);
            case RaftVoteResponse:
                return this.encodeRaftVoteResponse(input as RaftVoteResponse);
            case RaftAppendEntriesRequestChunk:
                return this.encodeRaftAppendEntriesRequest(input as RaftAppendEntriesRequestChunk);
            case RaftAppendEntriesResponse:
                return this.encodeRaftAppendEntriesResponse(input as RaftAppendEntriesResponse);
            default:
                throw new Error(`Cannot encode input` + input);
        }
    }

    public decode(message: Message): Input {
        switch(message.type) {
            case MessageType.HELLO_NOTIFICATION:
                return this.decodeHelloNotification(message);
            case MessageType.ENDPOINT_STATES_NOTIFICATION:
                return this.decodeEndpointStateNotification(message);
            case MessageType.RAFT_VOTE_REQUEST:
                return this.decodeRaftVoteRequest(message);
            case MessageType.RAFT_VOTE_RESPONSE:
                return this.decodeRaftVoteResponse(message);
            case MessageType.RAFT_APPEND_ENTRIES_REQUEST_CHUNK:
                return this.decodeRaftAppendEntriesRequest(message);
            case MessageType.RAFT_VOTE_RESPONSE:
                return this.decodeRaftAppendEntriesResponse(message);
            default:
                throw new Error(`Cannot decode message` + message);
        }
    }

    public encodeHelloNotification(notification: HelloNotification): Message {
        return new Message({
            type: MessageType.HELLO_NOTIFICATION,
            sourceId: notification.sourcePeerId,
            destinationId: notification.destinationPeerId,
            raftLeaderId: notification.raftLeaderId,
        });
    }

    public decodeHelloNotification(message: Message): HelloNotification {
        if (message.type !== MessageType.HELLO_NOTIFICATION) {
            throw new Error(`decodeHelloNotification(): Message type must be HELLO_NOTIFICATION`);
        }
        return new HelloNotification(
            message.sourceId!,
            message.destinationId,
            message.raftLeaderId
        )
    }

    public encodeEndpointStateNotification(notification: EndpointStatesNotification): Message {
        const activeEndpointIds = setToArray<string>(notification.activeEndpointIds);
        return new Message({
            type: MessageType.ENDPOINT_STATES_NOTIFICATION,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
            raftTerm: notification.term,
            raftCommitIndex: notification.commitIndex,
            raftLeaderNextIndex: notification.leaderNextIndex,
            raftNumberOfLogs: notification.numberOfLogs,
            activeEndpointIds,
        });
    }

    public decodeEndpointStateNotification(message: Message): EndpointStatesNotification {
        if (message.type !== MessageType.ENDPOINT_STATES_NOTIFICATION) {
            throw new Error(`decodeEndpointStateNotification(): Message type must be ENDPOINT_STATES_NOTIFICATION`);
        }
        const activeEndpointIds = arrayToSet<string>(message.activeEndpointIds);
        return new EndpointStatesNotification(
            message.sourceId!,
            message.destinationId!,
            message.raftTerm!,
            message.raftCommitIndex!,
            message.raftLeaderNextIndex!,
            message.raftNumberOfLogs!,
            activeEndpointIds,
        );
    }

    public encodeRaftVoteRequest(request: RaftVoteRequest): Message {
        return new Message({
            type: MessageType.RAFT_VOTE_REQUEST,
            raftTerm: request.term,
            raftPrevLogIndex: request.lastLogIndex,
            raftPrevLogTerm: request.lastLogTerm,
            destinationId: request.peerId,
            raftCandidateId: request.candidateId,
        });
    }

    public decodeRaftVoteRequest(message: Message): RaftVoteRequest {
        if (message.type !== MessageType.RAFT_VOTE_REQUEST) {
            throw new Error(`decodeRaftVoteRequest(): Message type must be RAFT_VOTE_REQUEST`);
        }
        return new RaftVoteRequest(
            message.raftTerm!,
            message.raftPrevLogIndex!,
            message.raftPrevLogTerm!,
            message.destinationId!,
            message.raftCandidateId!,
        );
    }
    
    public encodeRaftVoteResponse(response: RaftVoteResponse): Message {
        return new Message({
            type: MessageType.RAFT_VOTE_RESPONSE,
            raftTerm: response.term,
            success: response.voteGranted,
            destinationId: response.destinationPeerId,
            sourceId: response.sourcePeerId,
        });
    }

    public decodeRaftVoteResponse(message: Message): RaftVoteResponse {
        if (message.type !== MessageType.RAFT_VOTE_RESPONSE) {
            throw new Error(`decodeRaftVoteResponse(): Message type must be RAFT_VOTE_RESPONSE`);
        }
        return new RaftVoteResponse(
            message.raftTerm!,
            !!message.success,
            message.destinationId!,
            message.sourceId!,
        );
    }


    public encodeRaftAppendEntriesRequest(request: RaftAppendEntriesRequestChunk): Message {
        return new Message({
            type: MessageType.RAFT_APPEND_ENTRIES_REQUEST_CHUNK,
            requestId: request.requestId,
            destinationId: request.peerId,
            raftLeaderId: request.leaderId,
            raftCommitIndex: request.leaderCommit,
            raftLeaderNextIndex: request.leaderNextIndex,
            raftPrevLogIndex: request.prevLogIndex,
            raftPrevLogTerm: request.prevLogTerm,
            raftTerm: request.term,
            sequence: request.sequence,
            lastMessage: request.lastMessage,
            embeddedMessages: request.entry ? [request.entry] : undefined,
        });
    }

    public decodeRaftAppendEntriesRequest(message: Message): RaftAppendEntriesRequestChunk {
        if (message.type !== MessageType.RAFT_APPEND_ENTRIES_REQUEST_CHUNK) {
            throw new Error(`decodeRaftAppendEntriesRequest(): Message type must be RAFT_APPEND_ENTRIES_REQUEST_CHUNK`);
        }
        let entry: Message | undefined;
        if (message.embeddedMessages && 0 < message.embeddedMessages.length) {
            entry = message.embeddedMessages[0];
            if (1 < message.embeddedMessages.length) {
                logger.warn("decodeRaftAppendEntriesRequest(): More than one message received for RaftAppendRequestChunk. Only the first one will be processed");
            }
        }
        return new RaftAppendEntriesRequestChunk(
            message.requestId!,
            message.destinationId!,
            message.raftLeaderId!,
            message.raftCommitIndex ?? -1,
            message.raftLeaderNextIndex ?? -1,
            message.raftPrevLogIndex ?? -1,
            message.raftPrevLogTerm ?? -1,
            message.raftTerm!,
            message.sequence ?? 0,
            message.lastMessage ?? false,
            entry,
        )
    }

    public encodeRaftAppendEntriesResponse(response: RaftAppendEntriesResponse): Message {
        return new Message({
            type: MessageType.RAFT_APPEND_ENTRIES_RESPONSE,
            requestId: response.requestId,
            sourceId: response.sourcePeerId,
            destinationId: response.destinationPeerId,
            raftTerm: response.term,
            success: response.success,
            raftPeerNextIndex: response.peerNextIndex,
            lastMessage: response.processed,
        });
    }

    public decodeRaftAppendEntriesResponse(message: Message): RaftAppendEntriesResponse {
        if (message.type !== MessageType.RAFT_APPEND_ENTRIES_RESPONSE) {
            throw new Error(`decodeRaftAppendEntriesResponse(): Message type must be RAFT_APPEND_ENTRIES_RESPONSE`);
        }
        return new RaftAppendEntriesResponse(
            message.requestId!,
            message.sourceId!,
            message.destinationId!,
            message.raftTerm!,
            !!message.success,
            message.raftPeerNextIndex!,
            !!message.lastMessage,
        )
    }
}