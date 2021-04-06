# file-json

`npm i file-json`

For when you want to store stuff in a json file, but also want to read and write it easily.

## Usage

```typescript
import FileJson from "file-json";

interface IJson {
    name: string;
    version: string;
    isEnabled: boolean;
}

const json = FileJson<IJson>("config.json");

(async () => {
    // Read
    await json.r();

    console.log(json);
    // {
    //   d: { name: "foo", version: "1.1", isEnabled: false },
    //   r: [AsyncFunction: read],
    //   w: [AsyncFunction: write]
    // }

    // Data container
    console.log(json.d);
    // Edit data
    json.d.isEnabled = true;

    // Write
    await json.w();
})();

```