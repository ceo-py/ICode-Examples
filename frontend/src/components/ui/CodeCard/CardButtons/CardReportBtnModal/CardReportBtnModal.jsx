import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import { signal } from "@preact/signals-react";

export function CardReportBtnModal({ isOpen, onOpenChange }) {
  const textSize = signal('');

  return (
    <>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Report Problem
              </ModalHeader>
              <ModalBody>
                <Textarea
                  variant="underlined"
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                  value={textSize.value}
                  onValueChange={(v) => v.length <= 300 || v.length < text.length? textSize.value = v: ''}
                  description={`${300 - textSize.value.length} characters remaining`}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {console.log(textSize.value); onClose()}}>
                  Report
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


