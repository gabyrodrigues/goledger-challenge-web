import { SimpleGrid, Stack } from "@mantine/core";
import { SectionHeading } from "../SectionHeading";
import { Playlist } from "../Playlist";
import { PlaylistItem } from "@/contexts/PlaylistContext";

interface PlaylistsSectionProps {
  items: PlaylistItem[];
  linkUrl?: string;
}
export function PlaylistsSection({ items, linkUrl }: PlaylistsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Playlists"
        linkUrl={linkUrl}
      />

      <SimpleGrid
        cols={6}
        className="items-start">
        {items.map((item) => (
          <Playlist
            key={item.id}
            id={item.id}
            name={item.name}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
