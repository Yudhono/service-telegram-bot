import SDK from "@mocobaas/server-sdk";
import checkingCase from "@mocobaas/shared/checking-case";

async function handler(ctx: SDK.Context): Promise<SDK.ReturnCtx> {
  const res = await checkingCase(ctx);
  console.log("checkingCase", res);

  return {
    data: "Sending to checking case",
    error: null,
  };
}

module.exports = handler;
