import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/db';
import { buildQuery } from '../../utils/helper';
import { User } from './user.entity';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.userRepository.save(
      this.userRepository.create({
        ...data,
        password: hashedPassword,
      }),
    );
  }

  async findOne(query: any): Promise<User | null> {
    return this.userRepository.findOneBy(buildQuery(query));
  }

  async find(query: any): Promise<User[] | null> {
    return this.userRepository.findBy(buildQuery(query));
  }

  async paginate({
    query,
    page,
    limit,
  }: {
    query: any;
    page: number;
    limit: number;
  }): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.userRepository.findAndCount({
      where: buildQuery(query),
      select: ['id', 'email', 'name', 'role', 'createdAt', 'updatedAt'],
      skip,
      take: limit,
    });
    return { data, total, page, limit };
  }

  async update({
    id,
    data,
  }: {
    id: number;
    data: { name: string };
  }): Promise<User | null> {
    const user = await this.userRepository.findOneBy(buildQuery({ id }));
    if (!user) {
      return null;
    }
    return this.userRepository.save({
      ...user,
      name: data.name,
    });
  }

  async delete({ id }: { id: number }): Promise<User | null> {
    const user = await this.userRepository.findOneBy(buildQuery({ id }));
    if (!user) {
      return null;
    }
    return this.userRepository.save({
      ...user,
      isDeleted: 1,
    });
  }
}
