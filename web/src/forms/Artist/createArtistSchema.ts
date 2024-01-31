import { ArtistFormData } from "@/utils/data";
import Joi from "joi";

export default function createArtistSchema(): Joi.ObjectSchema<ArtistFormData> {
  return Joi.object({
    "@key": Joi.string().trim().empty("").messages({
      "string.base": "Invalid value",
      "string.min": "Invalid value"
    }),
    "@assetType": Joi.string().valid("artist"),
    name: Joi.string().min(2).trim().messages({
      "string.min": "Name must be at least two characters long",
      "string.empty": "Required field"
    }),
    about: Joi.string().trim().empty("").messages({
      "string.base": "Invalid value",
      "string.min": "Invalid value"
    })
  }).options({ abortEarly: false });
}
