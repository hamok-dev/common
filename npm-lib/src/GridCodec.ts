import { Codec } from "./codecs/Codec";
import { createLogger } from "./logger";
import { StorageSyncRequest, StorageSyncResponse } from "./messagetypes/StorageSync";
import { SubmitMessageRequest, SubmitMessageResponse } from "./messagetypes/SubmitMessage";
import { Message, Message_MessageType as MessageType } from "./Models";

const logger = createLogger("GridCodec");
type Input = StorageSyncRequest | 
    StorageSyncResponse | 
    SubmitMessageRequest |
    SubmitMessageResponse
    ;
    
export class GridCodec implements Codec<Input, Message> {

    public encode(input: Input): Message {
        switch (input.constructor) {
            case StorageSyncRequest:
                return this.encodeStorageSyncRequest(input as StorageSyncRequest);
            case StorageSyncResponse:
                return this.encodeStorageSyncResponse(input as StorageSyncResponse);
            case SubmitMessageRequest:
                return this.encodeSubmitMessageRequest(input as SubmitMessageRequest);
            case SubmitMessageResponse:
                return this.encodeSubmitMessageResponse(input as SubmitMessageResponse);
            default:
                throw new Error(`Cannot encode input` + input);
        }
    }

    public decode(message: Message): Input {
        switch(message.type) {
            case MessageType.STORAGE_SYNC_REQUEST:
                return this.decodeStorageSyncRequest(message);
            case MessageType.STORAGE_SYNC_RESPONSE:
                return this.decodeStorageSyncResponse(message);
            case MessageType.SUBMIT_MESSAGE_REQUEST:
                return this.decodeSubmitMessageRequest(message);
            case MessageType.SUBMIT_MESSAGE_RESPONSE:
                return this.decodeSubmitMessageResponse(message);
            default:
                throw new Error(`Cannot decode message` + message);
        }
    }

    public encodeStorageSyncRequest(request: StorageSyncRequest): Message {
        return new Message({
            type: MessageType.STORAGE_SYNC_REQUEST,
            requestId: request.requestId,
            destinationId: request.leaderId,
            sourceId: request.sourceEndpointId,
        });
    }

    public decodeStorageSyncRequest(message: Message): StorageSyncRequest {
        if (message.type !== MessageType.STORAGE_SYNC_REQUEST) {
            throw new Error(`decodeStorageSyncRequest(): Message type must be STORAGE_SYNC_REQUEST`);
        }
        return new StorageSyncRequest(
            message.requestId!,
            message.destinationId!,
            message.sourceId,
        );
    }


    public encodeStorageSyncResponse(response: StorageSyncResponse): Message {
        return new Message({
            type: MessageType.STORAGE_SYNC_RESPONSE,
            requestId: response.requestId,
            destinationId: response.destinationId,
            raftLeaderId: response.leaderId,
            raftNumberOfLogs: response.numberOfLogs,
            raftLastAppliedIndex: response.lastApplied,
            raftCommitIndex: response.commitIndex,
        });
    }

    public decodeStorageSyncResponse(message: Message): StorageSyncResponse {
        if (message.type !== MessageType.STORAGE_SYNC_RESPONSE) {
            throw new Error(`decodeStorageSyncResponse(): Message type must be STORAGE_SYNC_RESPONSE`);
        }
        return new StorageSyncResponse(
            message.requestId!,
            message.destinationId!,
            message.raftLeaderId!,
            message.raftNumberOfLogs,
            message.raftLastAppliedIndex,
            message.raftCommitIndex
        );
    }

    public encodeSubmitMessageRequest(request: SubmitMessageRequest): Message {
        return new Message({
            type: MessageType.SUBMIT_MESSAGE_REQUEST,
            requestId: request.requestId,
            embeddedMessages: [request.entry!],
            sourceId: request.sourceEndpointId,
            destinationId: request.destinationEndpointId,
        });
    }

    public decodeSubmitMessageRequest(message: Message): SubmitMessageRequest {
        if (message.type !== MessageType.SUBMIT_MESSAGE_REQUEST) {
            throw new Error(`decodeSubmitMessageRequest(): Message type must be SUBMIT_MESSAGE_REQUEST`);
        }
        let entry: Message | undefined;
        if (message.embeddedMessages && 0 < message.embeddedMessages.length) {
            entry = message.embeddedMessages[0];
            if (1 < message.embeddedMessages.length) {
                logger.warn("decodeSubmitMessageRequest(): More than one message received for SubmitMessageRequest. Only the first one will be processed");
            }
        }
        return new SubmitMessageRequest(
            message.requestId!,
            message.sourceId!,
            entry!,
            message.destinationId,
        );
    }

    public encodeSubmitMessageResponse(response: SubmitMessageResponse): Message {
        return new Message({
            type: MessageType.SUBMIT_MESSAGE_RESPONSE,
            requestId: response.requestId,
            success: response.success,
            destinationId: response.destinationEndpointId,
            raftLeaderId: response.leaderId,
        });
    }

    public decodeSubmitMessageResponse(message: Message): SubmitMessageResponse {
        if (message.type !== MessageType.SUBMIT_MESSAGE_RESPONSE) {
            throw new Error(`decodeSubmitMessageResponse(): Message type must be SUBMIT_MESSAGE_RESPONSE`);
        }
        return new SubmitMessageResponse(
            message.requestId!,
            !!message.success,
            message.destinationId!,
            message.raftLeaderId!,
        )
    }

}