import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 유저 회원가입
  async create(input: CreateUserInput): Promise<User> {
    const { name, password, email, age } = input;
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }
    const result = await this.userRepository.save({
      email,
      password,
      name,
      age,
    });

    return result;
  }

  //유저 조회
  async findOne(email): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
}
