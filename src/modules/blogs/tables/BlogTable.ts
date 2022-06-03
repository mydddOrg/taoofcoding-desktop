import { ITable } from "components/repository/ITable";
import { ColumnType, Table } from "components/repository/Table";

export class BlogTable implements ITable {
  private static _instance = new BlogTable();
  private constructor() {}
  public static getInstance() {
    return this._instance;
  }

  createTable(): Table {
    const table = new Table("blog_");
    table.addPrimaryColumn("slug");
    table.addColumn("date");
    table.addColumn("title");
    table.addColumn("brief");
    table.addColumn("tagData");
    table.addColumn("created", ColumnType.Integer);
    return table;
  }

  updateTable(from: number, to: number): string[] {
    return [];
  }
}
