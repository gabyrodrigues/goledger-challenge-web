import { useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { joiResolver } from "@mantine/form";

import { PlaylistFormData, CreateAPlaylist, UpdateAPlaylist } from "@/utils/data";
import { PlaylistFormProvider, usePlaylistForm } from "@/contexts/PlaylistFormContext";
import { getDirtyValues } from "@/utils/transfomData";
import { PlaylistContext } from "@/contexts/PlaylistContext";
import createPlaylistSchema from "./createPlaylistSchema";
import { handleFormatCreatePlaylist } from "./formatters";
import { FormFields } from "./FormFields";

export function PlaylistForm() {
  const pathname = usePathname();
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { activePlaylist, createPlaylist, updatePlaylist } = useContext(PlaylistContext);

  const isCreateForm = pathname == "/playlists/new";
  const form = usePlaylistForm({
    initialValues: { ...(activePlaylist as PlaylistFormData) },
    validate: joiResolver(createPlaylistSchema())
  });
  const formHasErrors = Object.keys(form.errors).length !== 0;

  function handleFormSubmit(values: PlaylistFormData) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    if (isCreateForm) {
      handleFormCreate(values);
    } else {
      handleFormUpdate(values);
    }
  }

  async function handleFormCreate(values: PlaylistFormData) {
    try {
      const createValues = handleFormatCreatePlaylist(values);

      await createPlaylist(createValues as CreateAPlaylist);

      notifications.show({
        autoClose: 3000,
        message: "Playlist created successfully!",
        color: "green"
      });

      router.push("/playlists");
    } catch (error) {
      console.error(error);
      notifications.show({
        autoClose: 3000,
        message: "It was not possible to create! Please try again.",
        color: "red"
      });
    }

    if (submitRef.current) {
      submitRef.current.disabled = false;
    }
  }

  async function handleFormUpdate(values: PlaylistFormData) {
    const updateValues = getDirtyValues<PlaylistFormData>(values, form);
    try {
      await updatePlaylist(values["@key"], updateValues as UpdateAPlaylist);

      notifications.show({
        autoClose: 3000,
        message: "Playlist updated successfully!",
        color: "green"
      });

      router.push("/playlists");
    } catch (error) {
      console.error(error);
      notifications.show({
        autoClose: 3000,
        message: "It was not possible to update! Please try again.",
        color: "red"
      });
    }

    if (submitRef.current) {
      submitRef.current.disabled = false;
    }
  }

  function handleFormErrors(errors: typeof form.errors, values: typeof form.values) {
    console.log({ errors, values });

    notifications.show({
      autoClose: 3000,
      message: "An error has ocurred! Please, check your data and try again.",
      color: "red"
    });
    if (submitRef.current) {
      submitRef.current.disabled = false;
    }
  }

  return (
    <PlaylistFormProvider form={form}>
      <FormFields
        form={form}
        handleFormSubmit={handleFormSubmit}
        handleFormErrors={handleFormErrors}
        formHasErrors={formHasErrors}
        submitRef={submitRef}
      />
    </PlaylistFormProvider>
  );
}
