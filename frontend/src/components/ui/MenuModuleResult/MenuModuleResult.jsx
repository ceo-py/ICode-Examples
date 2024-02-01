import { useLazyQuery } from "@apollo/client";
import { GET_MODEL_QUERY } from "../../../graphql/queries/getModule";
import { ResultListTable } from "../ResultListTable/ResultListTable";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import serverError from "../../utils/serverError/serverError";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import { Helmet } from "react-helmet";

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
          <Helmet>
            <title>{`${searchParams.get("module")}, ${searchParams.get("course")}, ${searchParams.get("language")} - iCode Example`}</title>
          </Helmet>
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
