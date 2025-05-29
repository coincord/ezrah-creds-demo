import "reflect-metadata";
import { DataSource } from "typeorm";
import { DeviceDid } from "./entities/DeviceDid";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [DeviceDid],
  migrations: [],
  subscribers: [],
});
