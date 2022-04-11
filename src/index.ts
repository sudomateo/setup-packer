import * as core from "@actions/core";
import {setupPacker} from "./setup-packer";

async function main() {
  try {
    await setupPacker();
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

main();
