
export function LanguageDropDownMenu({
                                         handleTopicChange,
                                         selectedLanguage,
                                         selectedModule,
                                         selectedTopic,
                                         selectedLanguageData,
                                         selectedModuleData,
                                         languageOptions,
                                         setSelectedLanguage,
                                         setSelectedModule
                                     }) {
    return (
        <>
            <form>
                <label htmlFor="firstDropdown">Select Language:</label>
                <select id="firstDropdown" onChange={e => setSelectedLanguage(e.target.value)} value={selectedLanguage}>
                    <option>Select a language</option>
                    {Object.keys(languageOptions).map((key) => (
                        <option key={key} value={key}>
                            {languageOptions[key].name.language}
                        </option>
                    ))}
                </select>

                <label htmlFor="secondDropdown">Select Module:</label>
                <select id="secondDropdown" onChange={e => setSelectedModule(e.target.value)} value={selectedModule}
                        disabled={!selectedLanguage}>
                    <option>Select a module</option>
                    {selectedLanguageData && Object.keys(selectedLanguageData.modules).map((module) => (
                        <option key={module} value={module}>
                            {module}
                        </option>
                    ))}
                </select>

                <label htmlFor="thirdDropdown">Select topics:</label>
                <select id="thirdDropdown" onChange={handleTopicChange} value={selectedTopic}
                        disabled={!selectedModuleData}>
                    <option>Select a topic</option>
                    {selectedModuleData && Object.keys(selectedModuleData).map((topic) => (
                        <option key={topic} value={topic}>
                            {topic}
                        </option>
                    ))}
                </select>
            </form>
        </>
    )
}