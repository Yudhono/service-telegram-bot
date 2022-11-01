// You can also import another NPM package
import SDK from "@mocobaas/server-sdk";
import checkingCase from "@mocobaas/shared/checking-case";

async function handler(mocoCtx: SDK.MocoContext) {
  const res = await checkingCase(mocoCtx);
  console.log("checkingCase", res);
}

module.exports = handler;
