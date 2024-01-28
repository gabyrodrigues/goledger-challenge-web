import { SimpleGrid, Stack } from "@mantine/core";
import { Album, AlbumProps } from "../Album";
import { SectionHeading } from "../SectionHeading";

interface PlaylistsSectionProps {
  items: AlbumProps[];
}
export function PlaylistsSection({ items }: PlaylistsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Playlists"
        linkUrl="/playlists"
      />

      <SimpleGrid cols={6}>
        {items.map((item) => (
          <Album
            key={item.id}
            id={item.id}
            title={item.title}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
