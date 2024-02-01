"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionIcon, Flex, Group, Menu, Stack, Text, Title } from "@mantine/core";
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
          p={1}>
          <Group wrap="nowrap">
            <Flex
              align="center"
              justify="center"
              h={56}
              w={56}
              bg="dark.6"
              c="gray.0">
              <IconPlayerPlayFilled
                color="gray.0"
                size={24}
              />
            </Flex>
            <Stack gap={0}>
              <Group c="gray.0">
                <Title
                  order={4}
                  lineClamp={2}
                  fw="bold"
                  c="gray.0">
                  {title}
                </Title>
                {explicit && <IconExplicit size={20} />}
              </Group>
              <Text
                c="dark.2"
                lineClamp={1}>
                {artists.join(", ")}
              </Text>
            </Stack>
          </Group>

          <Menu width={200}>
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                radius="xl"
                p={3}
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
                  router.replace(`/songs/update/${id}`);
                }}>
                Update Song
              </Menu.Item>
              <Menu.Item
                c="red.6"
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
