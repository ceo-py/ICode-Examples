import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export function ModalNotifications({
  isOpen,
  onOpenChange,
  modal,
  sendMessageToBackEnd,
}) {
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Reported Task
            </ModalHeader>
            <ModalBody>
              <p>{modal.content}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                variant="light"
                onPress={onClose}
                size="sm"
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={onClose}
                size="sm"
                variant="light"
                onClick={() => {
                  navigate(`/solution?id=${modal.taskId}`);
                  sendMessageToBackEnd(`makeRead ${modal.reportId}`);
                }}
              >
                View Task
              </Button>
              <Button
                color="danger"
                onPress={onClose}
                size="sm"
                variant="light"
                onClick={() => {
                  sendMessageToBackEnd(`deleteReport ${modal.reportId}`);
                }}
              >
                Delete Report
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
