import { CircularProgress } from "@nextui-org/react";

export function LoadingCircle() {
  return (
    <div className="flex flex-col w-full items-center">
      <CircularProgress size="lg" color="warning" aria-label="Loading..." />
    </div>
  );
}
