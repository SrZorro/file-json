# file-json

`npm i @srzorro/file-json`

For when you want to store stuff in a json file, but also want to read and write it easily.

## Usage

```typescript
import FileJson from "@srzorro/file-json";

interface IJson {
    name: string;
    version: string;
    isEnabled: boolean;
}

const json = new FileJson<IJson>("config.json");

(async () => {
    // Read
    await json.r();

    // Data container
    console.log(json.d);

    // Edit data
    json.d.isEnabled = true;

    // Write
    await json.w();
})();

```