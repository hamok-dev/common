export class OngoingRequestsNotification {
    public readonly requestIds: ReadonlySet<string>;
    public readonly destinationEndpointId?: string;
    public constructor(
        requetIds: ReadonlySet<string>,
        destinationEndpointId?: string
    ) {
        this.requestIds = requetIds;
        this.destinationEndpointId = destinationEndpointId;
    }
}
