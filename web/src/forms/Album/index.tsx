import { useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { joiResolver } from "@mantine/form";

import { AlbumFormData, CreateAnAlbum, UpdateAnAlbum } from "@/utils/data";
import { AlbumFormProvider, useAlbumForm } from "@/contexts/AlbumFormContext";
import { AlbumContext } from "@/contexts/AlbumContext";
import { getDirtyValues } from "@/utils/transfomData";
import createAlbumSchema from "./createAlbumSchema";
import { handleFormatCreateAlbum, handleTransformSubmittedValues } from "./formatters";
import { FormFields } from "./FormFields";

export function AlbumForm() {
  const pathname = usePathname();
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { activeAlbum, createAlbum, updateAlbum } = useContext(AlbumContext);

  const isCreateForm = pathname == "/albums/new";
  const form = useAlbumForm({
    initialValues: { ...(activeAlbum as AlbumFormData) },
    validate: joiResolver(createAlbumSchema()),
    transformValues: (values: AlbumFormData) => handleTransformSubmittedValues(values)
  });
  const formHasErrors = Object.keys(form.errors).length !== 0;

  function handleFormSubmit(values: AlbumFormData) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    if (isCreateForm) {
      handleFormCreate(values);
    } else {
      handleFormUpdate(values);
    }
  }

  async function handleFormCreate(values: AlbumFormData) {
    try {
      const createValues = handleFormatCreateAlbum(values);

      await createAlbum(createValues as CreateAnAlbum);

      notifications.show({
        autoClose: 3000,
        message: "Album created successfully!",
        color: "green"
      });

      router.push("/albums");
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

  async function handleFormUpdate(values: AlbumFormData) {
    const updateValues = getDirtyValues<AlbumFormData>(values, form);
    console.log("update", values);
    try {
      await updateAlbum(values["@key"], updateValues as UpdateAnAlbum);

      notifications.show({
        autoClose: 3000,
        message: "Album updated successfully!",
        color: "green"
      });

      router.push("/albums");
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
      message: "It was not possible to create! Please try again.",
      color: "red"
    });
  }

  return (
    <AlbumFormProvider form={form}>
      <FormFields
        form={form}
        handleFormSubmit={handleFormSubmit}
        handleFormErrors={handleFormErrors}
        formHasErrors={formHasErrors}
        submitRef={submitRef}
      />
    </AlbumFormProvider>
  );
}
