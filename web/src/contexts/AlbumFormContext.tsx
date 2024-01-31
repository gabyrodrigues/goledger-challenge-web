import { AlbumFormData } from "@/utils/data";
import { createFormContext } from "@mantine/form";

export const [AlbumFormProvider, useAlbumFormContext, useAlbumForm] =
  createFormContext<AlbumFormData>();
