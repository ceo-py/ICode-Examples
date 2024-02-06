import { useLazyQuery } from "@apollo/client";
import { GET_MODEL_QUERY } from "../../../graphql/queries/getModule";
import { ResultListTable } from "../ResultListTable/ResultListTable";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import serverError from "../../utils/serverError/serverError";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import { MetaTags } from "../MetaTags/MetaTags";

export function MenuModuleResult() {
  const [searchModule, { loading, data }] = useLazyQuery(GET_MODEL_QUERY);
  const [searchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState("");
  useEffect(() => {
    if (searchParams.get("module") == "") return;
    try {
      searchModule({
        variables: {
          input: {
            language: searchParams.get("language"),
            course: searchParams.get("course"),
            module: searchParams.get("module"),
          },
        },
      });
    } catch (error) {
      serverError();
    }
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          <MetaTags
            title={`${searchParams.get("language")} : ${searchParams.get("module")} ${searchParams.get("course")} - iCode Example`}
            description={`Explore the world of ${searchParams.get("language")} programming with our comprehensive collection of ${searchParams.get("module")} on iCode Example.`}
            keywords={`${searchParams.get("language")}, ${searchParams.get("module")}, ${searchParams.get("course")}, SoftUni, judge, iCode Example Solutions`}
          />
          <ResultListTable
            outsideData={data?.getModuleExamples?.result}
            showDropDownMenu={true}
            hidePagination={true}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            isHelmet={true}
          />
        </>
      )}
    </>
  );
}
