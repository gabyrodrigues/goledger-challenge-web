"use client";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";

export interface PlaylistProps {
  id: string;
  title: string;
}
export function Playlist({ id, title }: PlaylistProps) {
  return (
    <Flex className="justify-between items-center w-min p-1 rounded hover:bg-darkGray">
      <Link href={`/playlists/${id}`}>
        <Flex className="items-center">
          <Group>
            <Flex className="bg-gray text-white w-40 h-40 justify-center items-center relative">
              <IconPlayerPlayFilled size={64} />

              <Menu width={200}>
                <Menu.Target>
                  <ActionIcon
                    className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50 absolute right-2 top-2"
                    onClick={(e) => e.preventDefault()}>
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
            <Text className="text-xl font-bold text-white line-clamp-1">{title}</Text>
          </Group>
        </Flex>
      </Link>
    </Flex>
  );
}
