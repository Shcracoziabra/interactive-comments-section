import { resolve } from "path";
import { readFile } from "fs/promises";

export const handler = async () => {
    const filePath = resolve("data.json");
    const data = await readFile(filePath, 'utf8');
  return {
    statusCode: 200,
    body: JSON.stringify(JSON.parse(data), null, 2),
  };
}