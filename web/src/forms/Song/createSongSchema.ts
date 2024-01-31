import { SongFormData } from "@/utils/data";
import Joi from "joi";

export default function createSongSchema(): Joi.ObjectSchema<SongFormData> {
  return Joi.object({
    "@key": Joi.string().trim().empty("").messages({
      "string.base": "Invalid value",
      "string.min": "Invalid value"
    }),
    "@assetType": Joi.string().valid("song"),
    title: Joi.string().min(1).required().trim().messages({
      "any.required": "Required field",
      "string.min": "Title must be at least one character long",
      "string.empty": "Required field"
    }),
    album: Joi.object({
      "@assetType": Joi.string().valid("album"),
      "@key": Joi.string().trim().messages({
        "any.required": "Required field",
        "string.base": "Invalid value",
        "string.empty": "Required field"
      })
    }),
    artists: Joi.array()
      .items(
        Joi.object({
          "@assetType": Joi.string().valid("artist"),
          "@key": Joi.string().trim().messages({
            "any.required": "Required field",
            "string.base": "Invalid value",
            "string.empty": "Required field"
          })
        })
      )
      .required()
      .min(1)
      .messages({
        "any.required": "Select at least one artist",
        "array.includes": "Select at least one artist",
        "array.min": "You need to add at least one artist"
      }),
    explicit: Joi.boolean().required().messages({
      "any.required": "Required field"
    })
  }).options({ abortEarly: false });
}
