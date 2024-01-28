import { SimpleGrid, Stack } from "@mantine/core";
import { Artist, ArtistProps } from "../Artist";
import { SectionHeading } from "../SectionHeading";

interface ArtistsSectionProps {
  items: ArtistProps[];
}
export function ArtistsSection({ items }: ArtistsSectionProps) {
  return (
    <Stack className="flex gap-8">
      <SectionHeading
        title="Artists"
        linkUrl="/artists"
      />

      <SimpleGrid cols={6}>
        {items.map((item) => (
          <Artist
            key={item.id}
            id={item.id}
            name={item.name}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
