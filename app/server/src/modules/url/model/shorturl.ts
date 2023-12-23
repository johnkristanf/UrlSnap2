
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ collection: 'shorturls' })
export class ShortURL extends Document {

  @Prop({ required: true })
  longUrl: string;

  @Prop({ required: true })
  shortUrl: string;

  @Prop()
  clicks: number;

}

export const ShortURLSchema = SchemaFactory.createForClass(ShortURL);

ShortURLSchema.index({
  longUrl: 1,
  shortUrl: 1,
  clicks: 1,
})




