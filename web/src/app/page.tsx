import { SongsSection } from "@/components/SongsSection";
import { Container } from "@mantine/core";

export default function Home() {
  return (
    <Container
      size="lg"
      className="px-10 py-16">
      <SongsSection
        items={[
          {
            id: "dsljf9384fkdjg9030jkdv",
            title: "Sorry Not Sorry",
            artist: "Demi Lovato"
          },
          {
            id: "4uoigjfi5u4gjh490gh904",
            title: "Don't Forget",
            artist: "Demi Lovato"
          },
          {
            id: "dsgd54gfdg45rg6ygd356578",
            title: "Only Forever",
            artist: "Demi Lovato"
          }
        ]}
      />
    </Container>
  );
}
