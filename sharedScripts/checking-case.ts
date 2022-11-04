import SDK from "@mocobaas/server-sdk";
import TelegramBot from "node-telegram-bot-api";
const token = process.env.TOKEN;
// @ts-ignore
const bot = new TelegramBot(token, { polling: true });

const checkingCase = async (ctx: SDK.Context): Promise<any> => {
  let messageRetrieved = null;
  
  bot.onText(/\/ask (.+)/, async (msg: any, match: any) => {
    messageRetrieved = msg;
    // console.log(match)
    // console.log(msg.from.username)
   
   const checkUser = await ctx.moco.tables.findOne({
    table:"users",
    filter: ctx.moco
    .composeFilter()
    .eq("telegram_username",msg.from.username)
    .toString()
   });

   if(!checkUser){
    bot.sendMessage(msg.chat.id,"Username anda masih belum terdaftar. Mohon hubungi administrator!\nTerimakasih")
   }else{
    const findTicket = await ctx.moco.tables.findAll({
      table:"ticket",
      orderBy:[
        {
        order:"desc",
        column:"nomor_ticket"
        }
      ],
     limit:1,
    
    });
    if(!msg.chat.title){
      bot.sendMessage(msg.chat.id, 
        "Hai, Bot tidak menanggapi via personal, silahkan chat via group. Terimakasih"
        );
    }else{
      let noTicket = findTicket.count+1;
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

      const insertMessage = await ctx.moco.tables.create(
        {
          table:"message",
          data:{
            ticket_id:createTicket.id,
            telegram_message:msg
          },
          
        });
        
      const resp = 
      `Pertanyaan anda telah dibuatkan ticket dengan nomor ticket: ${noTicket}`;
  
      bot.sendMessage(msg.chat.id, resp,{reply_to_message_id:msg.message_id});
    }
   }
  });

  bot.on('message',async (msg:any)=>{
    //  console.log(msg); 
    const checkMsg = msg.reply_to_message.message_id;
    console.log(checkMsg)
    console.log(msg.message_id)
    if(!msg.text.startsWith('/')&&!checkMsg){
      bot.sendMessage(msg.chat.id,
        "Mohon ditunggu, case tersebut sedang dalam pengecekan\nAkan kami informasikan jika sudah ada updatenya",{
          reply_to_message_id:msg.message_id
        })
        const checkTicket = await ctx.moco.tables.raw({
         query:
         `SELECT * FROM message WHERE (telegram_message::json ->> 'message_id')::numeric= 
         ${msg.reply_to_message.message_id}`
        })
        console.log(checkTicket)
        const insertMessage = await ctx.moco.tables.create({
          table:"message",
          data:{
            ticket_id:checkTicket[0].ticket_id,
            telegram_message:msg
          }
        })
    }
  })

  return {
    data: messageRetrieved,
    error: null,
  };
};


export default checkingCase;