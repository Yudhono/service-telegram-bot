import SDK from "@mocobaas/server-sdk";
import TelegramBot from "node-telegram-bot-api";
const token = process.env.TOKEN;
// @ts-ignore
const bot = new TelegramBot(token, { polling: true });

const checkingCase = async (ctx: SDK.Context): Promise<any> => {
  let messageRetrieved = null;
  
  bot.onText(/\/ask (.+)/, async (msg: any, match: any) => {
    messageRetrieved = msg;
    console.log(JSON.stringify(msg))

        
    const checkTicket = await ctx.moco.tables.findAll({
      table:"ticket",
      orderBy:[
        {
        order:"desc",
        column:"nomor_ticket"
        }
      ],
     limit:1
    
    });
    if(!msg.chat.title){
      bot.sendMessage(msg.chat.id, 
        "Hai, Bot tidak menanggapi via personal, silahkan chat via group. Terimakasih"
        );
    }else{
      let noTicket = checkTicket.count+1;
      const createTicket = await ctx.moco.tables.create({
        table:"ticket",
        data:{
          nomor_ticket:noTicket,
          telegram_chat_id:msg.chat.id,
          telegram_group_name:msg.chat.title,
          telegram_user_id:msg.from.username,
          status:true
        },
        
      });

      // const insertMessage = await ctx.moco.tables.create(
      //   {
      //     table:"message",
      //     data:{
      //       ticket_id:createTicket.id,
      //       telegram_message:JSON.stringify(msg)
      //     },
          
      //   });
        
      const resp = `Pertanyaan anda telah dibuatkan ticket dengan nomor ticket: ${noTicket}`;
  
      bot.sendMessage(msg.chat.id, resp,{reply_to_message_id:msg.message_id});
    }
    
  });

  return {
    data: messageRetrieved,
    error: null,
  };
};


export default checkingCase;