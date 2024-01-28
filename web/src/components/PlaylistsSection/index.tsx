import { SimpleGrid, Stack } from "@mantine/core";
import { SectionHeading } from "../SectionHeading";
import { Playlist, PlaylistProps } from "../Playlist";

interface PlaylistsSectionProps {
  items: PlaylistProps[];
  linkUrl?: string;
}
export function PlaylistsSection({ items, linkUrl }: PlaylistsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Playlists"
        linkUrl={linkUrl}
      />

      <SimpleGrid cols={6}>
        {items.map((item) => (
          <Playlist
            key={item.id}
            id={item.id}
            title={item.title}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
