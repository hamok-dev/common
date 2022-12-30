Hamok Messages Library for Javascript
---

This library is written for the hamok [schema](https://github.com/hamok-dev/schema).
It provides API for hamok-ts-core based on a unified communication schema.

## Exported Components

The library exports the following components.

### Logger

```javascript
import { createLogger, setLogLevel } from "@hamok-dev/hamok-ts-messages";

// create a logger with a name
const logger = createLogger("myComponent");

// globally set the minimum loglevel written out to the console
setLogLevel('warn');
```

### Messages

```javascript
import { Message, MessageType } from "@hamok-dev/hamok-ts-messages";
const message = new Message({
    type: MessageType.HELLO_NOTIFICATION,
    sourceId: "sourceId",
})
```

### Codec, FacadedCodec

```javascript
import { Codec, FacadedCodec } from "@hamok-dev/hamok-ts-messages";

const strToNumCodec: Codec<string, number> = {
    encode: (input: string) => Number.parseInt(input),
    decode: (input: number) => `${input}`,
};
const strToBoolCodec: Codec<string, boolean> = FacadedCodec
    .wrap<string, number>(strToNumCodec)
    .then<boolean>({
        encode: (input: number) => 0 !== input,
        decode: (input: boolean) => input ? 1 : 0,
    })
strToBoolCodec.encode("5"); // true
strToBoolCodec.decode(true) // "1"
```

### GridCodec

Encode and decode messages for Grid operations.

```javascript
import { GridCodec, HelloNotification, Message } from "@hamok-dev/hamok-ts-messages";
const codec = new GridCodec();
const outbNotification: HelloNotification = {
    sourceEndpointId: "sourceEndpointId",
};
const message = codec.encodeHelloNotification(outbNotification);
const inbNotification = codec.decodeHelloNotification(message)
```

### StorageCodec

Encode and decode messages for Distributed Storage operations.

```javascript
import { 
    StorageCodec, 
    UpdateEntriesRequest,
    UpdateEntriesResponse,
    Message
} from "@hamok-dev/hamok-ts-messages";
const codec = new StorageCodec();

const requestMessage = codec.encodeUpdateEntriesRequest(new UpdateEntriesRequest<number, string>(
    new Map<number, string>([[1, "oneV2"]])
));
const request = codec.decodeUpdateEntriesRequest(requestMessage);

const responseMessage = codec.encodeUpdateResponse(request.createResponse(
    new Map<number, string>([[1, "oneV1"]])
));

const response = codec.decodeUpdateResponse(responseMessage);
```