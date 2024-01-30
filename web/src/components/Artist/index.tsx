"use client";
import { useContext } from "react";
import Link from "next/link";
import { ActionIcon, Flex, Group, Menu, Text } from "@mantine/core";
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
        p={1}
        classNames={{
          root: " w-min p-1 rounded hover:bg-darkGray"
        }}>
        <Link href={`/artists/${id}`}>
          <Flex align="center">
            <Group>
              <Flex
                w={160}
                h={160}
                align="center"
                justify="center"
                pos="relative"
                classNames={{
                  root: "bg-gray text-white rounded-full"
                }}>
                <IconUserFilled size={64} />

                <Menu width={200}>
                  <Menu.Target>
                    <ActionIcon
                      p={3}
                      pos="absolute"
                      right={2}
                      top="50%"
                      classNames={{
                        root: "bg-transparent rounded-full hover:bg-lightGray hover:bg-opacity-50"
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
                        router.replace(`/artists/update/${id}`);
                      }}>
                      Update Artist
                    </Menu.Item>
                    <Menu.Item
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      classNames={{
                        item: "text-red-400 hover:bg-neutral-700"
                      }}>
                      Delete Artist
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Flex>
              <Text
                fz="xl"
                fw="bold"
                ta="center"
                w="100%"
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
          onDelete={() => handleDeleteArtist(id)}
        />
      )}
    </>
  );
}
