import { SelectLanguage } from "./SelectLanguage/SelectLanguage";
import { SelectCourse } from "./SelectCourse/SelectCourse";
import { SelectModule } from "./SelectModule/SelectModule";


export function SelectMenu({menu}) {
  return (
    <>
    <SelectLanguage menu={menu}/>
    <SelectCourse menu={menu}/> 
    <SelectModule menu={menu}/>
    </>
  );
}