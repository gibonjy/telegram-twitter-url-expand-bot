// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "chats",
    columns: [
      { name: "chat_id", type: "string", unique: true },
      {
        name: "autoexpand",
        type: "bool",
        notNull: true,
        defaultValue: "false",
      },
      {
        name: "release_notes_notification",
        type: "bool",
        notNull: true,
        defaultValue: "false",
      },
      { name: "chat_size", type: "int" },
    ],
  },
  {
    name: "events",
    columns: [
      { name: "timestamp", type: "datetime" },
      { name: "note", type: "string" },
      { name: "name", type: "string", notNull: true, defaultValue: "" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Chats = InferredTypes["chats"];
export type ChatsRecord = Chats & XataRecord;

export type Events = InferredTypes["events"];
export type EventsRecord = Events & XataRecord;

export type DatabaseSchema = {
  chats: ChatsRecord;
  events: EventsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://pugson-3k9p63.us-east-1.xata.sh/db/linkbot",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
