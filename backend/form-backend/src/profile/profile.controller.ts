import { Controller, Post, Body, UseGuards, Req, UnauthorizedException, ConflictException, Get, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveProfile(@Body() profileData, @Req() req) {
    try {
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('User not authenticated properly');
      }

      const userId = req.user.userId;
      return await this.profileService.saveProfile(userId, profileData);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Profile already exists for this user');
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req) {
    try {
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('User not authenticated properly');
      }

      const userId = req.user.userId;
      return await this.profileService.getProfile(userId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteProfile(@Req() req) {
    try {
      if (!req.user || !req.user.userId) {
        throw new UnauthorizedException('User not authenticated properly');
      }

      const userId = req.user.userId;
      return await this.profileService.deleteProfile(userId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllProfiles() {
    try {
      return await this.profileService.getAllProfiles();
    } catch (error) {
      throw error;
    }
  }
}