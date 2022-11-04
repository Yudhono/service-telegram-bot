
// You can also import another NPM package 
import SDK from "@mocobaas/server-sdk";
import sendRespons from "@mocobaas/shared/send-respons";

async function handler(ctx: SDK.Context): Promise<SDK.ReturnCtx>  {
  const res = await sendRespons(ctx);
  console.log("send respons", res);
  return {
    data: "send-respons",
    error: null
  }
}

module.exports = handler;
