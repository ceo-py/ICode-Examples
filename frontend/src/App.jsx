import { selectedCourseSignal } from "./components/ui/SelectMenu/SelectLanguage/selectMenuSignal";
import { SelectMenu } from "./components/ui/SelectMenu/SelectMenu";
import { NavMenu } from "./components/ui/NavMenu/NavMenu";
import { CodeCard } from "./components/ui/CodeCard/CodeCard";
import { CodeSnippet } from "./components/ui/CodeCard/CodeSnippet/CodeSnippet";
import { SearchInput } from "./components/ui/NavMenu/SearchInput/SearchInput";
import { ResultListTable } from "./components/ui/ResultListTable/ResultListTable";
import Auth from "./components/forms/Auth/Auth";


function App() {
  return (
    <>
      <NavMenu menu={selectedCourseSignal} />
      <div className="flex mt-6 flex-col w-full h-auto items-center justify-center">
        {/* <SelectMenu menu={selectedCourseSignal} /> */}
        {/* <br /> */}
        {/* {selectedCourseSignal?.value?.selectedModule && <SearchInput />} */}
        {/* <br /> */}
        {/* <CodeCard /> */}
        {/* <div className="flex px-6 mt-6 w-full flex-row relative flex-nowrap items-center justify-between max-w-[1536px]">
          <ResultListTable />
        </div> */}
        <Auth/>
        {/* <CodeSnippet /> */}
      </div>
    </>
  );
}

export default App;
