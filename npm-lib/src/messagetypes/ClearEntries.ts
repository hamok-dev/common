export class ClearEntriesRequest<K> {
    public readonly requestId: string;
    public readonly sourceEndpointId?: string;
    public constructor(
        requetId: string,
        sourceEndpointId?: string
    ) {
        this.requestId = requetId;
        this.sourceEndpointId = sourceEndpointId;
    }

    public createResponse(): ClearEntriesResponse {
        return new ClearEntriesResponse(
            this.requestId,
            this.sourceEndpointId
        );
    }
}

export class ClearEntriesResponse {
    public readonly requestId: string;
    public readonly destinationEndpointId?: string;
    public constructor(
        requetId: string,
        destinationEndpointId?: string
    ) {
        this.requestId = requetId;
        this.destinationEndpointId = destinationEndpointId;
    }
}

export class ClearEntriesNotification<K> {
    public readonly sourceEndpointId?: string;
    public readonly destinationEndpointId?: string;
    public constructor(
        sourceEndpointId?: string,
        destinationEndpointId?: string
    ) {
        this.sourceEndpointId = sourceEndpointId;
        this.destinationEndpointId = destinationEndpointId;
    }
}

