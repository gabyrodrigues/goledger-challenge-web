"use client";
import { useContext } from "react";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";

import { PlaylistContext, PlaylistItem } from "@/contexts/PlaylistContext";
import { DeleteModal } from "../DeleteModal";

export interface PlaylistProps extends Pick<PlaylistItem, "id" | "name"> {}

export function Playlist({ id, name }: PlaylistProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const { handleDeletePlaylist } = useContext(PlaylistContext);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        p={1}
        classNames={{ root: "w-min rounded hover:bg-darkGray" }}>
        <Link href={`/playlists/${id}`}>
          <Flex align="center">
            <Group>
              <Flex
                justify="center"
                pos="relative"
                w={160}
                h={160}
                align="center"
                classNames={{ root: "bg-gray text-white" }}>
                <IconPlayerPlayFilled size={64} />

                <Menu width={200}>
                  <Menu.Target>
                    <ActionIcon
                      radius="xl"
                      p={3}
                      pos="absolute"
                      right={2}
                      top={2}
                      classNames={{ root: "bg-transparent hover:bg-lightGray hover:bg-opacity-50" }}
                      onClick={(e) => e.preventDefault()}>
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
              <Text
                fz="xl"
                fw="bold"
                classNames={{ root: "text-white line-clamp-2" }}>
                {name}
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
          onDelete={() => handleDeletePlaylist(id)}
        />
      )}
    </>
  );
}
