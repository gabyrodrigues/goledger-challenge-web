"use client";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Stack, Text } from "@mantine/core";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";

export interface SongProps {
  id: string;
  title: string;
  artist: string;
}
export function Song({ id, title, artist }: SongProps) {
  return (
    <Flex className="justify-between items-center">
      <Link href={`/song/${id}`}>
        <Flex className="items-center">
          <Group>
            <Flex className="bg-gray text-white w-14 h-14 justify-center items-center">
              <IconPlayerPlayFilled size={24} />
            </Flex>
            <Stack className="gap-1">
              <Text className="text-xl font-bold text-white">{title}</Text>
              <Text className="text-base text-lightGray">{artist}</Text>
            </Stack>
          </Group>
        </Flex>
      </Link>

      <Menu
        shadow="md"
        width={200}>
        <Menu.Target>
          <ActionIcon className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50 ">
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
}
