import {
  Card,
  CardHeader,
  Avatar,
  Textarea,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  useDisclosure,
} from "@nextui-org/react";
import { useSignal } from "@preact/signals-react";
import { DropDownMenuIcon } from "../../DropDownMenuIcon/DropDownMenuIcon";
import { CardReportBtnModal } from "../CardButtons/CardReportBtnModal/CardReportBtnModal";
import { useAuth } from "../../../../AuthContext/AuthContext";
import { EDIT_COMMENT_MUTATION } from "../../../../graphql/mutations/commentEditMutation";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT_MUTATION } from "../../../../graphql/mutations/commentDeleteMutation";
import serverError from "../../../utils/serverError/serverError";

const dropDownBtnSettings = [
  {
    textValue: "Edit",
    onPress: (btn) => {
      btn.value = true;
      console.log(`Edit Was clicked`);
    },
    iconSrc: "https://www.svgrepo.com/show/418007/edit-1.svg",
  },
  {
    textValue: "Delete",

    iconSrc: "https://www.svgrepo.com/show/418071/note-delete.svg",
  },
  {
    textValue: "Report",
    onPress: (btn) => {
      btn();
      console.log(`Report Was clicked`);
    },
    iconSrc: "https://www.svgrepo.com/show/418024/report.svg",
  },
];

export function ListComments({
  commentData,
  refetch,
  setCommentsList,
  commentsList,
}) {
  const [focus, comment, hover] = [
    useSignal(false),
    useSignal(commentData.text),
    useSignal(false),
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { state } = useAuth();
  const [commentEdit] = useMutation(EDIT_COMMENT_MUTATION);
  const [commentDelete] = useMutation(DELETE_COMMENT_MUTATION);

  const handleEditComment = async (id, text) => {
    try {
      const { data } = await commentEdit({
        variables: { input: { id, text } },
      });
      console.log(data);
      if (data?.editComment?.code === 200) {
        refetch();
      }
    } catch (error) {
      serverError()
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const { data } = await commentDelete({
        variables: { input: { id } },
      });
      if (data?.deleteComment?.code === 200) {
        refetch();
        setCommentsList(
          commentsList.filter((x) => x.commentId !== commentData.commentId)
        );
      }
    } catch (error) {
      console.error("Comment Error:", error.message);
    }
  };

  return (
    <Card
      className="max-w-full shadow-none"
      onMouseEnter={() => (hover.value = true)}
      onMouseLeave={() => (hover.value = false)}
    >
      <CardHeader className="flex items-start gap-6">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={
              commentData.icon
                ? commentData.icon
                : "https://www.svgrepo.com/show/418032/user.svg"
            }
          />
        </div>
        <div className="w-full flex gap-2">
          <Textarea
            classNames={{
              inputWrapper:
                "group-data-[focus-visible=true]:ring-3 group-data-[focus=true]:bg-default-0 data-[hover=true]:bg-default-0 bg-default-0 shadow-none px-0",
            }}
            isReadOnly={!focus.value}
            variant={focus.value ? "underlined" : "flat"}
            label={
              <div className="flex gap-2">
                <div className="font-bold">@{commentData.username}</div>
                <div>
                  {commentData.timePast.replace("undefined", "1 second")}
                </div>
              </div>
            }
            labelPlacement="outside"
            minRows="1"
            maxRows="4"
            value={comment.value}
            onValueChange={(v) => (comment.value = v)}
          />
          {hover.value && !focus.value ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  as="button"
                  classNames={{
                    base: "transition-transform bg- ",
                    img: "rotate-90",
                  }}
                  size="xl"
                  src={"https://www.svgrepo.com/show/418040/more.svg"}
                />
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Static Actions">
                {dropDownBtnSettings
                  .slice(state.username === commentData.username ? 0 : 2)
                  .map((x) => (
                    <DropdownItem
                      textValue={x.textValue}
                      key={x.textValue}
                      onPress={() => {
                        if (x.textValue === "Edit") {
                          focus.value = true;
                        } else if (x.textValue === "Delete") {
                          handleDeleteComment(commentData.commentId);
                        } else if (x.textValue === "Report") {
                          onOpen();
                        }
                      }}
                      startContent={
                        <DropDownMenuIcon alt={x.textValue} src={x.iconSrc} />
                      }
                    >
                      {x.textValue}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="w-[40px]"></div>
          )}
        </div>
      </CardHeader>
      {focus?.value && (
        <div className="flex flex-row-reverse gap-2 p-3">
          <Button
            color={comment.value.trim() ? "primary" : "default"}
            radius="full"
            size="sm"
            isDisabled={comment.value.trim() === commentData.text}
            onPress={() => {
              focus.value = !focus.value;
              comment.value = comment.value.trim();
              handleEditComment(commentData.commentId, comment.value);
            }}
          >
            Edit
          </Button>
          <Button
            radius="full"
            size="sm"
            variant="light"
            onPress={() => {
              focus.value = !focus.value;
            }}
          >
            Cancel
          </Button>
        </div>
      )}
      <CardReportBtnModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        typeReport={"Comment"}
        idReportType={commentData.commentId}
      />
    </Card>
  );
}
