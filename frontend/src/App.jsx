import { selectedCourseSignal } from './components/ui/SelectMenu/SelectLanguage/selectMenuSignal';
import { CodeSnippet } from './components/ui/CodeSnippet/CodeSnippet';
import { SelectMenu } from './components/ui/SelectMenu/SelectMenu';
import { SearchInput } from './components/ui/SearchInput/SearchInput';
import { NavMenu } from './components/ui/NavMenu/NavMenu';


function App() {

  return (
    <>
    <NavMenu menu={selectedCourseSignal}/>
    <br/>
    <SelectMenu menu={selectedCourseSignal}/>
    <br/>
    {selectedCourseSignal?.value?.selectedModule && <SearchInput/>}
    <br/>
    <CodeSnippet/>
    </>
  )
}

export default App
