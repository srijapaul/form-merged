import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { Profile } from './profile/schemas/profile.schema';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Load environment variables globally
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
