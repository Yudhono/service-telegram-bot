"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const token = process.env.TOKEN;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
const checkingCase = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let messageRetrieved = null;
    bot.onText(/\/ask (.+)/, (msg, match) => __awaiter(void 0, void 0, void 0, function* () {
        messageRetrieved = msg;
        console.log(JSON.stringify(msg));
        const checkTicket = yield ctx.moco.tables.findAll({
            table: "ticket",
            orderBy: [
                {
                    order: "desc",
                    column: "nomor_ticket"
                }
            ],
            limit: 1
        });
        if (!msg.chat.title) {
            bot.sendMessage(msg.chat.id, "Hai, Bot tidak menanggapi via personal, silahkan chat via group. Terimakasih");
        }
        else {
            let noTicket = checkTicket.count + 1;
            const createTicket = yield ctx.moco.tables.create({
                table: "ticket",
                data: {
                    nomor_ticket: noTicket,
                    telegram_chat_id: msg.chat.id,
                    telegram_group_name: msg.chat.title,
                    telegram_user_id: msg.from.username,
                    status: true
                },
            });
            const resp = `Pertanyaan anda telah dibuatkan ticket dengan nomor ticket: ${noTicket}`;
            bot.sendMessage(msg.chat.id, resp, { reply_to_message_id: msg.message_id });
        }
    }));
    return {
        data: messageRetrieved,
        error: null,
    };
});
exports.default = checkingCase;
