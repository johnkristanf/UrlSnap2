import { Types } from "mongoose"

export type ShortUrlDataTypes = {
    _id?: string | Types.ObjectId
    longUrl: String,
    shortUrl?: String,
    clicks: Number
 
}


