
export const bufferQrCodeToBase64 = (qrCode: string): Buffer => {
    return Buffer.from(qrCode.split(',')[1], 'base64')
}