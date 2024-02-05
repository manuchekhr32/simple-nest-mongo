import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/global/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const created = await this.userModel.create(createUserDto);
      return created;
    } catch (err: unknown) {
      const error = err as any;
      throw new BadRequestException(error.errors);
    }
  }

  async findAll(pagination: PaginationQueryDto) {
    const [total, data] = await Promise.all([
      this.userModel.countDocuments(),
      this.userModel
        .where()
        .select('name username createdAt')
        .limit(parseInt(pagination?.limit || '10'))
        .skip(parseInt(pagination?.offset || '0'))
        .sort({
          name: 'asc',
        }),
    ]);
    return { total, data };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    try {
      const updated = await user.updateOne(updateUserDto);
      return updated;
    } catch (err: unknown) {
      const error = err as any;
      throw new BadRequestException(error.errors);
    }
  }

  async remove(id: string) {
    try {
      await this.userModel.findByIdAndDelete(id);
      return { ok: true };
    } catch (err: unknown) {
      const error = err as any;
      throw new BadRequestException(error.errors);
    }
  }
}
