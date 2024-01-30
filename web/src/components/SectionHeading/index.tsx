import { Button, Flex, Title } from "@mantine/core";
import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  linkUrl?: string;
}
export function SectionHeading({ title, linkUrl }: SectionHeadingProps) {
  return (
    <Flex justify="space-between">
      <Title
        order={1}
        fw="bold"
        c="var(--mantine-color-gray-0)">
        {title}
      </Title>
      {!!linkUrl && (
        <Button
          variant="outline"
          component={Link}
          href={linkUrl}
          fw="bold"
          radius="xl"
          classNames={{
            root: "text-primary border border-lightGray hover:bg-white hover:border-white hover:text-black"
          }}>
          More
        </Button>
      )}
    </Flex>
  );
}
