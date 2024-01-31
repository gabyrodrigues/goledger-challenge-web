import { PlaylistFormData } from "@/utils/data";
import { createFormContext } from "@mantine/form";

export const [PlaylistFormProvider, usePlaylistFormContext, usePlaylistForm] =
  createFormContext<PlaylistFormData>();
