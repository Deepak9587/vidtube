import { ApiResponse } from "../utils/ApiResponse.js";
import { asynHandler } from "../utils/asyncHandler.js";

const healthcheck = asynHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "0k", "health check passed"));
});
export default healthcheck;
