import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { CustomError } from '../../middlewares/error.middleware';
import { generateToken } from '../../utils/helper';
import { User } from './user.entity';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async login(req: Request, res: Response) {
    const user = await this.userService.findOne({ email: req.body.email });
    if (!user) {
      throw new CustomError('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new CustomError('Invalid email or password');
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return res.status(200).json({ token });
  }

  async create(req: Request, res: Response) {
    const response = await this.userService.create(req.body);
    return res.json(response);
  }

  async list(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;
    const response = await this.userService.paginate({
      query: {},
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });
    return res.json({
      data: response.data,
      meta: {
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: Math.ceil(response.total / response.limit),
      },
    });
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new CustomError('Data does not exist');
    }
    return res.json(plainToInstance(User, user));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new CustomError('Data does not exist');
    }
    const updatedUser = await this.userService.update({
      id: parseInt(id, 10),
      data: {
        name: req.body.name,
      },
    });
    return res.json(plainToInstance(User, updatedUser));
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new CustomError('Data does not exist');
    }
    await this.userService.delete({ id: parseInt(id, 10) });
    return res.json({ message: 'Deleted user successfully' });
  }
}
