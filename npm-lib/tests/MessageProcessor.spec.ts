import { MessageDefaultProcessor } from "../src/MessageDefaultProcessor";
import { Message, Message_MessageType } from "../src/Models";
class MessageProcessorTest extends MessageDefaultProcessor<void> {
    public invokedProcessMessage = false;
    public invokedProcessUnrecognizedMessage = false;
    public invokedTarget = false;
    protected processMessage(): void {
        this.invokedProcessMessage = true;
    }
    protected processUnrecognizedMessage(): void {
        this.invokedProcessUnrecognizedMessage = true;
    }
};
describe("MessageProcessor", () => {
    it("HELLO_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processHelloNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.HELLO_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("ENDPOINT_STATES_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processEndpointStatesNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.ENDPOINT_STATES_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("STORAGE_SYNC_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processStorageSyncRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.STORAGE_SYNC_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("STORAGE_SYNC_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processStorageSyncResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.STORAGE_SYNC_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("RAFT_VOTE_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processRaftVoteRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.RAFT_VOTE_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("RAFT_VOTE_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processRaftVoteResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.RAFT_VOTE_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("RAFT_APPEND_ENTRIES_REQUEST_CHUNK", () => {
        const processor = new class extends MessageProcessorTest {
            protected processRaftAppendChunkRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.RAFT_APPEND_ENTRIES_REQUEST_CHUNK,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("RAFT_APPEND_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processRaftAppendResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.RAFT_APPEND_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("SUBMIT_MESSAGE_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processSubmitMessageRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.SUBMIT_MESSAGE_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("SUBMIT_MESSAGE_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processSubmitMessageResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.SUBMIT_MESSAGE_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("CLEAR_ENTRIES_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processClearEntriesRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.CLEAR_ENTRIES_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("CLEAR_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processClearEntriesResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.CLEAR_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("CLEAR_ENTRIES_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processClearEntriesNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.CLEAR_ENTRIES_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("GET_ENTRIES_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processGetEntriesRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.GET_ENTRIES_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("GET_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processGetEntriesResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.GET_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("GET_SIZE_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processGetSizeRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.GET_SIZE_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("GET_SIZE_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processGetSizeResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.GET_SIZE_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("GET_KEYS_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processGetKeysRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.GET_KEYS_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("GET_KEYS_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processGetKeysResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.GET_KEYS_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("DELETE_ENTRIES_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processDeleteEntriesRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.DELETE_ENTRIES_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("DELETE_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processDeleteEntriesResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.DELETE_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("DELETE_ENTRIES_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processDeleteEntriesNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.DELETE_ENTRIES_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("REMOVE_ENTRIES_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processRemoveEntriesRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.REMOVE_ENTRIES_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("REMOVE_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processRemoveEntriesResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.REMOVE_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("REMOVE_ENTRIES_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processRemoveEntriesNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.REMOVE_ENTRIES_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("EVICT_ENTRIES_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processEvictEntriesRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.EVICT_ENTRIES_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("EVICT_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processEvictEntriesResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.EVICT_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("EVICT_ENTRIES_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processEvictEntriesNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.EVICT_ENTRIES_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("INSERT_ENTRIES_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processInsertEntriesRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.INSERT_ENTRIES_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("INSERT_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processInsertEntriesResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.INSERT_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("INSERT_ENTRIES_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processInsertEntriesNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.INSERT_ENTRIES_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("UPDATE_ENTRIES_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processUpdateEntriesRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.UPDATE_ENTRIES_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("UPDATE_ENTRIES_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processUpdateEntriesResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.UPDATE_ENTRIES_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("UPDATE_ENTRIES_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processUpdateEntriesNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.UPDATE_ENTRIES_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("PUBLISH_CUSTOM_DATA_REQUEST", () => {
        const processor = new class extends MessageProcessorTest {
            protected processPublishCustomDataRequest(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.PUBLISH_CUSTOM_DATA_REQUEST,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("PUBLISH_CUSTOM_DATA_RESPONSE", () => {
        const processor = new class extends MessageProcessorTest {
            protected processPublishCustomDataResponse(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.PUBLISH_CUSTOM_DATA_RESPONSE,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("PUBLISH_CUSTOM_DATA_NOTIFICATION", () => {
        const processor = new class extends MessageProcessorTest {
            protected processPublishCustomDataNotification(): void {
                this.invokedTarget = true;
            }
        }();
        processor.process(new Message({
            type: Message_MessageType.PUBLISH_CUSTOM_DATA_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(false);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(true);
    });

    it("routeToDefault", () => {
        const processor = new class extends MessageProcessorTest {
        }();
        processor.process(new Message({
            type: Message_MessageType.HELLO_NOTIFICATION,
        }));
        expect(processor.invokedProcessMessage).toBe(true);
        expect(processor.invokedProcessUnrecognizedMessage).toBe(false);
        expect(processor.invokedTarget).toBe(false);
    });

});