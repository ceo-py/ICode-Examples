import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { TASK_DELETE_MUTATION } from "../../../../../graphql/mutations/taskDeleteMutation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

export default function DeleteTaskModal({ isOpen, onOpenChange }) {
  const [taskDelete] = useMutation(TASK_DELETE_MUTATION);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleDeleteTask = async () => {
    try {
      const { data } = await taskDelete({
        variables: { input: { id: searchParams.get("id") } },
      });
      console.log(data);
      if (data?.followUser?.code === 200) {
        setButtonData({
          ...buttonData,
          Follow: !buttonData.Follow,
        });
        refetch();
      }
    } catch (error) {
      serverError();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Task Deletion Confirmation
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this task? This action is
                irreversible, and all associated content will be permanently
                deleted.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onClose();
                  handleDeleteTask();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
