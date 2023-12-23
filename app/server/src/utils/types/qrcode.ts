import { Types } from "mongoose"

export type fetchAllQrCodeTypes = {
    _id?: string | Types.ObjectId
    qrCodeLongURL: string,
    qrCodeShortURL: string,
    qrCode: string
    qrCodeBgColor: string
    qrCodeForegroundColor: string
    resolution: string
};


export interface QrCodeWithTypes {
    _id?: string | Types.ObjectId
    qrCodeLongURL: string
    qrCodeForegroundColor: string,
    qrCodeBgColor: string,
    resolution: string

}



export enum QrCodeFormat {
    PNG = 'png',
    JPEG = 'jpeg',
    WEBP = 'webp',
}

export enum QrCodeContentType {
    PNG = 'image/png',
    JPEG = 'image/jpeg',
    WEBP = 'image/webp',

}

export enum QrCodeResolution {
    High = 'H',
    Medium = 'M',
    Low = 'L',

}

