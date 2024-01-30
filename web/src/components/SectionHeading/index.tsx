import { Button, Flex, Text } from "@mantine/core";
import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  linkUrl?: string;
}
export function SectionHeading({ title, linkUrl }: SectionHeadingProps) {
  return (
    <Flex justify="space-between">
      <Text
        fw="bold"
        classNames={{ root: "text-4xl text-white" }}>
        {title}
      </Text>
      {!!linkUrl && (
        <Button
          variant="outline"
          component={Link}
          href={linkUrl}
          fw="bold"
          radius="xl"
          classNames={{
            root: "text-white border border-lightGray hover:bg-white hover:border-white hover:text-black"
          }}>
          More
        </Button>
      )}
    </Flex>
  );
}
