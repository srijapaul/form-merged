import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  middleName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ required: true })
  height: number;
  @Prop({ required: true })
  weight: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);





















// import { Schema, Document } from 'mongoose';

// export interface Profile extends Document {
//   username: string;
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   address: string;
//   country: string;
//   city: string;
//   pincode: string;
//   height: number;
//   weight: number;
// }

// export const ProfileSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   firstName: { type: String, required: true },
//   middleName: { type: String },
//   lastName: { type: String, required: true },
//   address: { type: String, required: true },
//   country: { type: String, required: true },
//   city: { type: String, required: true },
//   pincode: { type: String, required: true },
//   height: { type: Number, required: true },
//   weight: { type: Number, required: true },
// },
// {
//   timestamps: true,
// }
// );