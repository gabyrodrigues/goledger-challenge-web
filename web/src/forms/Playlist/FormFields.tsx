import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Flex, Loader, MultiSelect, TextInput, Textarea } from "@mantine/core";
import { FormErrors, UseFormReturnType } from "@mantine/form";

import { IdRef, PlaylistFormData } from "@/utils/data";
import { SongContext } from "@/contexts/SongContext";

interface FormFieldsProps {
  form: UseFormReturnType<PlaylistFormData>;
  formHasErrors: boolean;
  submitRef: React.RefObject<HTMLButtonElement>;
  handleFormSubmit: (values: PlaylistFormData) => void;
  handleFormErrors: (errors: FormErrors, values: PlaylistFormData) => void;
}

interface SongSelect {
  id: string;
  title: string;
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
  const [songsToSelect, setSongsToSelect] = useState<SongSelect[]>([
    {
      id: "",
      title: "",
      value: "",
      label: ""
    }
  ]);

  const [selectedSongsId, setSelectedSongsId] = useState<string[]>([]);
  const { songs } = useContext(SongContext);

  const handleFilterSongs = useCallback(async () => {
    const songsToSelectFormatted = songs.map(({ id, title }) => ({
      id,
      title,
      value: id,
      label: title
    }));

    setSongsToSelect(songsToSelectFormatted);
  }, [songs]);

  const handleInitialValues = useCallback(async () => {
    const selectedSongsId = form.values.songs.length
      ? form.values.songs.map((song) => song["@key"])
      : [];

    setSelectedSongsId(selectedSongsId);
  }, [form.values.songs]);

  async function handleChangeSongs(songsId: string[] | undefined) {
    const songs: IdRef[] = [];

    if (songsId?.length) {
      setSelectedSongsId(songsId);
      songsId.map((id) => {
        const song: IdRef = {
          "@assetType": "song",
          "@key": id
        };
        songs.push(song);
      });
    }
    form.setFieldValue("songs", songs);
  }

  useEffect(() => {
    handleFilterSongs();
    handleInitialValues();
  }, [handleFilterSongs, handleInitialValues]);

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
          {...form.getInputProps("name")}
          label="Name"
          placeholder="Playlist name"
          className="flex-grow"
        />
        <Textarea
          {...form.getInputProps("description")}
          label="About"
          placeholder="Make a description about the playlist"
          className="basis-full"
        />
        <MultiSelect
          {...form.getInputProps("songs")}
          label="Artists"
          placeholder="Search or Select one or more songs"
          data={songsToSelect}
          limit={6}
          searchable
          nothingFoundMessage="Song not found..."
          value={selectedSongsId}
          onChange={handleChangeSongs}
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
  );
}
