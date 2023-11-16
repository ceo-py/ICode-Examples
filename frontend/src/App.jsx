import { selectedCourseSignal } from './components/ui/SelectMenu/SelectLanguage/selectMenuSignal';
import { CodeSnippet } from './components/ui/CodeSnippet/CodeSnippet';
import { SelectMenu } from './components/ui/SelectMenu/SelectMenu';


function App() {

  return (
    <>
    <SelectMenu menu={selectedCourseSignal}/>
    <br/>
    <CodeSnippet/>
    </>
  )
}

export default App
