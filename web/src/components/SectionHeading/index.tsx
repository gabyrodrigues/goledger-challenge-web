import { Button, Flex, Text } from "@mantine/core";
import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  linkUrl?: string;
}
export function SectionHeading({ title, linkUrl }: SectionHeadingProps) {
  return (
    <Flex className="justify-between">
      <Text className="text-4xl font-bold text-white">{title}</Text>
      {!!linkUrl && (
        <Button
          variant="outline"
          component={Link}
          href={linkUrl}
          className="font-bold text-white border border-lightGray rounded-3xl hover:bg-white hover:border-white hover:text-black">
          More
        </Button>
      )}
    </Flex>
  );
}
