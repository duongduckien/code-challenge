import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserRole } from '../../enums/user.enum';
import { buildQuery } from '../../utils/helper';
import { User } from './user.entity';

export const seedUsers = async (userRepository: Repository<User>) => {
  const defaultUsers = [
    {
      name: 'Administrator',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      password: '12345678',
    },
  ];

  for (const user of defaultUsers) {
    const isExisted = await userRepository.findOneBy(
      buildQuery({ email: user.email }),
    );
    if (isExisted) {
      continue;
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const data = userRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role
    });
    await userRepository.save(data);
  }
};
