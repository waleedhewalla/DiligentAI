import "server-only";
import fs from "node:fs";
import path from "node:path";

/** True when a file exists under /public — lets pages hide download links until the asset is uploaded. */
export function publicAssetExists(publicPath: string | undefined) {
  if (!publicPath) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}
