import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({
    min: 12,
    max: 100,
    required: false,
  })
  age?: number;

  @Prop()
  skills?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
