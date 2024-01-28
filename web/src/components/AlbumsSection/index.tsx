import { SimpleGrid, Stack } from "@mantine/core";
import { Album, AlbumProps } from "../Album";
import { SectionHeading } from "../SectionHeading";

interface AlbumsSectionProps {
  items: AlbumProps[];
  linkUrl?: string;
}
export function AlbumsSection({ items, linkUrl }: AlbumsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Albums"
        linkUrl={linkUrl}
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
