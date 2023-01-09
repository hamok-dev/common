import { PubSubCodec } from "../src/PubSubCodec";
import { Message } from "../src/Models";
import { AddSubscriptionRequest } from "../src/messagetypes/AddSubscription";
import { GetSubscriptionsRequest, GetSubscriptionsResponse } from "../src/messagetypes/GetSubscriptions";

function equalSets<T>(setA: ReadonlySet<T>, setB: ReadonlySet<T>): boolean {
    if (setA.size !== setB.size) return false;
    for (const item of setA) 
        if (!setB.has(item)) return false;
    for (const item of setB) 
        if (!setA.has(item)) return false;
    return true;
}

describe("PubSub", () => {
    const codec = new PubSubCodec();
    it("AddSubscriptionRequest", () => {
        const expected = new AddSubscriptionRequest(
            "requestId",
            "event",
            "sourceId"
        );
        const message = codec.encode(expected);
        const actual = codec.decode(message) as AddSubscriptionRequest;
        
        expect(message.sourceId).toBe(expected.sourceEndpointId);
        expect(message.storageId).toBe(expected.event);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.event).toBe(actual.event);
        expect(expected.sourceEndpointId).toBe(actual.sourceEndpointId);
    });


    it("GetSubscriptionsResponse", () => {
        const expectedSubscriptions = new Map<string, Set<string>>([["event", new Set<string>(["endpoint1", "endpoint2"])]]);
        const expected = new GetSubscriptionsResponse(
            "requestId",
            expectedSubscriptions,
            "sourceId"
        );
        const message = codec.encode(expected);
        const actual = codec.decode(message) as GetSubscriptionsResponse;
        const actualSubscriptions = actual.subscriptions;

        expect(message.destinationId).toBe(expected.destinationEndpointId);
        expect(message.requestId).toBe(expected.requestId);

        expect(expected.requestId).toBe(actual.requestId);
        expect(expectedSubscriptions.get("event")!.has("endpoint1")).toBe(actualSubscriptions.get("event")!.has("endpoint1"));
    });
});
