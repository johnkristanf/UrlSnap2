import { randomBytes } from "crypto";

export const generateShortUrl = (): string => {
    return randomBytes(2).toString('base64url');
}