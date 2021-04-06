import assert from "assert";
import FileJson, { IFileJson } from "../src";

describe('FileJson', function () {
    it("Should read file correctly", async function () {
        let json: IFileJson<{}>;
        assert.doesNotThrow(() => json = FileJson(__dirname, "./db.json"));
        assert.doesNotReject(async () => await json.r());

    });
    it("Should fail as the JSON file doesn't exist", async function () {
        assert.throws(FileJson.bind(null, __dirname, "./db.jsano"));
    });
});