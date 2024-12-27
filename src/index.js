import { app } from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

dotenv.config({ path: "src/.env" });
const PORT = process.env.PORT || 8001;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error: ", err);
  });
