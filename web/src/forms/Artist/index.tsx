import { useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Flex, Loader, TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { joiResolver } from "@mantine/form";

import { ArtistFormData, CreateAnArtist } from "@/utils/data";
import { ArtistFormProvider, useArtistForm } from "@/contexts/ArtistFormContext";
import { ArtistContext } from "@/contexts/ArtistContext";
import createArtistSchema from "./createArtistSchema";
import { handleTransformSubmittedValues } from "./formatters";

export function ArtistForm() {
  const router = useRouter();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { activeArtist, createArtist } = useContext(ArtistContext);

  const form = useArtistForm({
    initialValues: { ...(activeArtist as ArtistFormData) },
    validate: joiResolver(createArtistSchema()),
    transformValues: (values: ArtistFormData) => handleTransformSubmittedValues(values)
  });

  async function handleFormSubmit(values: ArtistFormData) {
    if (submitRef.current) {
      submitRef.current.disabled = true;
    }

    const createValues = {
      "@assetType": values["@assetType"],
      name: values.name,
      about: values.about
    };

    try {
      console.log("submit", values, createValues);
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

  function handleFormErrors(errors: typeof form.errors, values: typeof form.values) {
    console.log({ errors, values });

    notifications.show({
      autoClose: 3000,
      message: "It was not possible to create! Please try again.",
      color: "red"
    });
  }

  const formHasErrors = Object.keys(form.errors).length !== 0;

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
            label="Artist name"
            className="flex-grow"
          />
          <Textarea
            {...form.getInputProps("about")}
            label="About"
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
