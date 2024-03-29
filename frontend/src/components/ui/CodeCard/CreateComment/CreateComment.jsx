import { CardHeader, Avatar, Textarea, Button } from "@nextui-org/react";
import { useSignal } from "@preact/signals-react";
import { CREATE_COMMENT_MUTATION } from "../../../../graphql/mutations/commentCreateMutation";
import { useAuth } from "../../../../ContextGlobal/AuthContext";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import serverError from "../../../utils/serverError/serverError";
import { zoomAndClick } from "../../../utils/css/zoomAndClick";

export function CreateComment({ taskId, refetch, userDetails }) {
  const { state } = useAuth();
  const [focus, comment] = [useSignal(false), useSignal("")];
  const [commentCreate] = useMutation(CREATE_COMMENT_MUTATION);
  const navigate = useNavigate();

  const handleCreateComment = async (id, text) => {
    try {
      const { data } = await commentCreate({
        variables: { input: { id, text } },
      });
      if (data?.createComment?.status?.code === 200) {
        refetch();
      }
    } catch (error) {
      serverError();
    }
  };

  const closeAndResetCommentData = () => {
    focus.value = !focus.value;
    comment.value = "";
  };

  const handleLogin = () => {
    navigate(`/login`);
  };
  return (
    <>
      <CardHeader className="flex items-start gap-6">
        <div className="flex gap-5">
          <Avatar
            className={zoomAndClick()}
            isBordered
            radius="full"
            size="md"
            showFallback
            src={
              state?.iconUrl
                ? state.iconUrl
                : "https://www.svgrepo.com/show/418032/user.svg"
            }
            onClick={() => navigate(`/user?name=${userDetails.username}`)}
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
            onFocus={() =>
              !state.isAuthenticated ? handleLogin() : (focus.value = true)
            }
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
