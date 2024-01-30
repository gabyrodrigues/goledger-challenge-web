import { ArtistFormData } from "@/utils/data";
import { createFormContext } from "@mantine/form";

export const [ArtistFormProvider, useArtistFormContext, useArtistForm] =
  createFormContext<ArtistFormData>();
