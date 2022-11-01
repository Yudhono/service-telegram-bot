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
        const resp = "Pertanyaan anda telah dibuatkan tiket dengan nomor tiket: 1";
        const result = yield ctx.moco.tables.create({
            table: "message",
            data: {
                ticket_id: "fa8276ab-aba7-475c-a64d-6458df936087",
                telegram_message: messageRetrieved,
            },
        });
        console.log("result", result);
        bot.sendMessage(msg.chat.id, resp);
        bot.sendMessage(msg.chat.id, "Kami check terlebih dahulu ya. Mohon ditunggu", { reply_to_message_id: msg.message_id });
    }));
    return {
        data: messageRetrieved,
        error: null,
    };
});
exports.default = checkingCase;
