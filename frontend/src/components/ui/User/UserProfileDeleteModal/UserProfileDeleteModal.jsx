import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { USER_DELETE_MUTATION } from "../../../../graphql/mutations/userDeleteMutaion";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../../../../graphql/mutations/logOutMutation";
import { useAuth } from "../../../../AuthContext/AuthContext";

export default function UserProfileDeleteModal({ isOpen, onOpenChange }) {
  const [userDelete] = useMutation(USER_DELETE_MUTATION);
  const [logout] = useMutation(LOGOUT_MUTATION);
  const { dispatch } = useAuth();

  const handleLogout = () => {
    logout()
      .then(({ data }) => {
        if (data.logout.code === 200) {
          dispatch({ type: "LOGOUT" });
        }
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
      });
  };

  const handleUserDelete = async () => {
    try {
      await userDelete();
      handleLogout();
    } catch (error) {
      console.error("User Delete Error:", error.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Account Deletion Confirmation
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete your account? This action is
                  irreversible, and all your data will be permanently deleted.
                  If you proceed, you will lose access to your account and any
                  associated content.
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
                    handleUserDelete();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
