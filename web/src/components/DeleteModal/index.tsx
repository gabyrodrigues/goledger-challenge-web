import { Modal, Text, Group, Flex, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowBackUp, IconExclamationCircle } from "@tabler/icons-react";

interface DeleteModalProps {
  opened: boolean;
  open: () => void;
  close: () => void;
  onDelete: () => Promise<void>;
}

export function DeleteModal({ opened, close, onDelete }: DeleteModalProps): JSX.Element {
  async function handleDelete() {
    try {
      close();
      await onDelete();
      notifications.show({
        autoClose: 3000,
        message: "Deleted successfully!",
        color: "green"
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        autoClose: 3000,
        message: "It was not possible to delete! Please try again.",
        color: "red"
      });
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="auto"
      withCloseButton={false}
      centered>
      <Flex
        direction="column"
        align="center">
        <Text
          fw="bold"
          fz="xl"
          c="gray.0">
          Are you sure you want to delete it?
        </Text>
        <Text c="gray.0">All of its possible related contents may also be deleted.</Text>

        <Group mt={32}>
          <Button
            size="lg"
            variant="outline"
            onClick={close}
            leftSection={<IconArrowBackUp size="24" />}
            fw="bold"
            radius="md">
            Cancel
          </Button>
          <Button
            size="lg"
            variant="filled"
            onClick={handleDelete}
            leftSection={<IconExclamationCircle size={24} />}
            radius="md"
            fw="bold">
            Confirm
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
}
