"use client";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
import { IconDotsVertical, IconUserFilled } from "@tabler/icons-react";

export interface ArtistProps {
  id: string;
  name: string;
}
export function Artist({ id, name }: ArtistProps) {
  return (
    <Flex className="justify-between items-center w-min p-1 rounded hover:bg-darkGray">
      <Link href={`/artist/${id}`}>
        <Flex className="items-center">
          <Group>
            <Flex className="bg-gray text-white w-40 h-40 rounded-full justify-center items-center relative">
              <IconUserFilled size={64} />

              <Menu width={200}>
                <Menu.Target>
                  <ActionIcon className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50 absolute right-2 top-1/2">
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
            <Text className="text-xl font-bold text-white line-clamp-1">{name}</Text>
          </Group>
        </Flex>
      </Link>
    </Flex>
  );
}
