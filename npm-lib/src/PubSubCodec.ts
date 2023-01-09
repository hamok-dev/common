import { Codec } from ".";
import { createLogger } from "./logger";
import { AddSubscriptionNotification, AddSubscriptionRequest, AddSubscriptionResponse } from "./messagetypes/AddSubscription";
import { GetSubscriptionsRequest, GetSubscriptionsResponse } from "./messagetypes/GetSubscriptions";
import { PublishCustomDataNotification, PublishCustomDataRequest, PublishCustomDataResponse } from "./messagetypes/PublishCustomData";
import { RemoveSubscriptionNotification, RemoveSubscriptionRequest, RemoveSubscriptionResponse } from "./messagetypes/RemoveSubscription";
import { Message, Message_MessageType as MessageType } from "./Models";

type Input = 
    AddSubscriptionRequest |
    AddSubscriptionResponse |
    AddSubscriptionNotification |
    RemoveSubscriptionRequest |
    RemoveSubscriptionResponse | 
    RemoveSubscriptionNotification |
    PublishCustomDataRequest |
    PublishCustomDataResponse | 
    PublishCustomDataNotification |
    GetSubscriptionsRequest |
    GetSubscriptionsResponse
    ;

export class PubSubCodec implements Codec<Input, Message> {
    
    public encode(input: Input): Message {
        switch (input.constructor) {
            case AddSubscriptionRequest:
                return this.encodeAddSubscriptionRequest(input as AddSubscriptionRequest);
            case AddSubscriptionResponse:
                return this.encodeAddSubscriptionResponse(input as AddSubscriptionResponse);
            case AddSubscriptionNotification:
                return this.encodeAddSubscriptionNotification(input as AddSubscriptionNotification);
            
            case RemoveSubscriptionRequest:
                return this.encodeRemoveSubscriptionRequest(input as RemoveSubscriptionRequest);
            case RemoveSubscriptionResponse:
                return this.encodeRemoveSubscriptionResponse(input as RemoveSubscriptionResponse);
            case RemoveSubscriptionNotification:
                return this.encodeRemoveSubscriptionNotification(input as RemoveSubscriptionNotification);

            case PublishCustomDataRequest:
                return this.encodePublishCustomDataRequest(input as PublishCustomDataRequest);
            case PublishCustomDataResponse:
                return this.encodePublishCustomDataResponse(input as PublishCustomDataResponse);
            case PublishCustomDataNotification:
                return this.encodePublishCustomDataNotification(input as PublishCustomDataNotification);
            
            case GetSubscriptionsRequest:
                return this.encodeGetSubscriptionsRequest(input as GetSubscriptionsRequest);
            case GetSubscriptionsResponse:
                return this.encodeGetSubscriptionsResponse(input as GetSubscriptionsResponse);
            default:
                throw new Error(`Cannot encode input` + input);
        }
    }

    public decode(message: Message): Input {
        switch(message.type) {
            case MessageType.ADD_SUBSCRIPTION_REQUEST:
                return this.decodeAddSubscriptionRequest(message);
            case MessageType.ADD_SUBSCRIPTION_RESPONSE:
                return this.decodeAddSubscriptionResponse(message);
            case MessageType.ADD_SUBSCRIPTION_NOTIFICATION:
                return this.decodeAddSubscriptionNotification(message);

            case MessageType.REMOVE_ENTRIES_REQUEST:
                return this.decodeRemoveSubscriptionRequest(message);
            case MessageType.REMOVE_ENTRIES_RESPONSE:
                return this.decodeRemoveSubscriptionResponse(message);
            case MessageType.REMOVE_ENTRIES_NOTIFICATION:
                return this.decodeRemoveSubscriptionNotification(message);

            case MessageType.PUBLISH_CUSTOM_DATA_REQUEST:
                return this.decodePublishCustomDataRequest(message);
            case MessageType.PUBLISH_CUSTOM_DATA_RESPONSE:
                return this.decodePublishCustomDataResponse(message);
            case MessageType.PUBLISH_CUSTOM_DATA_NOTIFICATION:
                return this.decodePublishCustomDataNotification(message);

            case MessageType.GET_SUBSCRIPTIONS_REQUEST:
                return this.decodeGetSubscriptionsRequest(message);
            case MessageType.GET_SUBSCRIPTIONS_RESPONSE:
                return this.decodeGetSubscriptionsResponse(message);
            default:
                throw new Error(`Cannot decode message` + message);
        }
    }

    public encodeAddSubscriptionRequest(request: AddSubscriptionRequest): Message {
        return new Message({
            type: MessageType.ADD_SUBSCRIPTION_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId,
            storageId: request.event,
        });
    }

    public decodeAddSubscriptionRequest(message: Message): AddSubscriptionRequest {
        if (message.type !== MessageType.ADD_SUBSCRIPTION_REQUEST) {
            throw new Error(`decodeAddSubscriptionRequest(): Message type must be ADD_SUBSCRIPTION_REQUEST`);
        }
        return new AddSubscriptionRequest(
            message.requestId!,
            message.storageId!,
            message.sourceId!,
        )
    }

    public encodeAddSubscriptionResponse(response: AddSubscriptionResponse): Message {
        return new Message({
            type: MessageType.ADD_SUBSCRIPTION_RESPONSE,
            requestId: response.requestId,
            success: response.success,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeAddSubscriptionResponse(message: Message): AddSubscriptionResponse {
        if (message.type !== MessageType.ADD_SUBSCRIPTION_RESPONSE) {
            throw new Error(`decodeAddSubscriptionResponse(): Message type must be ADD_SUBSCRIPTION_RESPONSE`);
        }
        return new AddSubscriptionResponse(
            message.requestId!,
            !!message.success,
            message.destinationId,
        )
    }

    public encodeAddSubscriptionNotification(notification: AddSubscriptionNotification): Message {
        return new Message({
            type: MessageType.ADD_SUBSCRIPTION_NOTIFICATION,
            storageId: notification.event,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
        });
    }

    public decodeAddSubscriptionNotification(message: Message): AddSubscriptionNotification {
        if (message.type !== MessageType.ADD_SUBSCRIPTION_NOTIFICATION) {
            throw new Error(`decodeAddSubscriptionNotification(): Message type must be ADD_SUBSCRIPTION_NOTIFICATION`);
        }
        return new AddSubscriptionNotification(
            message.storageId!,
            message.sourceId,
            message.destinationId,
        )
    }


    public encodeRemoveSubscriptionRequest(request: RemoveSubscriptionRequest): Message {
        return new Message({
            type: MessageType.REMOVE_SUBSCRIPTION_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId,
            storageId: request.event,
        });
    }

    public decodeRemoveSubscriptionRequest(message: Message): RemoveSubscriptionRequest {
        if (message.type !== MessageType.REMOVE_SUBSCRIPTION_REQUEST) {
            throw new Error(`decodeRemoveSubscriptionRequest(): Message type must be REMOVE_SUBSCRIPTION_REQUEST`);
        }
        return new RemoveSubscriptionRequest(
            message.requestId!,
            message.storageId!,
            message.sourceId!,
        )
    }

    public encodeRemoveSubscriptionResponse(response: RemoveSubscriptionResponse): Message {
        return new Message({
            type: MessageType.REMOVE_SUBSCRIPTION_RESPONSE,
            requestId: response.requestId,
            success: response.success,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeRemoveSubscriptionResponse(message: Message): RemoveSubscriptionResponse {
        if (message.type !== MessageType.REMOVE_SUBSCRIPTION_RESPONSE) {
            throw new Error(`decodeRemoveSubscriptionResponse(): Message type must be REMOVE_SUBSCRIPTION_RESPONSE`);
        }
        return new RemoveSubscriptionResponse(
            message.requestId!,
            !!message.success,
            message.destinationId,
        )
    }

    public encodeRemoveSubscriptionNotification(notification: RemoveSubscriptionNotification): Message {
        return new Message({
            type: MessageType.REMOVE_SUBSCRIPTION_NOTIFICATION,
            storageId: notification.event,
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
        });
    }

    public decodeRemoveSubscriptionNotification(message: Message): RemoveSubscriptionNotification {
        if (message.type !== MessageType.REMOVE_SUBSCRIPTION_NOTIFICATION) {
            throw new Error(`decodeRemoveSubscriptionNotification(): Message type must be REMOVE_SUBSCRIPTION_NOTIFICATION`);
        }
        return new RemoveSubscriptionNotification(
            message.storageId!,
            message.sourceId,
            message.destinationId,
        )
    }

    public encodePublishCustomDataRequest(request: PublishCustomDataRequest): Message {
        return new Message({
            type: MessageType.PUBLISH_CUSTOM_DATA_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId,
            storageId: request.event,
            values: [request.customData],
        });
    }

    public decodePublishCustomDataRequest(message: Message): PublishCustomDataRequest {
        if (message.type !== MessageType.PUBLISH_CUSTOM_DATA_REQUEST) {
            throw new Error(`decodePublishCustomDataRequest(): Message type must be PUBLISH_DATA_REQUEST`);
        }
        return new PublishCustomDataRequest(
            message.requestId!,
            message.storageId!,
            message.values[0],
            message.sourceId!,
        )
    }

    public encodePublishCustomDataResponse(response: PublishCustomDataResponse): Message {
        return new Message({
            type: MessageType.PUBLISH_CUSTOM_DATA_RESPONSE,
            requestId: response.requestId,
            success: response.success,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodePublishCustomDataResponse(message: Message): PublishCustomDataResponse {
        if (message.type !== MessageType.PUBLISH_CUSTOM_DATA_RESPONSE) {
            throw new Error(`decodePublishCustomDataResponse(): Message type must be PUBLISH_DATA_RESPONSE`);
        }
        return new PublishCustomDataResponse(
            message.requestId!,
            !!message.success,
            message.destinationId,
        )
    }

    public encodePublishCustomDataNotification(notification: PublishCustomDataNotification): Message {
        return new Message({
            type: MessageType.PUBLISH_CUSTOM_DATA_NOTIFICATION,
            storageId: notification.event,
            values: [notification.customData],
            sourceId: notification.sourceEndpointId,
            destinationId: notification.destinationEndpointId,
        });
    }

    public decodePublishCustomDataNotification(message: Message): PublishCustomDataNotification {
        if (message.type !== MessageType.PUBLISH_CUSTOM_DATA_NOTIFICATION) {
            throw new Error(`decodePublishCustomDataNotification(): Message type must be PUBLISH_DATA_NOTIFICATION`);
        }
        return new PublishCustomDataNotification(
            message.storageId!,
            message.values[0],
            message.sourceId,
            message.destinationId,
        )
    }


    public encodeGetSubscriptionsRequest(request: GetSubscriptionsRequest): Message {
        return new Message({
            type: MessageType.GET_SUBSCRIPTIONS_REQUEST,
            requestId: request.requestId,
            sourceId: request.sourceEndpointId,
        });
    }

    public decodeGetSubscriptionsRequest(message: Message): GetSubscriptionsRequest {
        if (message.type !== MessageType.GET_SUBSCRIPTIONS_REQUEST) {
            throw new Error(`decodePublishCustomDataRequest(): Message type must be PUBLISH_DATA_REQUEST`);
        }
        return new GetSubscriptionsRequest(
            message.requestId!,
            message.sourceId,
        )
    }


    public encodeGetSubscriptionsResponse(response: GetSubscriptionsResponse): Message {
        const keys: Uint8Array[] = [];
        const values: Uint8Array[] = [];
        for (const [topic, remoteEndpointIds] of response.subscriptions) {
            const encodedKey: Uint8Array = Buffer.from(topic, "utf-8");
            const json = JSON.stringify(Array.from(remoteEndpointIds))
            const encodedValue: Uint8Array = Buffer.from(json, "utf-8");
            keys.push(encodedKey);
            values.push(encodedValue);
        }
        return new Message({
            type: MessageType.GET_SUBSCRIPTIONS_RESPONSE,
            requestId: response.requestId,
            keys,
            values,
            destinationId: response.destinationEndpointId,
        });
    }

    public decodeGetSubscriptionsResponse(message: Message): GetSubscriptionsResponse {
        if (message.type !== MessageType.GET_SUBSCRIPTIONS_RESPONSE) {
            throw new Error(`decodePublishCustomDataResponse(): Message type must be GET_SUBSCRIPTIONS_RESPONSE`);
        }
        const subscriptions = new Map<string, Set<string>>();
        const { keys, values } = message;
        const length = Math.min(keys.length, values.length);
        for (let index = 0; index < length; ++index) {
            const key = keys[index];
            const value = values[index];
            const topic = Buffer.from(key).toString("utf-8");
            const json = Buffer.from(value).toString("utf-8");
            const remoteEndpointIds = JSON.parse(json);
            subscriptions.set(topic, new Set<string>(remoteEndpointIds));
        }

        return new GetSubscriptionsResponse(
            message.requestId!,
            subscriptions,
            message.destinationId,
        )
    }
}