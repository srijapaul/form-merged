import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ username }).exec();
      if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user.toObject();
        return result;
      }
      return null;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: any) {
    try {
      const payload = { username: user.username, sub: user._id };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: user._id, username: user.username }
      };
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  async register(username: string, password: string): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({ 
        username, 
        password: hashedPassword 
      });
      const savedUser = await newUser.save();
      const { password: _, ...result } = savedUser.toObject();
      return result;
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        throw new UnauthorizedException('Username already exists');
      }
      throw new UnauthorizedException('Registration failed');
    }
  }

  async findUserByUsername(username: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ username }).exec();
    } catch (error) {
      throw new UnauthorizedException('User lookup failed');
    }
  }
}
