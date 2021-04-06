import fs from "fs/promises";
import fssync from "fs";
import path from "path";

/**
 * ISchema: Representation of the json
 */
export interface IFileJson<ISchema> {
    /**
     * Data container
     */
    d: ISchema;
    /**
     * Read json from file
     */
    r: () => Promise<boolean>;
    /**
     * Write json to file
     */
    w: () => Promise<boolean>;
}

export default function FileJson<ISchema>(...filePaths: string[]): IFileJson<ISchema> {
    const resolvedPath = path.resolve(...filePaths);
    {
        // Guards
        const exists = fssync.existsSync(resolvedPath);
        if (!exists)
            throw new Error(`File '${resolvedPath}' does not exist`)

        const parsed = path.parse(resolvedPath);
        if (parsed.ext !== ".json")
            throw new Error(`Path at '${resolvedPath}' doesn't have a .json extension`);
    }

    const container = {
        d: {} as ISchema,
        r: async function read () {
            const file = await fs.readFile(resolvedPath, "utf8");
            container.d = JSON.parse(file);
            return true;
        },
        w: async function write () {
            await fs.writeFile(resolvedPath, JSON.stringify(container.d, null, 2));
            return true;
        }
    };

    return container;
}