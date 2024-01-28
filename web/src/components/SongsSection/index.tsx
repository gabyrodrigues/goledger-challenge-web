import { SimpleGrid, Stack } from "@mantine/core";
import { Song } from "../Song";
import { SectionHeading } from "../SectionHeading";
import { SongItem } from "@/contexts/SongContext";

interface SongsSectionProps {
  items: SongItem[];
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
