import { config } from 'dotenv';
import app from './app';
config();

(() => {
  const { DATABASE_URL, PORT, JWT_SECRET, ADMIN_EMAIL } = process.env;

  if (!DATABASE_URL || !PORT || !JWT_SECRET || !ADMIN_EMAIL) {
    return console.log('Define ENVs');
  }

  app.listen(PORT, () => console.log(`\nRetizen-server running on port: ${PORT} 👌`));
})();
