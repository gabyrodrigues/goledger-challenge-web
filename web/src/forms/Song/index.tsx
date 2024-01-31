import { useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { joiResolver } from "@mantine/form";

import { SongFormData, CreateASong, UpdateASong } from "@/utils/data";
import { SongFormProvider, useSongForm } from "@/contexts/SongFormContext";
import { getDirtyValues } from "@/utils/transfomData";
import { SongContext } from "@/contexts/SongContext";
import createSongSchema from "./createSongSchema";
import { handleFormatCreateSong, handleTransformSubmittedValues } from "./formatters";
import { FormFields } from "./FormFields";

export function SongForm() {
  const pathname = usePathname();
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { activeSong, createSong, updateSong } = useContext(SongContext);

  const isCreateForm = pathname == "/songs/new";
  const form = useSongForm({
    initialValues: { ...(activeSong as SongFormData) },
    validate: joiResolver(createSongSchema()),
    transformValues: (values: SongFormData) => handleTransformSubmittedValues(values)
  });
  const formHasErrors = Object.keys(form.errors).length !== 0;

  function handleFormSubmit(values: SongFormData) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    if (isCreateForm) {
      handleFormCreate(values);
    } else {
      handleFormUpdate(values);
    }
  }

  async function handleFormCreate(values: SongFormData) {
    try {
      const createValues = handleFormatCreateSong(values);

      await createSong(createValues as CreateASong);

      notifications.show({
        autoClose: 3000,
        message: "Song created successfully!",
        color: "green"
      });

      router.push("/songs");
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

  async function handleFormUpdate(values: SongFormData) {
    const updateValues = getDirtyValues<SongFormData>(values, form);
    console.log("update", values);
    try {
      await updateSong(values["@key"], updateValues as UpdateASong);

      notifications.show({
        autoClose: 3000,
        message: "Song updated successfully!",
        color: "green"
      });

      router.push("/songs");
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
  }

  return (
    <SongFormProvider form={form}>
      <FormFields
        form={form}
        handleFormSubmit={handleFormSubmit}
        handleFormErrors={handleFormErrors}
        formHasErrors={formHasErrors}
        submitRef={submitRef}
      />
    </SongFormProvider>
  );
}
