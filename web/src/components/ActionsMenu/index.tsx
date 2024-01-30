import { Button, Menu } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export function ActionsMenu() {
  return (
    <Menu
      shadow="md"
      width={200}>
      <Menu.Target>
        <Button
          variant="outline"
          leftSection={<IconPlus size={24} />}
          radius="md"
          fw="bold"
          classNames={{
            root: "text-primary border-lightGray hover:bg-primary hover:text-white hover:border-primary"
          }}>
          Create
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        classNames={{
          dropdown: "bg-darkGray text-white"
        }}>
        <Menu.Item
          component={Link}
          href="/">
          New Artist
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/">
          New Album
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/">
          New Song
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/">
          New Playlist
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
