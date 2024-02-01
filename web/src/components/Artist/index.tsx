"use client";
import { useContext } from "react";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconUserFilled } from "@tabler/icons-react";

import { ArtistContext, ArtistItem } from "@/contexts/ArtistContext";
import { DeleteModal } from "../DeleteModal";
import { useRouter } from "next/navigation";

interface ArtistProps extends Omit<ArtistItem, "about"> {}

export function Artist({ id, name }: ArtistProps) {
  const router = useRouter();
  const [opened, { close, open }] = useDisclosure(false);
  const { handleDeleteArtist } = useContext(ArtistContext);

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        p={1}>
        <Link href={`/artists/${id}`}>
          <Flex align="center">
            <Group>
              <Flex
                w={160}
                h={160}
                align="center"
                justify="center"
                pos="relative"
                c="gray.0"
                bg="dark.6"
                styles={{
                  root: {
                    borderRadius: "50%"
                  }
                }}>
                <IconUserFilled
                  color="gray.0"
                  size={64}
                />

                <Menu width={200}>
                  <Menu.Target>
                    <ActionIcon
                      variant="subtle"
                      p={3}
                      pos="absolute"
                      right={8}
                      top="50%"
                      radius="xl"
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
                        router.replace(`/artists/update/${id}`);
                      }}>
                      Update Artist
                    </Menu.Item>
                    <Menu.Item
                      c="red.6"
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}>
                      Delete Artist
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Title
                order={3}
                lineClamp={2}
                fw="bold"
                ta="center"
                w="100%"
                c="gray.0">
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
          onDelete={() => handleDeleteArtist(id)}
        />
      )}
    </>
  );
}
