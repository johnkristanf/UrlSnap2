
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ collection: 'qrcodes' })
export class QrCode extends Document {

  @Prop({ required: true })
  qrCodeLongURL: string;

  @Prop({ required: true })
  qrCodeShortURL: string;

  @Prop({ required: true })
  qrCode: string;

  @Prop({ required: true })
  qrCodeBgColor: string;

  @Prop({ required: true })
  qrCodeForegroundColor: string;

  @Prop({ required: true })
  resolution: string;
}

export const QrCodeSchema = SchemaFactory.createForClass(QrCode);


QrCodeSchema.index({
  qrCodeLongURL: 1,
  qrCodeShortURL: 1,
  qrCode: 1
})


