import { SimpleGrid, Stack, Text } from "@mantine/core";

import { Album } from "../Album";
import { SectionHeading } from "../SectionHeading";
import { AlbumItem } from "@/contexts/AlbumContext";

interface AlbumsSectionProps {
  items: AlbumItem[];
  linkUrl?: string;
}
export function AlbumsSection({ items, linkUrl }: AlbumsSectionProps) {
  return (
    <Stack gap={32}>
      <SectionHeading
        title="Albums"
        linkUrl={linkUrl}
      />

      {items.length ? (
        <SimpleGrid
          cols={6}
          classNames={{
            root: "items-start"
          }}>
          {items.map((item) => (
            <Album
              key={item.id}
              id={item.id}
              title={item.title}
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
          No albums to display.
        </Text>
      )}
    </Stack>
  );
}
