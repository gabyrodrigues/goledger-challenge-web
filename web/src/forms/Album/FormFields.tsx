import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Flex, Loader, NumberInput, Select, TextInput } from "@mantine/core";
import { FormErrors, UseFormReturnType } from "@mantine/form";
import { DatePickerInput, DateValue } from "@mantine/dates";

import { AlbumFormData } from "@/utils/data";
import { ArtistContext } from "@/contexts/ArtistContext";
import dayjs from "dayjs";

interface FormFieldsProps {
  form: UseFormReturnType<AlbumFormData>;
  formHasErrors: boolean;
  submitRef: React.RefObject<HTMLButtonElement>;
  handleFormSubmit: (values: AlbumFormData) => void;
  handleFormErrors: (errors: FormErrors, values: AlbumFormData) => void;
}

interface ArtistSelect {
  id: string;
  name: string;
  value: string;
  label: string;
}

export function FormFields({
  form,
  formHasErrors,
  submitRef,
  handleFormSubmit,
  handleFormErrors
}: FormFieldsProps) {
  const [artistsToSelect, setArtistsToSelect] = useState<ArtistSelect[]>([
    {
      id: "",
      name: "",
      value: "",
      label: ""
    }
  ]);
  const [selectedArtistId, setSelectedArtistId] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const { artists } = useContext(ArtistContext);

  const handleFilterArtists = useCallback(async () => {
    const artistsToSelectFormatted = artists.map(({ id, name }) => ({
      id,
      name,
      value: id,
      label: name
    }));

    setArtistsToSelect(artistsToSelectFormatted);
  }, [artists]);

  const handleInitialValues = useCallback(async () => {
    const selectedArtistId = form.values.artist ? form.values.artist["@key"] : "";
    const releaseDate = form.values.releaseDate
      ? dayjs(form.values.releaseDate).format()
      : dayjs().format();
    const releaseDateFormatted = dayjs(releaseDate).toDate();

    setSelectedArtistId(selectedArtistId);
    setReleaseDate(releaseDateFormatted);
  }, [form.values.artist, form.values.releaseDate]);

  async function handleChangeArtist(artistId: string | null) {
    setSelectedArtistId(artistId ?? "");
    form.setFieldValue("artist.@key", artistId);
  }

  function handleChangeReleaseDate(value: DateValue) {
    setReleaseDate(value);
    form.setFieldValue("releaseDate", dayjs(value).format());
  }

  useEffect(() => {
    handleFilterArtists();
    handleInitialValues();
  }, [handleFilterArtists, handleInitialValues]);

  return (
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
          {...form.getInputProps("title")}
          label="Title"
          placeholder="Album title"
          className="flex-grow"
        />
        <Select
          label="Artist"
          placeholder="Search or Select an artist"
          data={artistsToSelect}
          limit={6}
          searchable
          nothingFoundMessage="Artist not found..."
          value={selectedArtistId}
          onChange={handleChangeArtist}
        />
        <DatePickerInput
          {...form.getInputProps("releaseDate")}
          label="Release Date"
          placeholder="Select a date"
          value={releaseDate}
          onChange={handleChangeReleaseDate}
        />
        <NumberInput
          {...form.getInputProps("rating")}
          label="Rating"
          placeholder="Enter value between 1 and 10"
          min={1}
          max={10}
        />

        <Button
          type="submit"
          ref={submitRef}
          disabled={formHasErrors}
          variant="filled"
          radius="md"
          size="lg"
          fw="bold">
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
  );
}
