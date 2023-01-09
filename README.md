Common library for Hamok
---
This repository is a monorepo for common library written for different 
language bindings for hamok.


Table of Contents:

-   [Schema](#schema)
-   [Hamok Messages](#hamok-messages)
    - [Hello Notification](#hello-notification)
    - [Endpoint State Notification](#endpoint-state-notification)
    - [Storage Sync Request](#storage-sync-request)
        - [Storage Sync Response](#storage-sync-response)
    - [Raft Vote Response](#raft-vote-request)
        - [Raft Vote Response](#raft-vote-response)
    - [Raft Append Chunk Request](#raft-append-chunk-request)
        - [Raft Append Response](#raft-append-response)
    - [Submit Message Request](#submit-message-request)
        - [Submit Message Response](#submit-message-response)
-   [Contributions](#contributions)
-   [License](#license)


## Schema

Hamok uses protobuf prototypes for messaging. 
To generate a schema for hamok you can do:


```javascript
cd schema
npm i
node index.js
```

This generates the messaging schema to all language currently supported and copy 
each generated file into its proper library folder.

## Hamok Messages

Hamok message is the cornerstone of the library in every language it is written in. 
The interpretation of the message determines the state and actions the distributed cluster executes.

Hamok messages can be divided into three categories:  Notifications, Requests, and Responses.
Notifications, Requests and Responses can be interpreted further to the actual type of messages.

Hamok message has the following fields

| Field | Type | Description |
|---|---|---|
| type | enum | The actual type of the message |
| sourceId | string | the source endpoint the message is originated from |
| destinationId | string | The destination endpoint id the message is addressed to. if the destination is unknown it should be null, which case it should be broadcasted |
| storageId | string | the identifier of the storage the message is related to |
| protocol | string | the protocol name inside a storage the message is related to (backups, shards, etc. ) |
| requestId | string | The identifier of the request the destination(s) should use in their response |
| timestamp | uint64 | epoch timestamp in milliseconds the message is generated at |
| storageSize | uint32 |  |
| keys | byte[][] |  |
| values | byte[][] |  |
| activeEndpointIds | string[] |  |
| embeddedMessages | Message[] |  |
| success | boolean |  |
| executeSync | boolean |  |
| raftLeaderId | string |  |
| raftNumberOfLogs | int32 |  |
| raftLastAppliedIndex | int32 |  |
| raftCommitIndex | int32 |  |
| raftLeaderNextIndex | int32 |  |
| raftPrevLogTerm | int32 |  |
| raftPrevLogIndex | int32 |  |
| raftTerm | int32 |  |
| raftPeerNextIndex | int32 |  |
| raftCandidateId | string |  |
| sequence | uint32 |  |
| lastMessage | boolean |  |

### Hello Notification

Message Type: `HELLO_NOTIFICATION`

A Hello Notification is broadcasated by a new client in the grid 
until it does not have any remote endpoint to communicate with.

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourcePeerId | Required | Required | Indicate the source endpoint id sent the notification |
| raftLeaderId | raftLeaderId | Optional | Optional | The leader id the source endpoint aware |


### Endpoint State Notification

Endpoint State Notifications are issued by a Raft Leader to a followers 
informing about known endpoint ids and the actual state

Message Type: `ENDPOINT_STATES_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourceEndpointId | Required | Required | Indicate the source endpoint id sent the notification |
| destinationId | destinationEndpointId | Required | Required | The destination endpoint for the message |
| raftTerm | term | Required | Required | the actual term number the leader is in |
| raftCommitIndex | commitIndex | Required | Required | The actual commit index of the leader |
| raftLeaderNextIndex | leaderNextIndex | Required | Required | The next index of logs for the leader |
| raftNumberOfLogs | numberOfLogs | Required | Required | the number of log entries the leader posses |
| activeEndpointIds | activeEndpointIds | Optional | Optional | The list of known active endpoint ids |


### Storage Sync Request

A Storage Sync Request is issued by a client endpoint once it joins to the grid.
The response should come from the leader (the client retries it until a leader is elected) and based on the response the grid client decides if full dump sync is necessary (cannot catch up with the raft logs becasue too many are missing).

Message Type: `STORAGE_SYNC_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | Globally unique id of the request |
| sourceId | sourceEndpointId | Optional | Required | the id of the source endpoint the request is issued from |
| destinationId | leaderId | Optional | Optional | The endpoint id of the known raft leader should handle the storage sync request |



#### Storage Sync Response

A Storage Sync Response is always issued by a Raft leader and describe the 
state of the Raft log entries it posses.

Message Type: `STORAGE_SYNC_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The id the request |
| destinationId | destinationId | Required | Required | The endpoint id originated the request |
| raftLeaderId | leaderId | Required | Required | the leader id responded to the request |
| raftNumberOfLogs | numberOfLogs | Optional | Optional | the leader known number of logs. if no log is submitted to the leader then its `null` |
| raftLastAppliedIndex | lastApplied | Optional | Optional | the last applied index in the cluster. if no last applied index is available then its `null` |
| raftCommitIndex | commitIndex | Optional | Optional | the index of the commit the leader has. if no commit has happened the value is `null` |

### Raft Vote Request

Message Type: `RAFT_VOTE_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| raftTerm | term | Required | Required |  |
| raftPrevLogIndex | lastLogIndex | Required | Required |  |
| raftPrevLogTerm | lastLogTerm | Required | Required |  |
| destinationId | peerId | Required | Required |  |
| raftCandidateId | candidateId | Required | Required |  |

#### Raft Vote Response

Message Type: `RAFT_VOTE_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| raftTerm | term | Required | Required |  |
| success | voteGranted | Required | Required |  |
| destinationId | destinationPeerId | Required | Required |  |
| sourceId | sourcePeerId | Required | Required |  |



### Raft Append Request Chunk

Message Type: `RAFT_APPEND_ENTRIES_REQUEST_CHUNK`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | the unique id of the request the chunks belong to. The id must be given ieven if the request is not chunked. |
| destinationId | peerId | Required | Required | the destination peer id the append request is addressed to |
| raftLeaderId | leaderId | Required | Required | the id of the leader endpoint (should match to the sourceId) the request is originated from |
| raftCommitIndex | leaderCommit | Required | Required | the highest index of the committed log currently the raft leader known of |
| raftLeaderNextIndex | leaderNextIndex | Required | Required | the next index number for raft logs the leader uses for the next submit |
| raftPrevLogIndex | prevLogIndex | Optional | Optional |  |
| raftPrevLogTerm | prevLogTerm | Optional | Optional |  |
| raftTerm | term | Required | Required | The term the leader is elected for |
| sequence | sequence | Required | Required | the sequence number of the request if the request is chunked, starts with `0` |
| lastMessage | lastMessage | Required | Required | Boolean value indicates if this chunk is the last or not |
| embeddedMessages | entry | Optional | Optional | the log entry the leader shares with the follower. Each follower add this entry with the next index |

#### Raft Append Response

Message Type: `RAFT_APPEND_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The id of the request the peer responded to |
| sourceId | sourcePeerId | Required | Required | the id of the peer the response is originated from |
| destinationId | destinationPeerId | Required | Required | the destination id (the cluster leader id) the message is addressed to |
| raftTerm | term | Required | Required | the term the request is processed for |
| success | success | Required | Required | indicate if the log is appended on the peer or not |
| raftPeerNextIndex | peerNextIndex | Required | Required | the next index number the follower peer has at the moment the response is generated |
| lastMessage | processed | Required | Required | indicate if the request is processed fully or not. Follower can send a response after each chunk is received, but until a full request is assembled and processed the follower send `false` to the processed to indicate the request has not been fully processed. |


### Submit Message Request

Message Type: `SUBMIT_MESSAGE_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The globally unique id of the request |
| embeddedMessages | entry | Required | Required | the submitted message to the raft |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint the request is originaged from |
| destinationId | destinationEndpointId | Optional | Optional | the assumed leader id the message need to be submitted. If it is not given, the request is broadcasted, but only the leader will respond (if the cluster has any) |

### Submit Message Response

Submit message response can only issued by the Raft leader.

Message Type: `SUBMIT_MESSAGE_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The id the response belong to. |
| success | success | Required | Required | Indicate if the request is submitted to the leader or not. |
| destinationId | destinationEndpointId | Required | Required | The destination endpoint the request is originated from and the response should be sent to |
| raftLeaderId | leaderId | Required | Required | The endpoint id of the raft the message is originaged from |


### Clear Entries Request

Message Type: `CLEAR_ENTRIES_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |

#### Clear Entries Response

Message Type: `CLEAR_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint id the response will sent to |

### Clear Entries Notification

Message Type: `CLEAR_ENTRIES_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint the notification is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

### Get Entries Request

Message Type: `GET_ENTRIES_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys | keys | Required | Required | The subjected keys entries are requested for |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |

#### Get Entries Response

Message Type: `GET_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint the notification is sent from |
| keys, values | foundEntries | Required | Required | The existing entries found on an endpoint |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

### Get Size Request

Message Type: `GET_SIZE_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint the notification is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

#### Get Size Response

Message Type: `GET_SIZE_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint the notification is sent from |
| storageSize | size | Required | Required | The size of the storage |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

### Get Size Request

Message Type: `GET_KEYS_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint the notification is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

#### Get Size Response

Message Type: `GET_KEYS_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint the notification is sent from |
| keys | keys | Required | Required | All existing keys the storage has on an endpoint |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

### Delete Entries Request

Message Type: `DELETE_ENTRIES_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys | keys | Required | Required | The subjected keys has to be deleted on a remote endpoint |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |

### Delete Entries Response

Message Type: `DELETE_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys | deletedKeys | Required | Required | The key of entries deleted on a remote endpoint |
| destinationId | destinationEndpointId | Optional | Optional | The source endpoint id the request is sent from |

### Delete Entries Notification

Message Type: `DELETE_ENTRIES_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| keys | keys | Required | Required | The subjected keys has to be deleted on a remote endpoint |
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint id the notification is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

#### Remove Entries Request

Message Type: `REMOVE_ENTRIES_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys | keys | Required | Required | The subjected keys has to be deleted on a remote endpoint |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |

### Remove Entries Response

Message Type: `REMOVE_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys, values | removedEntries | Required | Required | The key of entries deleted on a remote endpoint |
| destinationId | destinationEndpointId | Optional | Optional | The source endpoint id the request is sent from |

### Remove Entries Notification

Message Type: `REMOVE_ENTRIES_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| keys | keys | Required | Required | The subjected keys has to be deleted on a remote endpoint |
| sourceId | sourceEndpointId | Optional | Optional | The source endpoint id the notification is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint the notification is sent to |

### Evict Entries Request

Message Type: `EVICT_ENTRIES_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys | keys | Required | Required | The subjected keys has to be evicted on a remote endpoint |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |

#### Evict Entries Response

Message Type: `EVICT_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request the response belong to |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint id the request is sent to |

### Evict Entries Notification

Message Type: `EVICT_ENTRIES_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| keys | keys | Required | Required | The subjected keys has to be evicted on a remote endpoint |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint id the request is sent to |

### Insert Entries Request

Message Type: `INSERT_ENTRIES_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys, values | entries | Required | Required | The subjected entries intended to be inserted on a remote endpoint |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |

#### Insert Entries Response

Message Type: `INSERT_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys, values | existingEntries | Required | Required | Entries already exists on a remote endpoint and did not overwritten |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint id the request is sent to |

### Insert Entries Notification

Message Type: `INSERT_ENTRIES_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| keys, values | existingEntries | Required | Required | Entries already exists on a remote endpoint and did not overwritten |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the notification is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint id the notification is sent to |

### Update Entries Request

Message Type: `UPDATE_ENTRIES_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys, values | entries | Required | Required | Entries intended to be created or updated |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the request is sent from |

#### Update Entries Response

Message Type: `UPDATE_ENTRIES_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| requestId | requestId | Required | Required | The unique global id of the request |
| keys, values | updatedEntries | Required | Required | Entries already exists on a remote endpoint and updated. the response contain the old values before the update performed |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint id the notification is sent to |

### Update Entries Notification

Message Type: `UPDATE_ENTRIES_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
| keys, values | entries | Required | Required | Entries intended to be created or updated |
| sourceId | sourceEndpointId | Optional | Required | The source endpoint id the notification is sent from |
| destinationId | destinationEndpointId | Optional | Optional | The destination endpoint id the notification is sent to |

### Publish Custom Data Request

Message Type: `PUBLISH_CUSTOM_DATA_REQUEST`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

#### Publish Custom Data Response

Message Type: `PUBLISH_CUSTOM_DATA_RESPONSE`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

### Publish Custom Data Notification

Message Type: `PUBLISH_CUSTOM_DATA_NOTIFICATION`

| Message Field | Target Field | Encoding | Decoding | Description |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

## Contributions

## License
