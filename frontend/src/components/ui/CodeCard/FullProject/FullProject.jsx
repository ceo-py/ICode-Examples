import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { linkIcons } from "../../../utils/Icons/linkIcons";

export function FullProject({ project, setDirs, dirs }) {
  const [items, setItems] = useState([]);

  const preViewsDir = () => {
    return {
      name: "..",
      key: crypto.randomUUID(),
      type: "dir",
    };
  };

  const showFiles = (obj) => {
    const keys = Object.keys(obj);

    if (obj?.files) {
      const files = obj?.files || [];
      const currentDirs = Object.keys(obj).filter((x) => x !== "files");
      obj = [...currentDirs, ...files];
    }

    const filesAndDir = keys[0]
      ? obj.map((x) => ({
          name: x?.fileName ? x.fileName : x,
          key: crypto.randomUUID(),
          type: x?.fileName ? "file" : "dir",
        }))
      : [];
    const output = [];
    dirs[0] ? output.push(preViewsDir()) : null;
    return [...output, ...filesAndDir];
  };

  const showFileStructure = () => {
    let isDir = dirs[0];
    let current = isDir ? project : Object.keys(project);
    dirs.forEach((key) => {
      if (current && current.hasOwnProperty(key)) {
        current = current[key];
      }
    });

    current = !isDir
      ? current.map((x) => ({ name: x, key: crypto.randomUUID(), type: "dir" }))
      : showFiles(current);

    if (!isDir && project?.files) {
      current = current.concat(showFiles(project.files));
    }
    setItems(current.filter((x) => x.name !== "files"));
  };

  const addDirectory = (dir) => {
    if (dir.type !== "dir") return;
    if (dir.name === "..") {
      setDirs(dirs.slice(0, -1));
      return;
    }
    setDirs([...dirs, dir.name]);
  };

  useEffect(() => {
    showFileStructure();
  }, [dirs]);

  return (
    <Table
      aria-label="table showing files and directories in the current directory"
      selectionMode="single"
      classNames={{
        wrapper: "justify-start",
      }}
    >
      <TableHeader>
        <TableColumn scope="col" key="Name" role="files or directories">
          Name
        </TableColumn>
      </TableHeader>
      <TableBody items={items} emptyContent={"Empty folder"}>
        {(item) => (
          <TableRow key={crypto.randomUUID()} className="cursor-pointer">
            <TableCell
              onClick={() => addDirectory(item)}
              className="flex gap-2 "
            >
              <Avatar
                alt=""
                className="w-8 h-7 bg-"
                src={linkIcons(item.type === "dir" ? "folder" : "file")}
              />
              <span
                className={`mt-auto ${item.name === ".." ? "text-2xl" : ""}`}
              >
                {item.name}
              </span>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
