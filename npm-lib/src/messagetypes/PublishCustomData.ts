export class PublishCustomDataRequest {
    public readonly requestId: string;
    public readonly customData: Uint8Array[];
    public readonly sourceEndpointId?: string;
    public constructor(
        requetId: string,
        entries: Uint8Array[],
        sourceEndpointId?: string,
    ) {
        this.requestId = requetId;
        this.customData = entries;
        this.sourceEndpointId = sourceEndpointId;
    }

    public createResponse(
        success: boolean
    ): PublishCustomDataResponse {
        return new PublishCustomDataResponse(
            this.requestId,
            success,
            this.sourceEndpointId
        );
    }
}

export class PublishCustomDataResponse {
    public readonly requestId: string;
    public readonly success: boolean;
    public readonly destinationEndpointId?: string;
    public constructor(
        requestId: string,
        success: boolean,
        destinationEndpointId?: string
    ) {
        this.requestId = requestId;
        this.success = success;
        this.destinationEndpointId = destinationEndpointId;
    }
}

export class PublishCustomDataNotification<K> {
    public readonly sourceEndpointId?: string;
    public readonly destinationEndpointId?: string;
    public constructor(
        sourceEndpointId?: string,
        destinationEndpointId?: string,
    ) {
        this.sourceEndpointId = sourceEndpointId;
        this.destinationEndpointId = destinationEndpointId;
    }
}

