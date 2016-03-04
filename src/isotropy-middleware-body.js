/* @flow */
import isotropyBody from "isotropy-body";
import type { ProcessedIncomingMessage, ServerResponse } from "isotropy-interfaces/node/http";

export default async function(req: ProcessedIncomingMessage, res: ServerResponse, options?: Object) : Promise {
  try {
    req.body = await isotropyBody(req, options);
  } catch (e) {
    req.body = {};
  }
}
