import { User } from '../modules/user/user.entity';
import { seedUsers } from '../modules/user/user.seed';
import { AppDataSource } from './db';

export const runSeeds = async () => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    await seedUsers(userRepository);
  } catch (e) {
    console.log(e);
  }
};
