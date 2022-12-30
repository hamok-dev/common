export class HelloNotification {
    public readonly sourcePeerId: string;
    public readonly raftLeaderId?: string;
    public constructor(
        sourcePeerId: string, 
        raftLeaderId?: string
    ) {
        this.sourcePeerId = sourcePeerId;
        this.raftLeaderId = raftLeaderId;
    }
}