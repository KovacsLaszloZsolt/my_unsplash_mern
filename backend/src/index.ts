//TODO: build your application here
import { app } from './app';
import { connectDB } from './config/db';
const PORT = process.env.PORT as string;

const main = async (): Promise<void> => {
  //TODO: start your application here
  void connectDB();
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

main().catch(console.error);
