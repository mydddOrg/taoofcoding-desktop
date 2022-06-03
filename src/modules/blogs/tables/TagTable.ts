import { ITable } from "components/repository/ITable";
import { Table } from "components/repository/Table";

export class TagTable implements ITable {
  private static _instance = new TagTable();
  private constructor() {}
  public static getInstance() {
    return this._instance;
  }

  createTable(): Table {
    const table = new Table("tag_");
    table.addPrimaryColumn("name");
    return table;
  }

  updateTable(from: number, to: number): string[] {
    return [];
  }
}
