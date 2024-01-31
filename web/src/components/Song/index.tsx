"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionIcon, Flex, Group, Menu, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconExplicit, IconPlayerPlayFilled } from "@tabler/icons-react";

import { SongContext, SongItem } from "@/contexts/SongContext";
import { DeleteModal } from "../DeleteModal";

interface SongProps extends Omit<SongItem, "songs" | "album"> {}

export function Song({ id, title, artists, explicit }: SongProps) {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);
  const { handleDeleteSong } = useContext(SongContext);

  return (
    <>
      <Link href={`/songs/${id}`}>
        <Flex
          align="center"
          justify="space-between"
          p={1}
          classNames={{ root: "rounded hover:bg-darkGray" }}>
          <Group wrap="nowrap">
            <Flex
              align="center"
              justify="center"
              h={56}
              w={56}
              classNames={{ root: "bg-gray text-white" }}>
              <IconPlayerPlayFilled size={24} />
            </Flex>
            <Stack gap={4}>
              <Group>
                <Text
                  fw="bold"
                  fz="xl"
                  classNames={{ root: "text-white line-clamp-1" }}>
                  {title}
                </Text>
                {explicit && <IconExplicit size={20} />}
              </Group>
              <Text classNames={{ root: "text-lightGray line-clamp-1" }}>{artists.join(", ")}</Text>
            </Stack>
          </Group>

          <Menu width={200}>
            <Menu.Target>
              <ActionIcon
                radius="xl"
                p={3}
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
                onClick={(e) => {
                  e.preventDefault();
                  router.replace(`/songs/update/${id}`);
                }}>
                Update Song
              </Menu.Item>
              <Menu.Item
                classNames={{ item: "text-red-400 hover:bg-neutral-700" }}
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}>
                Delete Song
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Link>

      {opened && (
        <DeleteModal
          opened={opened}
          open={open}
          close={close}
          onDelete={() => handleDeleteSong(id)}
        />
      )}
    </>
  );
}
