import { Injectable, UnauthorizedException } from "@nestjs/common"
import { CreateAuthDto } from "./dto/create-auth.dto"
import { UpdateAuthDto } from "./dto/update-auth.dto"
import { UserService } from "src/user/user.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOne(username)
    if (user?.password !== password) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.userId, username: user.username }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return "This action adds a new auth"
  }

  findAll() {
    return `This action returns all auth`
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`
  }

  remove(id: number) {
    return `This action removes a #${id} auth`
  }
}
