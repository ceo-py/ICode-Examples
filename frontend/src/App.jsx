import { selectedCourseSignal } from "./components/ui/SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "./components/ui/SelectMenu/SelectMenu";
import { NavMenu } from "./components/ui/NavMenu/NavMenu";
import { CodeCard } from "./components/ui/CodeCard/CodeCard";
import { CodeSnippet } from "./components/ui/CodeCard/CodeSnippet/CodeSnippet";

function App() {
  return (
    <>
      <NavMenu menu={selectedCourseSignal} />
      <div className="flex w-full h-auto items-center justify-center">
        {/* <SelectMenu menu={selectedCourseSignal} />
      <br />
      {selectedCourseSignal?.value?.selectedModule && <SearchInput />}
      <br /> */}
      <CodeCard/>
      {/* <CodeSnippet /> */}
      </div>
    </>
  );
}

export default App;
