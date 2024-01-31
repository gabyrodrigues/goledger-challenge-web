import { AlbumFormData } from "@/utils/data";
import Joi from "joi";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export default function createAlbumSchema(): Joi.ObjectSchema<AlbumFormData> {
  return Joi.object({
    "@key": Joi.string().trim().empty("").messages({
      "string.base": "Invalid value",
      "string.min": "Invalid value"
    }),
    "@assetType": Joi.string().valid("album"),
    title: Joi.string().min(1).required().trim().messages({
      "string.min": "Title must be at least one character long",
      "string.empty": "Required field"
    }),
    artist: Joi.object({
      "@assetType": Joi.string().valid("artist"),
      "@key": Joi.string().trim().messages({
        "any.required": "Required field",
        "string.base": "Invalid value",
        "string.empty": "Required field"
      })
    }),
    releaseDate: Joi.date().less(yesterday).required().messages({
      "any.required": "Required field",
      "date.base": "Invalid date",
      "date.less": "Invalid date",
      "date.empty": "Required field"
    }),
    rating: Joi.number().min(1).max(10).required().messages({
      "number.base": "Required field",
      "any.required": "Required field",
      "number.min": "Rating needs to be 1-10",
      "number.max": "Rating needs to be 1-10"
    })
  }).options({ abortEarly: false });
}
