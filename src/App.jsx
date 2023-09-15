import {useState} from "react";
import {gitGetApi} from "./GitHubGetRequest.jsx";
import {SolutionsCode} from "./SolutionsCode.jsx";
import {LanguageDropDownMenu} from "./LanguageDropDownMenu.jsx";
import {formatTitle} from "./utils/formatTitle.jsx";


const languageOptions = {
    python: {
        name: 'Python',
        modules: {
            Basics: ['First Steps in Coding - Lab',
                'First Steps in Coding - Exercise',
                'First Steps in Coding - More Exercises',
                'Conditional Statements - Lab',
                'Conditional Statements - Exercise',
                'Conditional Statements - More Exercises',
                'Conditional Statements Advanced - Lab',
                'Conditional Statements Advanced - Exercise',
                'Conditional Statements Advanced - More Exercises',
                'For Loop - Lab',
                'For Loop - Exercise',
                'For-Loop - More Exercises',
                'While Loop - Lab',
                'While Loop - Exercise',
                'While-Loop - More Exercises',
                'Nested Loops - Lab',
                'Nested Loops - Exercise',
                'Nested Loops - More Exercises',
                'Drawing Figures with Loops - More Exercises']
        },
    },
    javascript: {
        name: 'JavaScript',
        modules: {
            Basics: ['First Steps in Coding - Lab',
                'First Steps in Coding - Exercise',
                'First Steps in Coding - More Exercises',
                'Conditional Statements - Lab',
                'Conditional Statements - Exercise',
                'Conditional Statements - More Exercises',
                'Conditional Statements Advanced - Lab',
                'Conditional Statements Advanced - Exercise',
                'Conditional Statements Advanced - More Exercises',
                'For Loop - Lab',
                'For Loop - Exercise',
                'For-Loop - More Exercises',
                'While Loop - Lab',
                'While Loop - Exercise',
                'While-Loop - More Exercises',
                'Nested Loops - Lab',
                'Nested Loops - Exercise',
                'Nested Loops - More Exercises',
                'Drawing Figures with Loops - More Exercises']
        },
    },
}

// eslint-disable-next-line react/prop-types
function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [output, setOutput] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [url, setUrl] = useState({});
    const selectedLanguageData = languageOptions[selectedLanguage];
    const selectedModuleData = selectedLanguageData?.modules[selectedModule];


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async () => {
        setOutput(await gitGetApi(url))
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleModelChange = (event) => {
        setSelectedModule(event.target.value);
    };

    const handleTopicChange = (event) => {
        setSelectedTopic(event.target.value);
        setUrl({
            language: formatTitle(selectedLanguage),
            module: selectedModule,
            topic: event.target.value
        })
    };

    return (
        <>
            <LanguageDropDownMenu
                handleLanguageChange={handleLanguageChange}
                handleModelChange={handleModelChange}
                handleTopicChange={handleTopicChange}
                selectedLanguage={selectedLanguage}
                selectedModule={selectedModule}
                selectedTopic={selectedTopic}
                selectedLanguageData={selectedLanguageData}
                selectedModuleData={selectedModuleData}
                languageOptions={languageOptions}
            />
            <div className="App">
                <h1>Search App</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearchSubmit}>Search</button>
            </div>
            <SolutionsCode output={output}/>
            <div>{selectedLanguage} {selectedModule} {selectedTopic}</div>


        </>
    )
}


export default App
