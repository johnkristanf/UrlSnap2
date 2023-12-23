
export type qrCodeFormTypes = {
    _id?: string,
    qrCodeURL: string,
    qrcode_bgcolor: string,
    qrcode_foregroundcolor: string,
    resolution: string
}

export type generatedQrCodeTypes = {
    qrCodeLongURL: string,
    qrCodeShortURL: string,
    qrCode: Buffer
} 