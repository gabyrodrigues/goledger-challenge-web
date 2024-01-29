"use client";
import { useContext } from "react";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconExplicit, IconPlayerPlayFilled } from "@tabler/icons-react";
import { SongContext, SongItem } from "@/contexts/SongContext";
import { DeleteModal } from "../DeleteModal";

interface SongProps extends Omit<SongItem, "songs" | "album"> {}

export function Song({ id, title, artists, explicit }: SongProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const { handleDeleteSong } = useContext(SongContext);

  return (
    <>
      <Link href={`/songs/${id}`}>
        <Flex className="items-center justify-between p-1 rounded hover:bg-darkGray">
          <Group className="flex-nowrap">
            <Flex className="bg-gray text-white w-14 h-14 justify-center items-center">
              <IconPlayerPlayFilled size={24} />
            </Flex>
            <Stack className="gap-1">
              <Group>
                <Text className="text-xl font-bold text-white line-clamp-1">{title}</Text>
                {explicit && <IconExplicit size={20} />}
              </Group>
              <Text className="text-base text-lightGray line-clamp-1">{artists.join(", ")}</Text>
            </Stack>
          </Group>

          <Menu width={200}>
            <Menu.Target>
              <ActionIcon
                className="rounded-full p-3 hover:bg-lightGray hover:bg-opacity-50"
                onClick={(e) => e.preventDefault()}>
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
                className="text-red-400 hover:bg-neutral-700"
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
