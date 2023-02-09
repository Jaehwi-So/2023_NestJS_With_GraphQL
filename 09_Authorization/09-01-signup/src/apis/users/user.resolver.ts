import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  //
  PASSWORD_SECRET = 10;
  constructor(
    private readonly userService: UserService, //
  ) {}
  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
    @Args('age') age: number,
  ) {
    //createUser
    const hashedPassword = await bcrypt.hash(password, this.PASSWORD_SECRET);
    return this.userService.create({ email, hashedPassword, name, age });
  }
}
