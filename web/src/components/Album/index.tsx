"use client";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionIcon, Flex, Group, Menu, Title } from "@mantine/core";
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
        justify="space-between">
        <Link href={`/albums/${id}`}>
          <Flex align="center">
            <Group>
              <Flex
                align="center"
                justify="center"
                w={160}
                h={160}
                pos="relative"
                c="gray.0"
                bg="dark.6">
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
                        router.replace(`/albums/update/${id}`);
                      }}>
                      Update Album
                    </Menu.Item>
                    <Menu.Item
                      c="red.6"
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}>
                      Delete Album
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Title
                order={3}
                lineClamp={2}
                c="gray.0"
                fw="bold">
                {title}
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
          onDelete={() => handleDeleteAlbum(id)}
        />
      )}
    </>
  );
}
