// @generated by protoc-gen-es v1.0.0 with parameter "target=ts"
// @generated from file protos/models.proto (package io.github.hamok.dev.schema, syntax proto2)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message as Message$1, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message io.github.hamok.dev.schema.Message
 */
export class Message extends Message$1<Message> {
  /**
   * @generated from field: optional io.github.hamok.dev.schema.Message.MessageProtocol protocol = 1;
   */
  protocol?: Message_MessageProtocol;

  /**
   * @generated from field: optional io.github.hamok.dev.schema.Message.MessageType type = 2;
   */
  type?: Message_MessageType;

  /**
   * @generated from field: optional string sourceId = 3;
   */
  sourceId?: string;

  /**
   * @generated from field: optional string destinationId = 4;
   */
  destinationId?: string;

  /**
   * @generated from field: optional string storageId = 5;
   */
  storageId?: string;

  /**
   * @generated from field: optional string requestId = 6;
   */
  requestId?: string;

  /**
   * @generated from field: optional uint64 timestamp = 7;
   */
  timestamp?: bigint;

  /**
   * @generated from field: optional int32 storageSize = 8;
   */
  storageSize?: number;

  /**
   * @generated from field: repeated bytes keys = 10;
   */
  keys: Uint8Array[] = [];

  /**
   * @generated from field: repeated bytes values = 11;
   */
  values: Uint8Array[] = [];

  /**
   * @generated from field: repeated string activeEndpointIds = 12;
   */
  activeEndpointIds: string[] = [];

  /**
   * @generated from field: repeated io.github.hamok.dev.schema.Message embeddedMessages = 13;
   */
  embeddedMessages: Message[] = [];

  /**
   * @generated from field: optional bool success = 14;
   */
  success?: boolean;

  /**
   * @generated from field: optional bool executeSync = 15;
   */
  executeSync?: boolean;

  /**
   * @generated from field: optional string raftLeaderId = 16;
   */
  raftLeaderId?: string;

  /**
   * @generated from field: optional int32 raftNumberOfLogs = 17;
   */
  raftNumberOfLogs?: number;

  /**
   * @generated from field: optional int32 raftLastAppliedIndex = 18;
   */
  raftLastAppliedIndex?: number;

  /**
   * @generated from field: optional int32 raftCommitIndex = 19;
   */
  raftCommitIndex?: number;

  /**
   * @generated from field: optional int32 raftLeaderNextIndex = 20;
   */
  raftLeaderNextIndex?: number;

  /**
   * @generated from field: optional int32 raftPrevLogTerm = 21;
   */
  raftPrevLogTerm?: number;

  /**
   * @generated from field: optional int32 raftPrevLogIndex = 22;
   */
  raftPrevLogIndex?: number;

  /**
   * @generated from field: optional int32 raftTerm = 23;
   */
  raftTerm?: number;

  /**
   * @generated from field: optional int32 raftPeerNextIndex = 24;
   */
  raftPeerNextIndex?: number;

  /**
   * @generated from field: optional string raftCandidateId = 25;
   */
  raftCandidateId?: string;

  /**
   * @generated from field: optional int32 sequence = 26;
   */
  sequence?: number;

  /**
   * optional int64 message_sequence = 28;
   *
   * @generated from field: optional bool lastMessage = 27;
   */
  lastMessage?: boolean;

  constructor(data?: PartialMessage<Message>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime = proto2;
  static readonly typeName = "io.github.hamok.dev.schema.Message";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "protocol", kind: "enum", T: proto2.getEnumType(Message_MessageProtocol), opt: true },
    { no: 2, name: "type", kind: "enum", T: proto2.getEnumType(Message_MessageType), opt: true },
    { no: 3, name: "sourceId", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 4, name: "destinationId", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 5, name: "storageId", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 6, name: "requestId", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 7, name: "timestamp", kind: "scalar", T: 4 /* ScalarType.UINT64 */, opt: true },
    { no: 8, name: "storageSize", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 10, name: "keys", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
    { no: 11, name: "values", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
    { no: 12, name: "activeEndpointIds", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 13, name: "embeddedMessages", kind: "message", T: Message, repeated: true },
    { no: 14, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 15, name: "executeSync", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
    { no: 16, name: "raftLeaderId", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 17, name: "raftNumberOfLogs", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 18, name: "raftLastAppliedIndex", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 19, name: "raftCommitIndex", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 20, name: "raftLeaderNextIndex", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 21, name: "raftPrevLogTerm", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 22, name: "raftPrevLogIndex", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 23, name: "raftTerm", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 24, name: "raftPeerNextIndex", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 25, name: "raftCandidateId", kind: "scalar", T: 9 /* ScalarType.STRING */, opt: true },
    { no: 26, name: "sequence", kind: "scalar", T: 5 /* ScalarType.INT32 */, opt: true },
    { no: 27, name: "lastMessage", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Message {
    return new Message().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Message {
    return new Message().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Message {
    return new Message().fromJsonString(jsonString, options);
  }

  static equals(a: Message | PlainMessage<Message> | undefined, b: Message | PlainMessage<Message> | undefined): boolean {
    return proto2.util.equals(Message, a, b);
  }
}

/**
 * @generated from enum io.github.hamok.dev.schema.Message.MessageType
 */
export enum Message_MessageType {
  /**
   * *
   * Hello notifications are sent by every endpoint in order to inform every other endpoint
   * about the existance.
   *
   * @generated from enum value: HELLO_NOTIFICATION = 1;
   */
  HELLO_NOTIFICATION = 1,

  /**
   * *
   * Endpoint states are sent by the leader of the grid.
   * Endpoint state contains information about active and inactive endpoints, so every endpoint can keep up to date
   * about the remote endpoints
   *
   * @generated from enum value: ENDPOINT_STATES_NOTIFICATION = 2;
   */
  ENDPOINT_STATES_NOTIFICATION = 2,

  /**
   * *
   * Inform endpoint about the requests currently ongoing and prevent the requester to timeout those.
   * (fetching took more time than time requestTimeout)
   *
   * @generated from enum value: ONGOING_REQUESTS_NOTIFICATION = 3;
   */
  ONGOING_REQUESTS_NOTIFICATION = 3,

  /**
   * *
   * Storage sync is requested by a follower endpoint because it cannot follow the leader. In this case
   * leader should dump every entry from storages synchronized by the endpoint (e.g.: replicated storage) and send it to the follower
   *
   * @generated from enum value: STORAGE_SYNC_REQUEST = 8;
   */
  STORAGE_SYNC_REQUEST = 8,

  /**
   * *
   * A sync response sent by the leader to the follower contains all entries plus the commit index of the raft
   * the state is corresponded to, so the follower can refresh its raft and commit index.
   *
   * @generated from enum value: STORAGE_SYNC_RESPONSE = 9;
   */
  STORAGE_SYNC_RESPONSE = 9,

  /**
   * *
   * Raft Vote request is sent by a raccoon made itself a candidate 
   * in order to be a leader of the cluster
   *
   * @generated from enum value: RAFT_VOTE_REQUEST = 12;
   */
  RAFT_VOTE_REQUEST = 12,

  /**
   * *
   * Raft Vote Response is a response to a vote request
   * contain if the voting is succeeded or not
   *
   * @generated from enum value: RAFT_VOTE_RESPONSE = 13;
   */
  RAFT_VOTE_RESPONSE = 13,

  /**
   * *
   * Raft Append entries chunk is sent by the leader to followers in a cluster
   * for heartbeat and log distribution purposes
   *
   * @generated from enum value: RAFT_APPEND_ENTRIES_REQUEST_CHUNK = 16;
   */
  RAFT_APPEND_ENTRIES_REQUEST_CHUNK = 16,

  /**
   * *
   * Raft Append entries response is sent by a follower to the leader
   * in order to inform the leader about the acceptance of the append request
   *
   * @generated from enum value: RAFT_APPEND_ENTRIES_RESPONSE = 17;
   */
  RAFT_APPEND_ENTRIES_RESPONSE = 17,

  /**
   * *
   * Submit request is sent by any endpoint to the leader of the cluster
   * in order to push a log entry to the Raft processed by Raccoons.
   *
   * @generated from enum value: SUBMIT_MESSAGE_REQUEST = 20;
   */
  SUBMIT_MESSAGE_REQUEST = 20,

  /**
   * *
   * Submit response is a response from a leader endpoint to the follower
   * inform about the success or failure correspondent to the request
   *
   * @generated from enum value: SUBMIT_MESSAGE_RESPONSE = 21;
   */
  SUBMIT_MESSAGE_RESPONSE = 21,

  /**
   * *
   * Request to clear the storage
   *
   * @generated from enum value: CLEAR_ENTRIES_REQUEST = 24;
   */
  CLEAR_ENTRIES_REQUEST = 24,

  /**
   * *
   * Response about the cleared storage
   *
   * @generated from enum value: CLEAR_ENTRIES_RESPONSE = 25;
   */
  CLEAR_ENTRIES_RESPONSE = 25,

  /**
   * *
   * Clear entries notification
   *
   * @generated from enum value: CLEAR_ENTRIES_NOTIFICATION = 26;
   */
  CLEAR_ENTRIES_NOTIFICATION = 26,

  /**
   * *
   * Request entries from remote endpoint(s).
   *
   * @generated from enum value: GET_ENTRIES_REQUEST = 28;
   */
  GET_ENTRIES_REQUEST = 28,

  /**
   * *
   * Response to a gen entries request contain the found entries
   *
   * @generated from enum value: GET_ENTRIES_RESPONSE = 29;
   */
  GET_ENTRIES_RESPONSE = 29,

  /**
   * *
   * Request the size of a storage
   *
   * @generated from enum value: GET_SIZE_REQUEST = 32;
   */
  GET_SIZE_REQUEST = 32,

  /**
   * *
   * Response to size request
   *
   * @generated from enum value: GET_SIZE_RESPONSE = 33;
   */
  GET_SIZE_RESPONSE = 33,

  /**
   * *
   * Request all the keys a storage on a remote endpoint(s) has.
   *
   * @generated from enum value: GET_KEYS_REQUEST = 36;
   */
  GET_KEYS_REQUEST = 36,

  /**
   * *
   * Response to a keys request contain all the keys an endpoint has
   *
   * @generated from enum value: GET_KEYS_RESPONSE = 37;
   */
  GET_KEYS_RESPONSE = 37,

  /**
   * *
   * Request to delete entries on a remote endpoint
   *
   * @generated from enum value: DELETE_ENTRIES_REQUEST = 40;
   */
  DELETE_ENTRIES_REQUEST = 40,

  /**
   * *
   * Response to a delete request
   *
   * @generated from enum value: DELETE_ENTRIES_RESPONSE = 41;
   */
  DELETE_ENTRIES_RESPONSE = 41,

  /**
   * *
   * Notification about deleting
   *
   * @generated from enum value: DELETE_ENTRIES_NOTIFICATION = 42;
   */
  DELETE_ENTRIES_NOTIFICATION = 42,

  /**
   * *
   * Request to delete entries on a remote endpoint
   *
   * @generated from enum value: REMOVE_ENTRIES_REQUEST = 44;
   */
  REMOVE_ENTRIES_REQUEST = 44,

  /**
   * *
   * Response to a delete request
   *
   * @generated from enum value: REMOVE_ENTRIES_RESPONSE = 45;
   */
  REMOVE_ENTRIES_RESPONSE = 45,

  /**
   * *
   * Notification to remove specific entries from the storage.
   * the difference between delete and remove that remove send the values
   * specifically need to be removed and delete only send the keys. It is useful for distributed collections
   *
   *
   * @generated from enum value: REMOVE_ENTRIES_NOTIFICATION = 46;
   */
  REMOVE_ENTRIES_NOTIFICATION = 46,

  /**
   * *
   * Request to evict entries on a remote endpoint
   *
   * @generated from enum value: EVICT_ENTRIES_REQUEST = 48;
   */
  EVICT_ENTRIES_REQUEST = 48,

  /**
   * *
   * Response for the evict request
   *
   * @generated from enum value: EVICT_ENTRIES_RESPONSE = 49;
   */
  EVICT_ENTRIES_RESPONSE = 49,

  /**
   * *
   * Notification to evict entries
   *
   * @generated from enum value: EVICT_ENTRIES_NOTIFICATION = 50;
   */
  EVICT_ENTRIES_NOTIFICATION = 50,

  /**
   * *
   * Insert item(s) only if they don't exist. if they
   * exist then it returns with the value associated
   *
   * NOTE: Only the storage entries replicated by a
   * distributed and coordinated way like by a Raft algorithm
   * can guarantee that insert is atomic
   *
   *
   * @generated from enum value: INSERT_ENTRIES_REQUEST = 52;
   */
  INSERT_ENTRIES_REQUEST = 52,

  /**
   * *
   * Response to insert requests
   *
   * @generated from enum value: INSERT_ENTRIES_RESPONSE = 53;
   */
  INSERT_ENTRIES_RESPONSE = 53,

  /**
   * *
   * Notification about an insert operation.
   *
   * @generated from enum value: INSERT_ENTRIES_NOTIFICATION = 54;
   */
  INSERT_ENTRIES_NOTIFICATION = 54,

  /**
   * *
   * Request an update from a remote storage
   *
   * @generated from enum value: UPDATE_ENTRIES_REQUEST = 56;
   */
  UPDATE_ENTRIES_REQUEST = 56,

  /**
   * *
   * Response to an update request
   *
   * @generated from enum value: UPDATE_ENTRIES_RESPONSE = 57;
   */
  UPDATE_ENTRIES_RESPONSE = 57,

  /**
   * *
   * Notification about the update
   *
   * @generated from enum value: UPDATE_ENTRIES_NOTIFICATION = 58;
   */
  UPDATE_ENTRIES_NOTIFICATION = 58,

  /**
   * *
   * Restore entries request
   *
   * @generated from enum value: RESTORE_ENTRIES_REQUEST = 60;
   */
  RESTORE_ENTRIES_REQUEST = 60,

  /**
   * *
   * Response to a restore request
   *
   * @generated from enum value: RESTORE_ENTRIES_RESPONSE = 61;
   */
  RESTORE_ENTRIES_RESPONSE = 61,

  /**
   * *
   * Notification about a restore
   *
   * @generated from enum value: RESTORE_ENTRIES_NOTIFICATION = 62;
   */
  RESTORE_ENTRIES_NOTIFICATION = 62,

  /**
   * *
   * Request to add subscription
   *
   * @generated from enum value: ADD_SUBSCRIPTION_REQUEST = 128;
   */
  ADD_SUBSCRIPTION_REQUEST = 128,

  /**
   * *
   * Response to the request
   *
   * @generated from enum value: ADD_SUBSCRIPTION_RESPONSE = 129;
   */
  ADD_SUBSCRIPTION_RESPONSE = 129,

  /**
   * *
   * Notification about an added subscription
   *
   * @generated from enum value: ADD_SUBSCRIPTION_NOTIFICATION = 130;
   */
  ADD_SUBSCRIPTION_NOTIFICATION = 130,

  /**
   * *
   * Request to remove subscription
   *
   * @generated from enum value: REMOVE_SUBSCRIPTION_REQUEST = 132;
   */
  REMOVE_SUBSCRIPTION_REQUEST = 132,

  /**
   * *
   * Response to the request
   *
   * @generated from enum value: REMOVE_SUBSCRIPTION_RESPONSE = 133;
   */
  REMOVE_SUBSCRIPTION_RESPONSE = 133,

  /**
   * *
   * Notification about a removed subscription
   *
   * @generated from enum value: REMOVE_SUBSCRIPTION_NOTIFICATION = 134;
   */
  REMOVE_SUBSCRIPTION_NOTIFICATION = 134,

  /**
   * *
   * Request to publish data
   *
   * @generated from enum value: PUBLISH_CUSTOM_DATA_REQUEST = 136;
   */
  PUBLISH_CUSTOM_DATA_REQUEST = 136,

  /**
   * *
   * Response to a publish data request
   *
   * @generated from enum value: PUBLISH_CUSTOM_DATA_RESPONSE = 137;
   */
  PUBLISH_CUSTOM_DATA_RESPONSE = 137,

  /**
   * *
   * Notification about an added subscription
   *
   * @generated from enum value: PUBLISH_CUSTOM_DATA_NOTIFICATION = 138;
   */
  PUBLISH_CUSTOM_DATA_NOTIFICATION = 138,

  /**
   * *
   * Request to provide all subscriptions a remote endpoint currently has
   *
   * @generated from enum value: GET_SUBSCRIPTIONS_REQUEST = 140;
   */
  GET_SUBSCRIPTIONS_REQUEST = 140,

  /**
   * *
   * Response to a publish data request
   *
   * @generated from enum value: GET_SUBSCRIPTIONS_RESPONSE = 141;
   */
  GET_SUBSCRIPTIONS_RESPONSE = 141,
}
// Retrieve enum metadata with: proto2.getEnumType(Message_MessageType)
proto2.util.setEnumType(Message_MessageType, "io.github.hamok.dev.schema.Message.MessageType", [
  { no: 1, name: "HELLO_NOTIFICATION" },
  { no: 2, name: "ENDPOINT_STATES_NOTIFICATION" },
  { no: 3, name: "ONGOING_REQUESTS_NOTIFICATION" },
  { no: 8, name: "STORAGE_SYNC_REQUEST" },
  { no: 9, name: "STORAGE_SYNC_RESPONSE" },
  { no: 12, name: "RAFT_VOTE_REQUEST" },
  { no: 13, name: "RAFT_VOTE_RESPONSE" },
  { no: 16, name: "RAFT_APPEND_ENTRIES_REQUEST_CHUNK" },
  { no: 17, name: "RAFT_APPEND_ENTRIES_RESPONSE" },
  { no: 20, name: "SUBMIT_MESSAGE_REQUEST" },
  { no: 21, name: "SUBMIT_MESSAGE_RESPONSE" },
  { no: 24, name: "CLEAR_ENTRIES_REQUEST" },
  { no: 25, name: "CLEAR_ENTRIES_RESPONSE" },
  { no: 26, name: "CLEAR_ENTRIES_NOTIFICATION" },
  { no: 28, name: "GET_ENTRIES_REQUEST" },
  { no: 29, name: "GET_ENTRIES_RESPONSE" },
  { no: 32, name: "GET_SIZE_REQUEST" },
  { no: 33, name: "GET_SIZE_RESPONSE" },
  { no: 36, name: "GET_KEYS_REQUEST" },
  { no: 37, name: "GET_KEYS_RESPONSE" },
  { no: 40, name: "DELETE_ENTRIES_REQUEST" },
  { no: 41, name: "DELETE_ENTRIES_RESPONSE" },
  { no: 42, name: "DELETE_ENTRIES_NOTIFICATION" },
  { no: 44, name: "REMOVE_ENTRIES_REQUEST" },
  { no: 45, name: "REMOVE_ENTRIES_RESPONSE" },
  { no: 46, name: "REMOVE_ENTRIES_NOTIFICATION" },
  { no: 48, name: "EVICT_ENTRIES_REQUEST" },
  { no: 49, name: "EVICT_ENTRIES_RESPONSE" },
  { no: 50, name: "EVICT_ENTRIES_NOTIFICATION" },
  { no: 52, name: "INSERT_ENTRIES_REQUEST" },
  { no: 53, name: "INSERT_ENTRIES_RESPONSE" },
  { no: 54, name: "INSERT_ENTRIES_NOTIFICATION" },
  { no: 56, name: "UPDATE_ENTRIES_REQUEST" },
  { no: 57, name: "UPDATE_ENTRIES_RESPONSE" },
  { no: 58, name: "UPDATE_ENTRIES_NOTIFICATION" },
  { no: 60, name: "RESTORE_ENTRIES_REQUEST" },
  { no: 61, name: "RESTORE_ENTRIES_RESPONSE" },
  { no: 62, name: "RESTORE_ENTRIES_NOTIFICATION" },
  { no: 128, name: "ADD_SUBSCRIPTION_REQUEST" },
  { no: 129, name: "ADD_SUBSCRIPTION_RESPONSE" },
  { no: 130, name: "ADD_SUBSCRIPTION_NOTIFICATION" },
  { no: 132, name: "REMOVE_SUBSCRIPTION_REQUEST" },
  { no: 133, name: "REMOVE_SUBSCRIPTION_RESPONSE" },
  { no: 134, name: "REMOVE_SUBSCRIPTION_NOTIFICATION" },
  { no: 136, name: "PUBLISH_CUSTOM_DATA_REQUEST" },
  { no: 137, name: "PUBLISH_CUSTOM_DATA_RESPONSE" },
  { no: 138, name: "PUBLISH_CUSTOM_DATA_NOTIFICATION" },
  { no: 140, name: "GET_SUBSCRIPTIONS_REQUEST" },
  { no: 141, name: "GET_SUBSCRIPTIONS_RESPONSE" },
]);

/**
 * @generated from enum io.github.hamok.dev.schema.Message.MessageProtocol
 */
export enum Message_MessageProtocol {
  /**
   * *
   * Messages should be interpreted by a grid client
   *
   * @generated from enum value: GRID_COMMUNICATION_PROTOCOL = 1;
   */
  GRID_COMMUNICATION_PROTOCOL = 1,

  /**
   * *
   * Messages should be interpreted by a Raft implementation
   *
   * @generated from enum value: RAFT_COMMUNICATION_PROTOCOL = 2;
   */
  RAFT_COMMUNICATION_PROTOCOL = 2,

  /**
   * *
   * Messages should be interpreted by a specific storage
   *
   * @generated from enum value: STORAGE_COMMUNICATION_PROTOCOL = 3;
   */
  STORAGE_COMMUNICATION_PROTOCOL = 3,

  /**
   * *
   * Messages should be interpreted by a publish / subscribe component
   *
   * @generated from enum value: PUBSUB_COMMUNICATION_PROTOCOL = 4;
   */
  PUBSUB_COMMUNICATION_PROTOCOL = 4,
}
// Retrieve enum metadata with: proto2.getEnumType(Message_MessageProtocol)
proto2.util.setEnumType(Message_MessageProtocol, "io.github.hamok.dev.schema.Message.MessageProtocol", [
  { no: 1, name: "GRID_COMMUNICATION_PROTOCOL" },
  { no: 2, name: "RAFT_COMMUNICATION_PROTOCOL" },
  { no: 3, name: "STORAGE_COMMUNICATION_PROTOCOL" },
  { no: 4, name: "PUBSUB_COMMUNICATION_PROTOCOL" },
]);

