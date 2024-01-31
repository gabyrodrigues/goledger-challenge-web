"use client";
import { useContext } from "react";
import Link from "next/link";
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
    rating?: number;
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
        break;
      case "album":
        await handleDeleteAlbum(album!.id);
        break;
      case "playlist":
        await handleDeletePlaylist(playlist!.id);
        break;
      case "artist":
        await handleDeleteArtist(playlist!.id);
        break;
    }

    router.push("/");
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
            classNames={{ root: "flex-1" }}>
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
                <Text classNames={{ root: "text-lightGray" }}>Song</Text>•
                <Text classNames={{ root: "text-lightGray" }}>{song?.artists.join(", ")}</Text> •
                <Text classNames={{ root: "text-lightGray" }}>{song?.album}</Text>
              </Group>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  radius="xl"
                  p={3}
                  classNames={{ root: "bg-transparent hover:bg-lightGray hover:bg-opacity-50" }}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                classNames={{
                  dropdown: "bg-darkGray text-white"
                }}>
                <Menu.Item
                  component={Link}
                  href="/">
                  Update Song
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  classNames={{
                    item: "text-red-400 hover:bg-neutral-700"
                  }}>
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
            classNames={{ root: "flex-1" }}>
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
                <Text classNames={{ root: "text-lightGray" }}>Album</Text>•
                <Text classNames={{ root: "text-lightGray" }}>{album?.artist}</Text> •
                <Text classNames={{ root: "text-lightGray" }}>
                  {album?.releaseDate &&
                    new Date(album?.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                </Text>
              </Group>
              {album?.rating && (
                <Text classNames={{ root: "text-lightGray" }}>Rating: {album?.rating}</Text>
              )}
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  radius="xl"
                  p={3}
                  classNames={{
                    root: "bg-transparent rounded-full hover:bg-lightGray hover:bg-opacity-50"
                  }}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                classNames={{
                  dropdown: "bg-darkGray text-white"
                }}>
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
                  classNames={{
                    item: "text-red-400 hover:bg-neutral-700"
                  }}>
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
            classNames={{ root: "flex-1" }}>
            <Stack gap={8}>
              <Title
                order={1}
                fw="bold"
                c="var(--mantine-color-gray-0)">
                {playlist?.name}
              </Title>
              <Text classNames={{ root: "text-lightGray" }}>{playlist?.description}</Text>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  radius="xl"
                  p={3}
                  classNames={{
                    root: "bg-transparent rounded-full hover:bg-lightGray hover:bg-opacity-50"
                  }}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                classNames={{
                  dropdown: "bg-darkGray text-white"
                }}>
                <Menu.Item
                  component={Link}
                  href="/">
                  Update Playlist
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  classNames={{
                    item: "text-red-400 hover:bg-neutral-700"
                  }}>
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
            classNames={{ root: "flex-1" }}>
            <Stack gap={8}>
              <Title
                order={1}
                fw="bold"
                c="var(--mantine-color-gray-0)">
                {artist?.name}
              </Title>
              <Text classNames={{ root: "text-lightGray" }}>{artist?.about}</Text>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon
                  radius="xl"
                  p={3}
                  classNames={{
                    root: "bg-transparent rounded-full hover:bg-lightGray hover:bg-opacity-50"
                  }}>
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown
                classNames={{
                  dropdown: "bg-darkGray text-white"
                }}>
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
                  classNames={{
                    item: "text-red-400 hover:bg-neutral-700"
                  }}>
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
          w="100%">
          <Flex
            w={160}
            h={160}
            justify="center"
            align="center"
            classNames={{ root: "bg-gray text-white" }}>
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
