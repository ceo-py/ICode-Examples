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
  navigate
}) {

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Reported {modal.reportType}
            </ModalHeader>
            <ModalBody>
              {modal?.comment && <p>{modal.comment.content}</p>}
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
                  navigate(
                    `/solution?id=${
                      modal?.comment ? modal.comment?.idTask : modal.taskId
                    }`
                  );
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
