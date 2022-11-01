const sdkName = "@mocobaas/server-sdk";
const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const baasBasePath = path.dirname(require.resolve(sdkName));
module.exports = {
  sdkPath: baasBasePath,
  modifyDockerPort
};

function modifyDockerPort(portNumber = 3000, env = "prod", basePath) {
  try {
    const originalFile = readFileSync(
      path.resolve(basePath, "Dockerfile." + env),
      "utf8"
    );
    const toBeModFile = originalFile.replace(
      /expose_port=\d+/g,
      "expose_port=" + portNumber
    );
    writeFileSync(path.resolve(basePath, "Dockerfile." + env), toBeModFile);
    return { ok: true };
  } catch (e) {
    return { error: e.message || e };
  }
}
