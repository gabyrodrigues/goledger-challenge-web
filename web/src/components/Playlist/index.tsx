"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionIcon, Flex, Group, Menu, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconPlayerPlayFilled } from "@tabler/icons-react";

import { PlaylistContext, PlaylistItem } from "@/contexts/PlaylistContext";
import { DeleteModal } from "../DeleteModal";

export interface PlaylistProps extends Pick<PlaylistItem, "id" | "name"> {}

export function Playlist({ id, name }: PlaylistProps) {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);
  const { handleDeletePlaylist } = useContext(PlaylistContext);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        p={1}>
        <Link href={`/playlists/${id}`}>
          <Flex align="center">
            <Group>
              <Flex
                justify="center"
                pos="relative"
                w={160}
                h={160}
                c="gray.0"
                bg="dark.6"
                align="center">
                <IconPlayerPlayFilled
                  color="gray.0"
                  size={64}
                />

                <Menu width={200}>
                  <Menu.Target>
                    <ActionIcon
                      variant="subtle"
                      radius="xl"
                      p={3}
                      pos="absolute"
                      right={8}
                      top={8}
                      onClick={(e) => e.preventDefault()}>
                      <IconDotsVertical size={24} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown
                    bg="dark.8"
                    color="gray.0">
                    <Menu.Item
                      onClick={(e) => {
                        e.preventDefault();
                        router.replace(`/playlists/update/${id}`);
                      }}>
                      Update Playlist
                    </Menu.Item>
                    <Menu.Item
                      c="red.6"
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}>
                      Delete Playlist
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Title
                order={3}
                lineClamp={2}
                c="gray.0"
                fw="bold">
                {name}
              </Title>
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
