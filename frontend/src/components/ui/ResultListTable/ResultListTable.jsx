import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { useLazyQuery } from "@apollo/client";
import { TASK_SEARCH_QUERY } from "../../../graphql/queries/taskFindQuery";
import { useNavigate, useSearchParams } from "react-router-dom";
import { languageIcons } from "../../utils/languageIcons/languageIcons";
import { DropDownMenuIcon } from "../DropDownMenuIcon/DropDownMenuIcon";
import { LoadingCircle } from "../LoadingCIrcle/LoadingCircle";
import { linkIcons } from "../../utils/Icons/linkIcons";
import { TopContentInTable } from "./TopContentInTabel/TopContentInTabel";
import serverError from "../../utils/serverError/serverError";

export function ResultListTable({
  outsideData,
  searchMenu,
  showDropDownMenu,
  filterValue,
  setFilterValue,
}) {
  const [searchTask, { loading, data }] = useLazyQuery(TASK_SEARCH_QUERY);
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [results, setResults] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const genTaskDesc = (taskId) => {
    const taskDetail = searchResults.find((x) => x._id === taskId);
    const desc =
      `${taskDetail.language} ${taskDetail.course} ${taskDetail.module} ${taskDetail.taskName}`
        .replace(/-./g, "")
        .replace(/ /g, "-");
    const encodedDesc = encodeURIComponent(desc);
    return encodedDesc;
  };

  const taskDetails = (taskId) => {
    navigate(`/solution?desc=${genTaskDesc(taskId)}&id=${taskId}`);
  };

  const tableValues = (column, item) => {
    if (column === "language") {
      return (
        <DropDownMenuIcon
          alt={item.language}
          src={languageIcons(item.language)}
        />
      );
    }
    if (column === "taskName") {
      return getKeyValue(item, column);
    }
    if (column === "codeAndVIdeo") {
      return (
        <div className="flex gap-3">
          <DropDownMenuIcon alt="code icon" src={linkIcons("code")} />
          {item.videoLink && (
            <DropDownMenuIcon alt="video icon" src={linkIcons("youTube")} />
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    if (!searchParams.get("query")) return;
    try {
      searchTask({
        variables: {
          input: {
            taskName: searchParams.get("query"),
          },
        },
      });
    } catch (error) {
      serverError();
    }
  }, [searchParams]);

  useEffect(() => {
    if (!data?.getTaskGlobal?.result) return;
    const dataParse = JSON.parse(data?.getTaskGlobal?.result);
    setSearchResults(dataParse);
    setResults(dataParse);
  }, [data]);

  useEffect(() => {
    if (!outsideData) return;
    const dataParse = JSON.parse(outsideData);
    setSearchResults(dataParse);
    setResults(dataParse);
  }, [outsideData]);

  const pages = Math.ceil(searchResults.length / resultsPerPage);
  if (page > pages && page > 1) {
    setPage(pages);
  }

  const items = useMemo(() => {
    const start = (page - 1) * resultsPerPage;
    const end = start + resultsPerPage;

    return searchResults.slice(start, end);
  }, [page, pages, searchResults]);


  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
        <Table
          aria-label="table with client side pagination"
          onRowAction={(e) => taskDetails(e)}
          selectionMode="single"
          topContent={
            searchMenu ? null : (
              <TopContentInTable
                totalTasks={searchResults.length}
                setResultsPerPage={setResultsPerPage}
                results={results}
                setSearchResults={setSearchResults}
                searchResults={searchResults}
                showDropDownMenu={showDropDownMenu}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
              />
            )
          }
          bottomContent={
            !outsideData && (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="default"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            )
          }
          classNames={{
            wrapper: "justify-start",
          }}
        >
          <TableHeader>
            <TableColumn scope="col" key="taskName" role="task name">
              TASK NAME
            </TableColumn>
            <TableColumn scope="col" key="language" role="task language">
              LANGUAGE
            </TableColumn>
            <TableColumn
              scope="col"
              key="codeAndVIdeo"
              role="task code and/or video"
            >
              CODE & VIDEO
            </TableColumn>
          </TableHeader>
          <TableBody items={items} emptyContent={"No task solutions found"}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell className="cursor-pointer">
                    {tableValues(columnKey, item)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
