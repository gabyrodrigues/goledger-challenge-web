import { useCallback, useContext, useEffect, useState } from "react";
import { Button, Checkbox, Flex, Loader, MultiSelect, Select, TextInput } from "@mantine/core";
import { FormErrors, UseFormReturnType } from "@mantine/form";

import { IdRef, SongFormData } from "@/utils/data";
import { ArtistContext } from "@/contexts/ArtistContext";
import { AlbumContext } from "@/contexts/AlbumContext";

interface FormFieldsProps {
  form: UseFormReturnType<SongFormData>;
  formHasErrors: boolean;
  submitRef: React.RefObject<HTMLButtonElement>;
  handleFormSubmit: (values: SongFormData) => void;
  handleFormErrors: (errors: FormErrors, values: SongFormData) => void;
}

interface ArtistSelect {
  id: string;
  name: string;
  value: string;
  label: string;
}

interface AlbumSelect {
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
  const [artistsToSelect, setArtistsToSelect] = useState<ArtistSelect[]>([
    {
      id: "",
      name: "",
      value: "",
      label: ""
    }
  ]);
  const [albumsToSelect, setAlbumsToSelect] = useState<AlbumSelect[]>([
    {
      id: "",
      title: "",
      value: "",
      label: ""
    }
  ]);
  const [selectedArtistsId, setSelectedArtistsId] = useState<string[]>([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("");
  const { artists } = useContext(ArtistContext);
  const { albums } = useContext(AlbumContext);

  const handleFilterArtists = useCallback(async () => {
    const artistsToSelectFormatted = artists.map(({ id, name }) => ({
      id,
      name,
      value: id,
      label: name
    }));

    setArtistsToSelect(artistsToSelectFormatted);
  }, [artists]);

  const handleFilterAlbums = useCallback(async () => {
    const albumsToSelectFormatted = albums.map(({ id, title }) => ({
      id,
      title,
      value: id,
      label: title
    }));

    setAlbumsToSelect(albumsToSelectFormatted);
  }, [albums]);

  const handleInitialValues = useCallback(async () => {
    const selectedAlbumId = form.values.album ? form.values.album["@key"] : "";
    const selectedArtistsId = form.values.artists.length
      ? form.values.artists.map((artist) => artist["@key"])
      : [];

    setSelectedAlbumId(selectedAlbumId);
    setSelectedArtistsId(selectedArtistsId);
  }, [form.values.album, form.values.artists]);

  async function handleChangeArtists(artistsId: string[] | undefined) {
    const artists: IdRef[] = [];

    if (artistsId?.length) {
      setSelectedArtistsId(artistsId);
      artistsId.map((id) => {
        const artist: IdRef = {
          "@assetType": "artist",
          "@key": id
        };
        artists.push(artist);
      });
    }
    form.setFieldValue("artists", artists);
  }

  async function handleChangeAlbum(albumId: string | null) {
    setSelectedAlbumId(albumId ?? "");
    form.setFieldValue("album.@key", albumId);
  }

  useEffect(() => {
    handleFilterArtists();
    handleFilterAlbums();
    handleInitialValues();
  }, [handleFilterArtists, handleFilterAlbums, handleInitialValues]);

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
          placeholder="Song title"
          className="flex-grow"
        />
        <MultiSelect
          {...form.getInputProps("artists")}
          label="Artists"
          placeholder="Search or Select one or more artists"
          data={artistsToSelect}
          limit={6}
          searchable
          nothingFoundMessage="Artist not found..."
          value={selectedArtistsId}
          onChange={handleChangeArtists}
        />
        <Select
          {...form.getInputProps("album")}
          label="Album"
          placeholder="Search or Select an album"
          data={albumsToSelect}
          limit={6}
          searchable
          nothingFoundMessage="Album not found..."
          value={selectedAlbumId}
          onChange={handleChangeAlbum}
        />
        <Checkbox
          {...form.getInputProps("explicit")}
          label="Explicit?"
          color="pink"
          fw="bold"
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
