"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";

import { AlbumContext, AlbumItem } from "@/contexts/AlbumContext";
import { DeleteModal } from "../DeleteModal";

interface AlbumProps extends Pick<AlbumItem, "id" | "title"> {}

export function Album({ id, title }: AlbumProps) {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);
  const { handleDeleteAlbum } = useContext(AlbumContext);

  return (
    <>
      <Flex
        p={1}
        align="center"
        justify="space-between"
        classNames={{
          root: "w-min p-1 hover:bg-darkGray"
        }}>
        <Link href={`/albums/${id}`}>
          <Flex align="center">
            <Group>
              <Flex
                align="center"
                justify="center"
                w={160}
                h={160}
                pos="relative"
                classNames={{
                  root: "bg-gray text-white"
                }}>
                <IconPlayerPlayFilled size={64} />

                <Menu width={200}>
                  <Menu.Target>
                    <ActionIcon
                      radius="xl"
                      p={3}
                      pos="absolute"
                      right={2}
                      top={2}
                      classNames={{
                        root: "bg-transparent hover:bg-lightGray hover:bg-opacity-50"
                      }}
                      onClick={(e) => e.preventDefault()}>
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
                        router.replace(`/albums/update/${id}`);
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
              <Text
                classNames={{
                  root: "text-xl font-bold text-white line-clamp-2"
                }}>
                {title}
              </Text>
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
