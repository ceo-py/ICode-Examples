import { SelectLanguage } from './components/ui/SelectLanguage/SelectLanguage';
import { selectedCourseSignal } from './components/ui/SelectLanguage/selectMenuSignal';
import { SelectCourse } from "./components/ui/SelectCourse/SelectCourse";
import { SelectModule } from "./components/ui/SelectModule/SelectModule";
import { CodeSnippet } from './components/ui/CodeSnippet/CodeSnippet';


function App() {

  return (
    <>
    <SelectLanguage menu={selectedCourseSignal}/>
    <SelectCourse menu={selectedCourseSignal}/> 
    <SelectModule menu={selectedCourseSignal}/>
    <br/>
    <CodeSnippet/>
    </>
  )
}

export default App
