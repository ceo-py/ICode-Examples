import { languages } from "../../ui/SelectMenu/SelectLanguage/data";

export function menuSetUp(language, module, course) {
  if (!language && !module && !course) return null;
  const languageData = Object.values(languages).find(
    (y) => y?.name?.language === language
  );
  console.log(languageData);
  console.log(module);
  return {
    ...languageData,
    ...{ module: languageData.modules[course] },
    ...{ selectedCourse: course },
    ...{ selectedModule: module },
  };
}
