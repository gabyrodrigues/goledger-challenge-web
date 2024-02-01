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
          fw="bold">
          Create
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        bg="dark.8"
        color="gray.0">
        <Menu.Item
          component={Link}
          href="/artists/new">
          New Artist
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/albums/new">
          New Album
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/songs/new">
          New Song
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/playlists/new">
          New Playlist
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
