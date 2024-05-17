import { config } from "dotenv";
import app from "./app";
config();

(() => {
  const { DATABASE_URL, PORT, JWT_SECRET } = process.env;

  if (!DATABASE_URL || !PORT || !JWT_SECRET) {
    return console.log("Define ENVs");
  }

  app.listen(PORT, () =>
    console.log(`\nRetizen-server running on port: ${PORT} 👌`)
  );
})();
