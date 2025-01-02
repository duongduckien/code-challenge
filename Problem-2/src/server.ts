import app from './app';
import { AppDataSource } from './config/db';
import { runSeeds } from './config/seed';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    await runSeeds();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
