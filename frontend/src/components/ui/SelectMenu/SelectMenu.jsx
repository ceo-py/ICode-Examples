import { SelectLanguage } from "./SelectLanguage/SelectLanguage";
import { SelectCourse } from "./SelectCourse/SelectCourse";
import { SelectModule } from "./SelectModule/SelectModule";

export function SelectMenu({ menu }) {
  return (
    <div className="flex flex-wrap w-full">
      <SelectLanguage menu={menu} />
      <SelectCourse menu={menu} />
      <SelectModule menu={menu} />
    </div>
  );
}
