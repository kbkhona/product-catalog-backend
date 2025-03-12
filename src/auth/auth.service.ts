import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}


    async loginUser({ username, password }: AuthPayloadDto) {
        const user = await this.usersRepository.findOne({
            where: { username }
        })

        if(!user) throw new UnauthorizedException('Invalid username or password');
        
        const isCorrectPassword = await this.comparePasswords(password, user.password)
        if(!isCorrectPassword) throw new UnauthorizedException('Invalid username or password');

        const payload = { username: user.username };
        const token = await this.jwtService.signAsync(payload);

        return { access_token: token };
    }

    async hashPassword(password: string) {
        const salt = 10;
        return await bcrypt.hash(password, salt);
    }

    async comparePasswords(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async createUserAccount({username, password}: AuthPayloadDto) {
        const hashedPassword = await this.hashPassword(password)
        const creatUserPayload = {username: username, password: hashedPassword}
        const user = this.usersRepository.create(creatUserPayload)
        try{
            return await this.usersRepository.save(user)
        }
        catch(err) {
            if (err instanceof QueryFailedError && err.message.includes('duplicate key value violates unique constraint')) {
                throw new UnprocessableEntityException('Duplicate entry detected');
            }
            throw err;
        }
    }

}
