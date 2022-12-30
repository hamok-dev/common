import { Message, Message_MessageType } from "./Models";

export abstract class MessageProcessor<T> {
    public constructor() {
    
    }

    public process(message: Message): T | undefined{
        if (!message.type) {
            return;
        }
        switch (message.type) {
            case Message_MessageType.HELLO_NOTIFICATION:
                return this.processHelloNotification(message);
            case Message_MessageType.ENDPOINT_STATES_NOTIFICATION:
                return this.processEndpointStatesNotification(message);

            case Message_MessageType.STORAGE_SYNC_REQUEST:
                return this.processStorageSyncRequest(message);
            case Message_MessageType.STORAGE_SYNC_RESPONSE:
                return this.processStorageSyncResponse(message);

            case Message_MessageType.RAFT_VOTE_REQUEST:
                return this.processRaftVoteRequest(message);
            case Message_MessageType.RAFT_VOTE_RESPONSE:
                return this.processRaftVoteResponse(message);

            case Message_MessageType.RAFT_APPEND_ENTRIES_REQUEST_CHUNK:
                return this.processRaftAppendChunkRequest(message);
            case Message_MessageType.RAFT_APPEND_ENTRIES_RESPONSE:
                return this.processRaftAppendResponse(message);

            case Message_MessageType.SUBMIT_MESSAGE_REQUEST:
                return this.processSubmitMessageRequest(message);
            case Message_MessageType.SUBMIT_MESSAGE_RESPONSE:
                return this.processSubmitMessageResponse(message);

            case Message_MessageType.CLEAR_ENTRIES_REQUEST:
                return this.processClearEntriesRequest(message);
            case Message_MessageType.CLEAR_ENTRIES_RESPONSE:
                return this.processClearEntriesResponse(message);
            case Message_MessageType.CLEAR_ENTRIES_NOTIFICATION:
                return this.processClearEntriesNotification(message);

            case Message_MessageType.GET_ENTRIES_REQUEST:
                return this.processGetEntriesRequest(message);
            case Message_MessageType.GET_ENTRIES_RESPONSE:
                return this.processGetEntriesResponse(message);

            case Message_MessageType.GET_SIZE_REQUEST:
                return this.processGetSizeRequest(message);
            case Message_MessageType.GET_SIZE_RESPONSE:
                return this.processGetSizeResponse(message);

            case Message_MessageType.GET_KEYS_REQUEST:
                return this.processGetKeysRequest(message);
            case Message_MessageType.GET_KEYS_RESPONSE:
                return this.processGetKeysResponse(message);

            case Message_MessageType.DELETE_ENTRIES_REQUEST:
                return this.processDeleteEntriesRequest(message);
            case Message_MessageType.DELETE_ENTRIES_RESPONSE:
                return this.processDeleteEntriesResponse(message);
            case Message_MessageType.DELETE_ENTRIES_NOTIFICATION:
                return this.processDeleteEntriesNotification(message);

            case Message_MessageType.REMOVE_ENTRIES_REQUEST:
                return this.processRemoveEntriesRequest(message);
            case Message_MessageType.REMOVE_ENTRIES_RESPONSE:
                return this.processRemoveEntriesResponse(message);
            case Message_MessageType.REMOVE_ENTRIES_NOTIFICATION:
                return this.processRemoveEntriesNotification(message);

            case Message_MessageType.EVICT_ENTRIES_REQUEST:
                return this.processEvictEntriesRequest(message);
            case Message_MessageType.EVICT_ENTRIES_RESPONSE:
                return this.processEvictEntriesResponse(message);
            case Message_MessageType.EVICT_ENTRIES_NOTIFICATION:
                return this.processEvictEntriesNotification(message);

            case Message_MessageType.INSERT_ENTRIES_REQUEST:
                return this.processInsertEntriesRequest(message);
            case Message_MessageType.INSERT_ENTRIES_RESPONSE:
                return this.processInsertEntriesResponse(message);
            case Message_MessageType.INSERT_ENTRIES_NOTIFICATION:
                return this.processInsertEntriesNotification(message);

            case Message_MessageType.UPDATE_ENTRIES_REQUEST:
                return this.processUpdateEntriesRequest(message);
            case Message_MessageType.UPDATE_ENTRIES_RESPONSE:
                return this.processUpdateEntriesResponse(message);
            case Message_MessageType.UPDATE_ENTRIES_NOTIFICATION:
                return this.processUpdateEntriesNotification(message);

            case Message_MessageType.PUBLISH_CUSTOM_DATA_REQUEST:
                return this.processPublishCustomDataRequest(message);
            case Message_MessageType.PUBLISH_CUSTOM_DATA_RESPONSE:
                return this.processPublishCustomDataResponse(message);
            case Message_MessageType.PUBLISH_CUSTOM_DATA_NOTIFICATION:
                return this.processPublishCustomDataNotification(message);

            default:
                return this.processUnrecognizedMessage(message)
        }
    }

    protected abstract processHelloNotification(message: Message): T;
    protected abstract processEndpointStatesNotification(message: Message): T;
    
    protected abstract processStorageSyncRequest(message: Message): T;
    protected abstract processStorageSyncResponse(message: Message): T;

    protected abstract processRaftVoteRequest(message: Message): T;
    protected abstract processRaftVoteResponse(message: Message): T;

    protected abstract processRaftAppendChunkRequest(message: Message): T;
    protected abstract processRaftAppendResponse(message: Message): T;

    protected abstract processSubmitMessageRequest(message: Message): T;
    protected abstract processSubmitMessageResponse(message: Message): T;

    protected abstract processClearEntriesRequest(message: Message): T;
    protected abstract processClearEntriesResponse(message: Message): T;
    protected abstract processClearEntriesNotification(message: Message): T;

    protected abstract processGetEntriesRequest(message: Message): T;
    protected abstract processGetEntriesResponse(message: Message): T;

    protected abstract processGetSizeRequest(message: Message): T;
    protected abstract processGetSizeResponse(message: Message): T;

    protected abstract processGetKeysRequest(message: Message): T;
    protected abstract processGetKeysResponse(message: Message): T;

    protected abstract processDeleteEntriesRequest(message: Message): T;
    protected abstract processDeleteEntriesResponse(message: Message): T;
    protected abstract processDeleteEntriesNotification(message: Message): T;

    protected abstract processRemoveEntriesRequest(message: Message): T;
    protected abstract processRemoveEntriesResponse(message: Message): T;
    protected abstract processRemoveEntriesNotification(message: Message): T;

    protected abstract processEvictEntriesRequest(message: Message): T;
    protected abstract processEvictEntriesResponse(message: Message): T;
    protected abstract processEvictEntriesNotification(message: Message): T;

    protected abstract processInsertEntriesRequest(message: Message): T;
    protected abstract processInsertEntriesResponse(message: Message): T;
    protected abstract processInsertEntriesNotification(message: Message): T;

    protected abstract processUpdateEntriesRequest(message: Message): T;
    protected abstract processUpdateEntriesResponse(message: Message): T;
    protected abstract processUpdateEntriesNotification(message: Message): T;

    protected abstract processPublishCustomDataRequest(message: Message): T;
    protected abstract processPublishCustomDataResponse(message: Message): T;
    protected abstract processPublishCustomDataNotification(message: Message): T;

    protected abstract processUnrecognizedMessage(message: Message): T;
}