import { Card, CardHeader, Avatar, Textarea, Button } from "@nextui-org/react";
import { useSignal, signal } from "@preact/signals-react";

export function CodeComments() {
  const focus = useSignal(false);
  const comment = useSignal('')

  return (
    <Card className="max-w-full shadow-none">
      <CardHeader className="flex items-start gap-6">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://www.svgrepo.com/show/418032/user.svg"
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
            onValueChange={(v) => comment.value = v}
            onFocus={() => focus.value = true}
          />
        </div>
      </CardHeader>
      {focus?.value && (
        <div className="flex flex-row-reverse gap-2 p-3">
          <Button
            color={comment.value? "primary": "default"}
            radius="full"
            size="sm"
            isDisabled={!comment.value}
            onPress={""}
          >
            Comment
          </Button>
          <Button
            radius="full"
            size="sm"
            variant="light"
            onPress={() => {focus.value = !focus.value; comment.value = ''}}
          >
            Cancel
          </Button>
        </div>
      )}
    </Card>
  );
}
