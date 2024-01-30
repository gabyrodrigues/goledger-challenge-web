import { SimpleGrid, Stack } from "@mantine/core";
import { Artist } from "../Artist";
import { SectionHeading } from "../SectionHeading";
import { ArtistItem } from "@/contexts/ArtistContext";

interface ArtistsSectionProps {
  items: ArtistItem[];
  linkUrl?: string;
}
export function ArtistsSection({ items, linkUrl }: ArtistsSectionProps) {
  return (
    <Stack gap={32}>
      <SectionHeading
        title="Artists"
        linkUrl={linkUrl}
      />

      <SimpleGrid
        cols={6}
        classNames={{
          root: "items-start"
        }}>
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
