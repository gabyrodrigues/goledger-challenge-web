import { SimpleGrid, Stack, Text } from "@mantine/core";

import { Song } from "../Song";
import { SectionHeading } from "../SectionHeading";
import { SongItem } from "@/contexts/SongContext";

interface SongsSectionProps {
  items: SongItem[];
  linkUrl?: string;
}
export function SongsSection({ items, linkUrl }: SongsSectionProps) {
  return (
    <Stack
      display="flex"
      gap={32}>
      <SectionHeading
        title="Songs"
        linkUrl={linkUrl}
      />

      {items.length ? (
        <SimpleGrid cols={3}>
          {items.map((item) => (
            <Song
              key={item.id}
              id={item.id}
              title={item.title}
              explicit={item.explicit}
              artists={item.artists}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text
          fs="italic"
          ta="center"
          classNames={{
            root: "text-lightGray"
          }}>
          No songs to display.
        </Text>
      )}
    </Stack>
  );
}
