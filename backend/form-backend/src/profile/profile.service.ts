import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>) {}

  async saveProfile(userId: string, profileData: any): Promise<Profile> {
    try {
      const existingProfile = await this.profileModel.findOne({ userId });

      if (existingProfile) {
        return await this.profileModel.findOneAndUpdate(
          { userId },
          { ...profileData },
          { new: true }
        );
      }

      const profile = new this.profileModel({
        userId,
        ...profileData
      });

      return await profile.save();
    } catch (error) {
      throw error;
    }
  }

  async getProfile(userId: string): Promise<Profile> {
    const profile = await this.profileModel.findOne({ userId }).exec();
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async deleteProfile(userId: string): Promise<void> {
    const result = await this.profileModel.deleteOne({ userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Profile not found');
    }
  }

  async getAllProfiles(): Promise<Profile[]> {
    return await this.profileModel.find().exec();
  }
}