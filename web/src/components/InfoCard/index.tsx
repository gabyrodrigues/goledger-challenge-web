"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ActionIcon, Flex, Group, Menu, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDotsVertical,
  IconExplicit,
  IconPlayerPlayFilled,
  IconUserFilled
} from "@tabler/icons-react";

import { DeleteModal } from "../DeleteModal";
import { SongContext } from "@/contexts/SongContext";
import { AlbumContext } from "@/contexts/AlbumContext";
import { ArtistContext } from "@/contexts/ArtistContext";
import { PlaylistContext } from "@/contexts/PlaylistContext";

interface InfoCardProps {
  type: "song" | "album" | "artist" | "playlist";
  song?: {
    id: string;
    title: string;
    explicit: boolean;
    artists: string[];
    album: string;
  };
  album?: {
    id: string;
    title: string;
    artist: string;
    releaseDate: string;
    rating: number | null;
  };
  artist?: {
    id: string;
    name: string;
    about: string;
  };
  playlist?: {
    id: string;
    name: string;
    description: string;
  };
}

export function InfoCard({ type, song, artist, album, playlist }: InfoCardProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const router = useRouter();

  const { handleDeleteSong } = useContext(SongContext);
  const { handleDeleteAlbum } = useContext(AlbumContext);
  const { handleDeleteArtist } = useContext(ArtistContext);
  const { handleDeletePlaylist } = useContext(PlaylistContext);

  async function handleDeleteItem() {
    switch (type) {
      case "song":
        await handleDeleteSong(song!.id);
        router.push("/songs");
        break;
      case "album":
        await handleDeleteAlbum(album!.id);
        router.push("/albums");
        break;
      case "playlist":
        await handleDeletePlaylist(playlist!.id);
        router.push("/playlists");
        break;
      case "artist":
        await handleDeleteArtist(playlist!.id);
        router.push("/artists");
        break;
    }
  }

  function renderCardIcon() {
    switch (type) {
      case "song":
      case "album":
      case "playlist":
        return <IconPlayerPlayFilled size={64} />;
      case "artist":
        return <IconUserFilled size={64} />;
    }
  }

  function renderCardInfo() {
    switch (type) {
      case "song":
        return (
          <Flex
            justify="space-between"
            flex={1}>
            <Stack gap={8}>
              <Title
                order={1}
                fw="bold"
                c="var(--mantine-color-gray-0)">
                {song?.title}
              </Title>
              <Group
                gap={4}
                align="center">
                {song?.explicit && <IconExplicit size={20} />}
                <Text c="gray.0">Song</Text>•<Text c="gray.0">{song?.artists.join(", ")}</Text> •
                <Text c="gray.0">{song?.album}</Text>
              </Group>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  p={3}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                bg="dark.8"
                color="gray.0">
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace(`/songs/update/${song!.id}`);
                  }}>
                  Update Song
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  c="red.6">
                  Delete Song
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
      case "album":
        return (
          <Flex
            justify="space-between"
            flex={1}>
            <Stack gap={8}>
              <Title
                order={1}
                fw="bold"
                c="var(--mantine-color-gray-0)">
                {album?.title}
              </Title>
              <Group
                gap={4}
                align="center">
                <Text c="gray.0">Album</Text>•<Text c="gray.0">{album?.artist}</Text> •
                <Text c="gray.0">
                  {album?.releaseDate &&
                    new Date(album?.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                </Text>
              </Group>
              {album?.rating && <Text c="gray.0">Rating: {album?.rating}</Text>}
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  p={3}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                bg="dark.8"
                color="gray.0">
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace(`/albums/update/${album!.id}`);
                  }}>
                  Update Album
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  c="red.6">
                  Delete Album
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
      case "playlist":
        return (
          <Flex
            justify="space-between"
            flex={1}>
            <Stack gap={8}>
              <Title
                order={1}
                fw="bold"
                c="var(--mantine-color-gray-0)">
                {playlist?.name}
              </Title>
              <Text c="gray.0">{playlist?.description}</Text>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  p={3}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                bg="dark.8"
                color="gray.0">
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace(`/playlists/update/${playlist!.id}`);
                  }}>
                  Update Playlist
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  c="red.6">
                  Delete Playlist
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
      case "artist":
        return (
          <Flex
            justify="space-between"
            flex={1}>
            <Stack gap={8}>
              <Title
                order={1}
                fw="bold"
                c="var(--mantine-color-gray-0)">
                {artist?.name}
              </Title>
              <Text c="gray.0">{artist?.about}</Text>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="subtle"
                  radius="xl"
                  p={3}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                bg="dark.8"
                color="gray.0">
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace(`/artists/update/${artist!.id}`);
                  }}>
                  Update Artist
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  c="red.6">
                  Delete Artist
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
    }
  }

  return (
    <>
      <Flex
        align="center"
        justify="space-between">
        <Group
          wrap="nowrap"
          justify="flex-start"
          gap={32}
          flex={1}>
          <Flex
            w={160}
            h={160}
            bg="dark.6"
            c="gray.0"
            justify="center"
            align="center">
            {renderCardIcon()}
          </Flex>
          {renderCardInfo()}
        </Group>
      </Flex>

      {opened && (
        <DeleteModal
          opened={opened}
          open={open}
          close={close}
          onDelete={handleDeleteItem}
        />
      )}
    </>
  );
}
