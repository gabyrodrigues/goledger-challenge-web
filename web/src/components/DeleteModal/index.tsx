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
        <Text className="font-semibold text-gray-600 text-xl">
          Are you sure you want to delete it?
        </Text>
        <Text className="text-gray-600">
          All of its possible related contents may also be deleted.
        </Text>

        <Group className="mt-8">
          <Button
            size="lg"
            variant="outline"
            onClick={close}
            leftSection={<IconArrowBackUp size="24" />}
            className="text-primary font-bold text-base rounded border-lightGray hover:bg-primary hover:text-white hover:border-primary">
            Cancel
          </Button>
          <Button
            size="lg"
            variant="filled"
            onClick={handleDelete}
            leftSection={<IconExclamationCircle size={24} />}
            className="text-white bg-primary font-bold text-base rounded hover:bg-darkPrimary hover:text-white">
            Confirm
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
}
