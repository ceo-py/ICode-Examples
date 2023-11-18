import { selectedCourseSignal } from "./components/ui/SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "./components/ui/SelectMenu/SelectMenu";
import { SearchInput } from "./components/ui/SearchInput/SearchInput";
import { NavMenu } from "./components/ui/NavMenu/NavMenu";
import { CodeSnippet } from "./components/ui/CodeSnippet/COdeSnippet";
import { CodeCard } from "./components/ui/CodeCard/CodeCard";

function App() {
  return (
    <>
      <NavMenu menu={selectedCourseSignal} />
      <div class="flex w-full h-auto items-center justify-center overflow-auto mt-[var(--navbar-height)]">
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
