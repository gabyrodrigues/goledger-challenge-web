import { SimpleGrid, Stack } from "@mantine/core";
import { Album, AlbumProps } from "../Album";
import { SectionHeading } from "../SectionHeading";

interface AlbumsSectionProps {
  items: AlbumProps[];
}
export function AlbumsSection({ items }: AlbumsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Albums"
        linkUrl="/albums"
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
