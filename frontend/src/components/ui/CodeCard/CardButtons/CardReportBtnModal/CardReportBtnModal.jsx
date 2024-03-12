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
import { CREATE_REPORT_MUTATION } from "../../../../../graphql/mutations/reportCreate";
import { useMutation } from "@apollo/client";
import serverError from "../../../../utils/serverError/serverError";

export function CardReportBtnModal({
  isOpen,
  onOpenChange,
  typeReport,
  idReportType,
}) {
  const textSize = signal("");
  const [reportCreate] = useMutation(CREATE_REPORT_MUTATION);

  const handleReportCreate = async (reportData) => {
    try {
      const { data } = await reportCreate({
        variables: {
          input: {
            ...reportData,
          },
        },
      });
    } catch (error) {
      serverError();
    }
  };

  return (
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
                maxRows="6"
                minRows="6"
                onValueChange={(v) =>
                  v.length <= 300 ? (textSize.value = v) : textSize.value
                }
                description={`${
                  300 - textSize.value.length
                } characters remaining`}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                size="sm"
                variant="light"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                color="primary"
                variant="light"
                onPress={() => {
                  handleReportCreate({
                    idReportType,
                    typeReport,
                    reportContent: textSize.value,
                  });
                  onClose();
                }}
              >
                Report
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
