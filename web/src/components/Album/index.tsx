"use client";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";
import { AlbumItem } from "@/contexts/AlbumContext";

interface AlbumProps extends Pick<AlbumItem, "id" | "title"> {}

export function Album({ id, title }: AlbumProps) {
  return (
    <Flex className="justify-between items-center w-min p-1 rounded hover:bg-darkGray">
      <Link href={`/albums/${id}`}>
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
            <Text className="text-xl font-bold text-white line-clamp-2">{title}</Text>
          </Group>
        </Flex>
      </Link>
    </Flex>
  );
}
