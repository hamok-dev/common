import { MessageProcessor } from "./MessageProcessor";
import { Message } from "./Models";

export abstract class MessageDefaultProcessor<T> extends MessageProcessor<T> {
    public constructor() {
        super();
    }

    protected abstract processMessage(message: Message): T;

    protected processHelloNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processEndpointStatesNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processStorageSyncRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processStorageSyncResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processRaftVoteRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processRaftVoteResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processRaftAppendChunkRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processRaftAppendResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processSubmitMessageRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processSubmitMessageResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processClearEntriesRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processClearEntriesResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processClearEntriesNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processGetEntriesRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processGetEntriesResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processGetSizeRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processGetSizeResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processGetKeysRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processGetKeysResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processDeleteEntriesRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processDeleteEntriesResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processDeleteEntriesNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processRemoveEntriesRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processRemoveEntriesResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processRemoveEntriesNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processEvictEntriesRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processEvictEntriesResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processEvictEntriesNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processInsertEntriesRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processInsertEntriesResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processInsertEntriesNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processUpdateEntriesRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processUpdateEntriesResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processUpdateEntriesNotification(message: Message): T {
        return this.processMessage(message);
    }
    protected processPublishCustomDataRequest(message: Message): T {
        return this.processMessage(message);
    }
    protected processPublishCustomDataResponse(message: Message): T {
        return this.processMessage(message);
    }
    protected processPublishCustomDataNotification(message: Message): T {
        return this.processMessage(message);
    }
}