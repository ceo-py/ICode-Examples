import { useLazyQuery } from "@apollo/client";
import { GET_MODEL_QUERY } from "../../../graphql/queries/getModule";
import { ResultListTable } from "../ResultListTable/ResultListTable";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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
      {!loading && (
        <ResultListTable
          outsideData={data?.getModuleExamples?.result}
          showDropDownMenu={true}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      )}
    </>
  );
}
