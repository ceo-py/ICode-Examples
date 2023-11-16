import { selectedCourseSignal } from './components/ui/SelectMenu/SelectLanguage/selectMenuSignal';
import { CodeSnippet } from './components/ui/CodeSnippet/CodeSnippet';
import { SelectMenu } from './components/ui/SelectMenu/SelectMenu';
import { SearchInput } from './components/ui/SearchInput/SearchInput';


function App() {

  return (
    <>
    <SelectMenu menu={selectedCourseSignal}/>
    <br/>
    {selectedCourseSignal?.value?.selectedModule && <SearchInput/>}
    <br/>
    <CodeSnippet/>
    </>
  )
}

export default App
