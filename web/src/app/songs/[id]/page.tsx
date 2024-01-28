import { Stack } from "@mantine/core";
import { InfoCard } from "@/components/InfoCard";

export default function SongId() {
  return (
    <Stack className="gap-8">
      <InfoCard
        type="song"
        song={{
          id: "jdsofjogjf",
          title: "Tell Me You Love Me",
          explicit: true,
          artists: ["Demi Lovato"],
          album: "Tell Me You Love Me"
        }}
      />
    </Stack>
  );
}
