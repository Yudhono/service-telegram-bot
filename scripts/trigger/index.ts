
// You can also import another NPM package 
import SDK from "@mocobaas/server-sdk";

async function handler(ctx: SDK.EventContext) {
  console.log("trigger")
}

module.exports = handler;
