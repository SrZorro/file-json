import assert from "assert";
import FileJson from "../src";
import fs from "fs/promises";
import fsync from "fs";

type Idb = { name: string, email: string }[];

async function clean(json: FileJson<unknown>) {
    await fs.rm(json.jsonPath);
}

describe('FileJson', function () {
    it("Should read file correctly", async function () {
        const json = new FileJson<Idb>([__dirname, "./db.json"]);
        assert.doesNotThrow(() => json);
        assert.doesNotReject(async () => await json.r());

    });
    it("Should create the file if it doesn't exist", async function () {
        const json = new FileJson<Idb>([__dirname, ".db.json"]);

        await json.r();
        await json.w();

        assert(fsync.existsSync(json.jsonPath));
        await clean(json);
    });
    it("Should set the default correctly", async function () {
        const def = [{
            name: "steve",
            email: "example@example.com"
        }];
        const json = new FileJson<Idb>([__dirname, ".db.set-default.json"], def);

        await json.r();
        assert.deepStrictEqual(json.d, def);
        await json.w();
        await json.r();
        assert.deepStrictEqual(json.d, def);

        await clean(json);
    })
});