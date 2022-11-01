import SDK from "@mocobaas/server-sdk";
import TelegramBot from "node-telegram-bot-api";
const token = process.env.TOKEN;
// @ts-ignore
const bot = new TelegramBot(token, { polling: true });

const checkingCase = async (ctx: SDK.Context): Promise<any> => {
  let messageRetrieved = null;
  bot.onText(/\/ask (.+)/, async (msg: any, match: any) => {
    messageRetrieved = msg;
    //create a ticket (insert to table ticket and table message)
    const resp = "Pertanyaan anda telah dibuatkan tiket dengan nomor tiket: 1";

    const result = await ctx.moco.tables.create({
      table: "message",
      data: {
        ticket_id: "fa8276ab-aba7-475c-a64d-6458df936087",
        telegram_message: messageRetrieved,
      },
    });
    console.log("result", result);

    bot.sendMessage(msg.chat.id, resp);

    //send first respon(insert to table message)
    bot.sendMessage(
      msg.chat.id,
      "Kami check terlebih dahulu ya. Mohon ditunggu",
      { reply_to_message_id: msg.message_id }
    );
  });

  return {
    data: messageRetrieved,
    error: null,
  };
};

export default checkingCase;
