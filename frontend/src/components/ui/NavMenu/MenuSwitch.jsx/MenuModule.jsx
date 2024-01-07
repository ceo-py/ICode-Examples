import { selectedCourseSignal } from "../../SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "../../SelectMenu/SelectMenu";

export function MenuModule() {
  return (
    <div className="flex mt-6 flex-col w-full h-auto items-center justify-center">
      <div className="flex mb-12 w-full flex-row flex-wrap items-center justify-between max-w-[1536px]">
        <SelectMenu menu={selectedCourseSignal} />
      </div>
    </div>
  );
}
