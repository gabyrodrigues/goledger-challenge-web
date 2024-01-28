import { SimpleGrid, Stack } from "@mantine/core";
import { Song, SongProps } from "../Song";
import { SectionHeading } from "../SectionHeading";

interface SongsSectionProps {
  items: SongProps[];
}
export function SongsSection({ items }: SongsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Songs"
        linkUrl="/songs"
      />

      <SimpleGrid cols={3}>
        {items.map((item) => (
          <Song
            key={item.id}
            id={item.id}
            title={item.title}
            artist={item.artist}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
