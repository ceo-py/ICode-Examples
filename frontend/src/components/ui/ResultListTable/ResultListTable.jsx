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

export function ResultListTable({ outsideData }) {
  const [searchTask, { loading, data }] = useLazyQuery(TASK_SEARCH_QUERY);
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
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
          <DropDownMenuIcon alt="code" src={linkIcons("code")} />
          {item.videoLink && (
            <DropDownMenuIcon alt="video" src={linkIcons("youTube")} />
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
      console.error("Error fetching search results:", error);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!data?.getTaskGlobal?.result) return;
    setSearchResults(JSON.parse(data?.getTaskGlobal?.result));
  }, [data]);

  useEffect(() => {
    if (!outsideData) return;
    setSearchResults(JSON.parse(outsideData));
  }, [outsideData]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(searchResults.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return searchResults.slice(start, end);
  }, [page, searchResults]);

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : (
        <Table
          aria-label="table with client side pagination"
          onRowAction={(e) => taskDetails(e)}
          selectionMode="single"
          bottomContent={
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
          }
          classNames={{
            wrapper: "min-h-[calc(100vh-15rem)]",
          }}
        >
          <TableHeader>
            <TableColumn key="taskName">TASK NAME</TableColumn>
            <TableColumn key="language">LANGUAGE</TableColumn>
            <TableColumn key="codeAndVIdeo">CODE & VIDEO</TableColumn>
          </TableHeader>
          <TableBody items={items} emptyContent={"No task solutions found"}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{tableValues(columnKey, item)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
