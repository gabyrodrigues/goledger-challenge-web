import { PlaylistFormData } from "@/utils/data";
import Joi from "joi";

export default function createPlaylistSchema(): Joi.ObjectSchema<PlaylistFormData> {
  return Joi.object({
    "@key": Joi.string().trim().empty("").messages({
      "string.base": "Invalid value",
      "string.min": "Invalid value"
    }),
    "@assetType": Joi.string().valid("playlist"),
    name: Joi.string().min(1).required().trim().messages({
      "any.required": "Required field",
      "string.min": "Name must be at least one character long",
      "string.empty": "Required field"
    }),
    description: Joi.string().trim().empty("").messages({
      "string.base": "Invalid value"
    }),
    songs: Joi.array().items(
      Joi.object({
        "@assetType": Joi.string().valid("song"),
        "@key": Joi.string().trim().messages({
          "any.required": "Required field",
          "string.base": "Invalid value",
          "string.empty": "Required field"
        })
      })
    )
  }).options({ abortEarly: false });
}
