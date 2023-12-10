import React, { useEffect, useMemo, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";
import {users} from "./data";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { useLazyQuery } from "@apollo/client";
import { TASK_SEARCH_QUERY } from "../../../graphql/queries/taskFindQuery";
import { useSearchParams } from "react-router-dom";
import { capitalizeWord } from "../../utils/capitalizeWord/capitalizeWord";

export function ResultListTable() {
  const [searchTask, { data }] = useLazyQuery(TASK_SEARCH_QUERY);
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = React.useState([]);

  useEffect(() => {
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

  // {searchResults.map((x) => (
  //   <p key={x.taskName}>{x.taskName}</p>
  // ))}
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(searchResults.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return searchResults.slice(start, end);
  }, [page, searchResults]);

  return (
    <Table
      aria-label="table with client side pagination"
      onRowAction={(e) => console.log(e)}
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
        <TableColumn key="status">TYPE</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
