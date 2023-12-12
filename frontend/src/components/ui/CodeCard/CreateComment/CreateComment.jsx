import { CardHeader, Avatar, Textarea, Button } from "@nextui-org/react";
import { useSignal } from "@preact/signals-react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT_MUTATION } from "../../../../graphql/mutations/commentCreateMutation";
import { useAuth } from "../../../../AuthContext/AuthContext";

export function CreateComment({ taskId, icon }) {
  const { state } = useAuth();
  const [focus, comment] = [useSignal(false), useSignal("")];
  const [commentCreate] = useMutation(CREATE_COMMENT_MUTATION);

  const handleCreateComment = async (id, text) => {
    try {
      const { data } = await commentCreate({
        variables: { input: { id, text } },
      });
      if (data.status.code === 200) {
        console.log("success");
        // logic for fetching the comments again
      }
    } catch (error) {
      console.error("Comment Error:", error.message);
    }
  };

  const closeAndResetCommentData = () => {
    focus.value = !focus.value;
    comment.value = "";
  };

  return (
    <>
      <CardHeader className="flex items-start gap-6">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={state.isAuthenticated ? icon : "https://www.svgrepo.com/show/418032/user.svg"}
          />
        </div>
        <div className="w-full flex gap-2">
          <Textarea
            variant="underlined"
            labelPlacement="inside"
            placeholder="Add a comment..."
            minRows="1"
            maxRows="200"
            value={comment.value}
            onValueChange={(v) => (comment.value = v)}
            onFocus={() => (focus.value = true)}
          />
        </div>
      </CardHeader>
      {focus?.value && (
        <div className="flex flex-row-reverse gap-2 p-3">
          <Button
            color={comment.value.trim() ? "primary" : "default"}
            radius="full"
            size="sm"
            isDisabled={!comment.value.trim()}
            onPress={() => {
              handleCreateComment(taskId, comment.value);
              closeAndResetCommentData();
            }}
          >
            Comment
          </Button>
          <Button
            radius="full"
            size="sm"
            variant="light"
            onPress={() => closeAndResetCommentData()}
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}
