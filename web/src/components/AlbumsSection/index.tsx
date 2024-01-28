import { SimpleGrid, Stack } from "@mantine/core";
import { Album } from "../Album";
import { SectionHeading } from "../SectionHeading";
import { AlbumItem } from "@/contexts/AlbumContext";

interface AlbumsSectionProps {
  items: AlbumItem[];
  linkUrl?: string;
}
export function AlbumsSection({ items, linkUrl }: AlbumsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Albums"
        linkUrl={linkUrl}
      />

      <SimpleGrid
        cols={6}
        className="items-start">
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
