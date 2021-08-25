import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { join } from 'path';

export class JsonDatabase {
  private static database = new JsonDB(new Config(join(__dirname, 'data', '.database'), true, false, '/'));

  public static get(path: string) {
    try {
      const result = JsonDatabase.database.getData(path);
      return Object.keys(result).length > 0 ? result : undefined;
    } catch (error) {
      return undefined;
    }
  }

  public static set(path: string, data: any, override: boolean = true) {
    try {
      JsonDatabase.database.push(path, data, override);
      return true;
    } catch (error) {
      return false;
    }
  }
}