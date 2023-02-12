import fetch from "isomorphic-unfetch";
import { Chats, getXataClient } from "./xata";

// @ts-ignore
globalThis.fetch = fetch;

const xata = getXataClient();

/**
 * Get chat settings from the database.
 * @param chatId Telegram Chat ID
 * @returns Chat settings record
 */
export const getSettings = async (chatId: number) => {
  try {
    const record = await xata.db.chats
      .filter({
        chat_id: chatId.toString(),
      })
      .getFirst({
        // cache: 1 * 60 * 1000, // TTL: 1 minute
      });

    return record;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Create a new chat settings record in the database.
 * @param chatId Telegram Chat ID
 * @param status Autoexpand value boolean
 * @returns Chat settings record
 */
export const createSettings = async (chatId: number, status: boolean) => {
  try {
    const record = await xata.db.chats.create({
      chat_id: chatId.toString(),
      autoexpand: status,
      release_notes_notification: false,
    });

    return record;
  } catch (error) {
    console.error(error);
  }
};

export const updateSettings = async (id: number, property: keyof Chats, value: Chats[keyof Chats]) => {
  try {
    const record = await xata.db.chats
      .filter({ chat_id: id.toString() })
      .getFirst()
      .then((record) => {
        if (record) {
          record.update({
            [`${property}`]: value,
          });
        }
      });

    return record;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Create a new anonymous event record in the database.
 * @param name String to identify the event
 * @param timestamp Current date and time
 * @param note Optional note to add to the event
 * @returns Event record
 */
export const createEvent = async (name: string, timestamp: string, note?: string) => {
  try {
    const record = await xata.db.events.create({
      name,
      timestamp,
      note,
    });

    return record;
  } catch (error) {
    console.error(error);
  }
};
