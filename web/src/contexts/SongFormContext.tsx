import { SongFormData } from "@/utils/data";
import { createFormContext } from "@mantine/form";

export const [SongFormProvider, useSongFormContext, useSongForm] =
  createFormContext<SongFormData>();
