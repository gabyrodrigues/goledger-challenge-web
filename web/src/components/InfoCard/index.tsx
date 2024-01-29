"use client";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconDotsVertical,
  IconExplicit,
  IconPlayerPlayFilled,
  IconUserFilled
} from "@tabler/icons-react";

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
    title: string;
    artist: string;
    releaseDate: string;
    rating?: number;
  };
  artist?: {
    name: string;
    about: string;
  };
  playlist?: {
    name: string;
    description: string;
  };
}

export function InfoCard({ type, song, artist, album, playlist }: InfoCardProps) {
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
                  component={Link}
                  href="/"
                  className="text-red-400">
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
                  component={Link}
                  href="/"
                  className="text-red-400">
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
                  component={Link}
                  href="/"
                  className="text-red-400">
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
                  component={Link}
                  href="/"
                  className="text-red-400">
                  Delete Artist
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        );
    }
  }

  return (
    <Flex className="items-center justify-between">
      <Group className="flex-nowrap justify-start gap-8 w-full">
        <Flex className="bg-gray text-white w-40 h-40 justify-center items-center">
          {renderCardIcon()}
        </Flex>
        {renderCardInfo()}
      </Group>
    </Flex>
  );
}
