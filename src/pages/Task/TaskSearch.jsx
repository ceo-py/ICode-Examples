import {useEffect, useState} from "react";
import {languageOptions} from "../../components/LanguageModulContestDropDownForm/LanguageModulContestOptions.jsx";
import {gitGetApi} from "../../GitHubGetRequest.jsx";
import {LanguageDropDownMenu} from "../../components/LanguageModulContestDropDownForm/LanguageDropDownMenu.jsx";
import {TaskList} from "./TaskList.jsx";
import {useLocation } from "react-router-dom"


// eslint-disable-next-line react/prop-types
export function TaskSearch({setSelectedUrl}) {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [output, setOutput] = useState([]);
    const [result, setResult] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedModule, setSelectedModule] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const selectedLanguageData = languageOptions[selectedLanguage];
    const selectedModuleData = selectedLanguageData?.modules[selectedModule];


    useEffect(() => {
        setResult(output)
    }, [output]);

    useEffect(() => {
        setSearchTerm('')
        setOutput([])
    }, [selectedTopic, selectedModule, selectedLanguage]);


    const handleSearchChange = (event) => {
        const context = event.target.value;

        setSearchTerm(context);

        if (!context.trim()) return setResult(output);

        setResult(output.filter(x => x.name.toLowerCase().includes(context.toLowerCase())));
    };


    const handleTopicChange = async (event) => {
        const currentSelection = event.target.value

        setSelectedTopic(currentSelection);
        if (!currentSelection) return


        const queryOptions = {
            language: selectedLanguageData.name.db,
            module: selectedModule,
            topic: selectedModuleData[currentSelection]
        };

        setOutput(await gitGetApi(queryOptions));
    };

    return (
        <>
            <LanguageDropDownMenu
                handleTopicChange={handleTopicChange}
                selectedLanguage={selectedLanguage}
                selectedModule={selectedModule}
                selectedTopic={selectedTopic}
                selectedLanguageData={selectedLanguageData}
                selectedModuleData={selectedModuleData}
                languageOptions={languageOptions}
                setSelectedLanguage={setSelectedLanguage}
                setSelectedModule={setSelectedModule}
            />
            <div className="App">
                <br/>
                {selectedLanguageData?.name?.language && (
                    <h3>
                        {selectedLanguageData.name.language}
                        {selectedModule && ` / ${selectedModule}`}
                        {selectedTopic && ` / ${selectedTopic}`}
                    </h3>
                )}

            </div>
            {location.pathname !== '/details' && (
                <>
                    <input
                        type="text"
                        placeholder="Search Tasks..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <TaskList output={result} setSelectedUrl={setSelectedUrl}/>
                </>)
            }
        </>
    )
}
