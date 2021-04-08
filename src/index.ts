import fs from "fs/promises";
import path from "path";

export default class FileJson<ISchema> {
    private data: ISchema | null = null;
    public jsonPath: string;
    private readonly def: ISchema;
    constructor(jsonPth: string | string[], def = {} as ISchema) {
        if (typeof jsonPth === "string")
            jsonPth = [jsonPth];

        this.jsonPath = path.join(...jsonPth);
        this.def = def;
    }

    private async read(): Promise<ISchema> {
        try {
            const raw = await fs.readFile(this.jsonPath, "utf8")
            this.data = JSON.parse(raw);
        } catch (err) {
            if (err.code !== "ENOENT")
                throw err;
        }
        return this.d;
    }

    private async write() {
        await fs.writeFile(this.jsonPath, JSON.stringify(this.data, null, 2));
    }

    public async r(): Promise<ISchema> {
        const json = await this.read();
        return json;
    }

    public async w(): Promise<boolean> {
        await this.write();
        return true;
    }

    public get d() {
        if (this.data === null)
            return this.def;
        else
            return this.data;
    }
}