"use client";
import { useContext } from "react";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";

import { AlbumContext, AlbumItem } from "@/contexts/AlbumContext";
import { DeleteModal } from "../DeleteModal";

interface AlbumProps extends Pick<AlbumItem, "id" | "title"> {}

export function Album({ id, title }: AlbumProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const { handleDeleteAlbum } = useContext(AlbumContext);

  return (
    <>
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
              <Text className="text-xl font-bold text-white line-clamp-2">{title}</Text>
            </Group>
          </Flex>
        </Link>
      </Flex>

      {opened && (
        <DeleteModal
          opened={opened}
          open={open}
          close={close}
          onDelete={() => handleDeleteAlbum(id)}
        />
      )}
    </>
  );
}
