import { SimpleGrid, Stack, Text } from "@mantine/core";
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
      {items.length ? (
        <SimpleGrid
          cols={6}
          styles={{
            root: {
              alignItems: "flex-start"
            }
          }}>
          {items.map((item) => (
            <Artist
              key={item.id}
              id={item.id}
              name={item.name}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text
          fs="italic"
          ta="center"
          c="dark.2">
          No artists to display.
        </Text>
      )}
    </Stack>
  );
}
