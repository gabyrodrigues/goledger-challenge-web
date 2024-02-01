import { SimpleGrid, Stack, Text } from "@mantine/core";

import { SectionHeading } from "../SectionHeading";
import { Playlist } from "../Playlist";
import { PlaylistItem } from "@/contexts/PlaylistContext";

interface PlaylistsSectionProps {
  items: PlaylistItem[];
  linkUrl?: string;
}
export function PlaylistsSection({ items, linkUrl }: PlaylistsSectionProps) {
  return (
    <Stack
      display="flex"
      gap={32}>
      <SectionHeading
        title="Playlists"
        linkUrl={linkUrl}
      />

      {items.length ? (
        <SimpleGrid
          cols={6}
          styles={{
            root: {
              alignItems: "flex-start"
            }
          }}>
          {items.map((item) => (
            <Playlist
              key={item.id}
              id={item.id}
              name={item.name}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text
          fs="italic"
          ta="center"
          c="dark.2">
          No albums to display.
        </Text>
      )}
    </Stack>
  );
}
