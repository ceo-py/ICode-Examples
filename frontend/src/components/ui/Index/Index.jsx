import { ResultListTable } from "../ResultListTable/ResultListTable";
import { useQuery } from "@apollo/client";
import { INDEX_TOP_20_QUERY } from "../../../graphql/queries/indexTop20Query";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import { NoResultFound } from "../NoResultFound/NoResultFound";
import TabLanguages from "../TabLanguages/TabLanguages";
import { LanguageLocalStorage } from "../../utils/LanguageLocalStorage/LanguageLocalStorage";
import { MetaTags } from "../MetaTags/MetaTags";

export default function Index() {
  const { loading, data } = useQuery(INDEX_TOP_20_QUERY);
  const [language, setLanguage] = LanguageLocalStorage();

  return (
    <>
      <MetaTags 
      title="iCode Example"
      description="Coding Problem Solving Hub: Get Solutions & Video Tutorials Here!"
      keywords="softuni c#, softuni python, softuni javascript, softuni c++, softuni java, softuni basic, softuni fundamentals"
      />
      <div className="flex items-center w-full flex-col">
        {!loading && (
          <>
            <h3 className="flex items-center justify-center font-semibold text-center">
              Discover our latest 100 task additions, now totaling{" "}
              {data.getIndexTop20.totalSolutions} solutions and{" "}
              {data.getIndexTop20.totalVIdeoTutorial} Video Tutorials.
            </h3>
            <TabLanguages language={language} setLanguage={setLanguage} />
          </>
        )}

        {loading ? (
          <LoadingCircle />
        ) : data?.getIndexTop20?.status?.code === 200 ? (
          <ResultListTable
            outsideData={data?.getIndexTop20[language]}
            searchMenu={true}
            hidePagination={true}
          />
        ) : (
          <NoResultFound />
        )}
      </div>
    </>
  );
}
