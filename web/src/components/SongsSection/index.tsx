import { SimpleGrid, Stack } from "@mantine/core";
import { Song, SongProps } from "../Song";
import { SectionHeading } from "../SectionHeading";

interface SongsSectionProps {
  items: SongProps[];
  linkUrl?: string;
}
export function SongsSection({ items, linkUrl }: SongsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Songs"
        linkUrl={linkUrl}
      />

      <SimpleGrid cols={3}>
        {items.map((item) => (
          <Song
            key={item.id}
            id={item.id}
            title={item.title}
            artists={item.artists}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
