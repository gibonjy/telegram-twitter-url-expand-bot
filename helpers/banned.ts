// List of malicious chats that were trying to crash the bot.
const banList: number[] = [
  1947938299, -1001226058268, -1002124315683, -1001149568794, -1001493829609, 6908519864, -1001859238543,
  -1001709570096, -1002092544541, -1001998434278,
];

export const isBanned = (chatId: number) => banList.includes(Number(chatId));
