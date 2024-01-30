"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionIcon, Flex, Group, Menu, Stack, Text } from "@mantine/core";
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
          <Flex className="justify-between flex-1">
            <Stack className="gap-2">
              <Text className="text-3xl font-bold text-white">{song?.title}</Text>
              <Group className="gap-1 items-center">
                {song?.explicit && <IconExplicit size={20} />}
                <Text className="text-base text-lightGray">Song</Text>•
                <Text className="text-base text-lightGray">{song?.artists.join(", ")}</Text> •
                <Text className="text-base text-lightGray">{song?.album}</Text>
              </Group>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50">
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown className="bg-darkGray text-white">
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
                  className="text-red-400 hover:bg-neutral-700">
                  Delete Song
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
      case "album":
        return (
          <Flex className="justify-between flex-1">
            <Stack className="gap-2">
              <Text className="text-3xl font-bold text-white">{album?.title}</Text>
              <Group className="gap-1 items-center">
                <Text className="text-base text-lightGray">Album</Text>•
                <Text className="text-base text-lightGray">{album?.artist}</Text> •
                <Text className="text-base text-lightGray">
                  {album?.releaseDate &&
                    new Date(album?.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                </Text>
              </Group>
              {album?.rating && (
                <Text className="text-base text-lightGray">Rating: {album?.rating}</Text>
              )}
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50">
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown className="bg-darkGray text-white">
                <Menu.Item
                  component={Link}
                  href="/">
                  Update Album
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="text-red-400 hover:bg-neutral-700">
                  Delete Album
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
      case "playlist":
        return (
          <Flex className="justify-between flex-1">
            <Stack className="gap-2">
              <Text className="text-3xl font-bold text-white">{playlist?.name}</Text>
              <Text className="text-base text-lightGray">{playlist?.description}</Text>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50">
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown className="bg-darkGray text-white">
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
                  className="text-red-400 hover:bg-neutral-700">
                  Delete Playlist
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
      case "artist":
        return (
          <Flex className="justify-between flex-1">
            <Stack className="gap-2">
              <Text className="text-3xl font-bold text-white">{artist?.name}</Text>
              <Text className="text-base text-lightGray">{artist?.about}</Text>
            </Stack>
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50">
                  <IconDotsVertical size={24} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown className="bg-darkGray text-white">
                <Menu.Item
                  component={Link}
                  href="/">
                  Update Artist
                </Menu.Item>
                <Menu.Item
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="text-red-400 hover:bg-neutral-700">
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
      <Flex className="items-center justify-between">
        <Group className="flex-nowrap justify-start gap-8 w-full">
          <Flex className="bg-gray text-white w-40 h-40 justify-center items-center">
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
