import { useContext, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button, Flex, Loader, TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { joiResolver } from "@mantine/form";

import { ArtistFormData, CreateAnArtist, UpdateAnArtist } from "@/utils/data";
import { ArtistFormProvider, useArtistForm } from "@/contexts/ArtistFormContext";
import { ArtistContext } from "@/contexts/ArtistContext";
import createArtistSchema from "./createArtistSchema";
import { getDirtyValues } from "@/utils/transfomData";

export function ArtistForm() {
  const pathname = usePathname();
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { activeArtist, createArtist, updateArtist } = useContext(ArtistContext);

  const isCreateForm = pathname == "/artists/new";
  const form = useArtistForm({
    initialValues: { ...(activeArtist as ArtistFormData) },
    validate: joiResolver(createArtistSchema())
  });
  const formHasErrors = Object.keys(form.errors).length !== 0;

  function handleFormSubmit(values: ArtistFormData) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    if (isCreateForm) {
      handleFormCreate(values);
    } else {
      handleFormUpdate(values);
    }
  }

  async function handleFormCreate(values: ArtistFormData) {
    const createValues = {
      "@assetType": values["@assetType"],
      name: values.name,
      about: values.about
    };

    try {
      await createArtist(createValues as CreateAnArtist);

      notifications.show({
        autoClose: 3000,
        message: "Artist created successfully!",
        color: "green"
      });

      router.push("/artists");
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

  async function handleFormUpdate(values: ArtistFormData) {
    const updateValues = getDirtyValues<ArtistFormData>(values, form);
    try {
      await updateArtist(values["@key"], updateValues as UpdateAnArtist);

      notifications.show({
        autoClose: 3000,
        message: "Artist updated successfully!",
        color: "green"
      });

      router.push("/artists");
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
    <ArtistFormProvider form={form}>
      <form
        onSubmit={form.onSubmit(
          (values) => {
            handleFormSubmit(values);
          },
          (validationErrors, _values) => {
            handleFormErrors(validationErrors, _values);
          }
        )}>
        <Flex
          direction="column"
          gap="lg">
          <TextInput
            {...form.getInputProps("name")}
            label="Name"
            placeholder="Artist name"
            className="flex-grow"
          />
          <Textarea
            {...form.getInputProps("about")}
            label="About"
            placeholder="Make a description about the artist"
            className="basis-full"
          />

          <Button
            type="submit"
            ref={submitRef}
            disabled={formHasErrors}
            variant="filled"
            radius="md"
            size="lg"
            fw="bold"
            classNames={{
              root: "text-white bg-primary hover:bg-darkPrimary hover:text-white"
            }}>
            {submitRef.current?.disabled ? (
              <Loader
                size="sm"
                color="var(--mantine-color-gray-0)"
              />
            ) : (
              <span>Create</span>
            )}
          </Button>
        </Flex>
      </form>
    </ArtistFormProvider>
  );
}
