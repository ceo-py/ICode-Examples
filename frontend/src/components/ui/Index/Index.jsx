import { ResultListTable } from "../ResultListTable/ResultListTable";
import { useQuery } from "@apollo/client";
import { INDEX_TOP_20_QUERY } from "../../../graphql/queries/indexTop20Query";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import { NoResultFound } from "../NoResultFound/NoResultFound";
import { useEffect, useState } from "react";
import TabLanguages from "../TabLanguages/TabLanguages";
import { LanguageLocalStorage } from "../../utils/LanguageLocalStorage/LanguageLocalStorage";

export default function Index() {
  const { loading, data } = useQuery(INDEX_TOP_20_QUERY);
  const [language, setLanguage] = LanguageLocalStorage();

  return (
    <div className="flex items-center w-full flex-col">
      <TabLanguages language={language} setLanguage={setLanguage} />
      {loading ? (
        <LoadingCircle />
      ) : data?.getIndexTop20?.status?.code === 200 ? (
        <ResultListTable outsideData={data?.getIndexTop20[language]} />
      ) : (
        <NoResultFound />
      )}
    </div>
  );
}
