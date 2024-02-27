import {
  Avatar,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { linkIcons } from "../../../utils/Icons/linkIcons";
import { useSearchParams } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { PROJECT_FILE_QUERY } from "../../../../graphql/queries/getProjectFile";
import serverError from "../../../utils/serverError/serverError";
import { CodeSnippet } from "../CodeSnippet/CodeSnippet";
import { LoadingCircle } from "../../LoadingCIrcle/LoadingCircle";

export function FullProject({ project, setDirs, dirs, navigate }) {
  const [projectFile, { loading, data }] = useLazyQuery(PROJECT_FILE_QUERY);
  const [items, setItems] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [url, setUrl] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!fileUrl) return;
    try {
      projectFile({
        variables: {
          input: {
            url: fileUrl,
          },
        },
      });
    } catch (error) {
      serverError();
    }
  }, [fileUrl]);

  const taskDetails = (task) => {
    navigate(`${url}${addCurrentDirToUrl()}&file=${task.name}`);
    setDirs((currentItems) => [...currentItems, task.name]);
  };

  const addCurrentDirToUrl = () => {
    return dirs[0] ? `&dir=${dirs.join("-")}` : "";
  };

  const preViewsDir = () => {
    return {
      name: "..",
      key: crypto.randomUUID(),
      type: "dir",
    };
  };

  const showFiles = (obj) => {
    const keys = Object.keys(obj);
    let filesAndDir = [];
    if (obj?.files) {
      const files = obj.files || [];
      const currentDirs = Object.keys(obj).filter((x) => x !== "files");
      obj = [...currentDirs, ...files];
    }

    try {
      filesAndDir = keys[0]
        ? obj.map((x) => ({
            name: x?.fileName ? x.fileName : x,
            key: crypto.randomUUID(),
            url: x.filePath,
            type: x?.fileName ? "file" : "dir",
          }))
        : [];
    } catch {
      filesAndDir = Object.keys(obj).map((x) => ({
        name: x,
        key: crypto.randomUUID(),
        type: "dir",
      }));
    }
    const output = [];
    dirs[0] ? output.push(preViewsDir()) : null;

    const foundFile = filesAndDir.find(
      (x) => x.name === searchParams.get("file")
    );

    if (foundFile) {
      setFileUrl(foundFile.url);
    }

    return [...output, ...filesAndDir];
  };

  const showFileStructure = () => {
    let isDir = dirs[0];
    let current = isDir ? project : Object.keys(project);
    const directories = isDir
      ? dirs
      : searchParams.get("dir")
      ? searchParams.get("dir").split("-")
      : [];
    directories.forEach((key) => {
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

  const navigateFilesAndDirs = (x) => {
    if (x.type === "file") {
      taskDetails(x);
      return;
    }
    navigate(url);
    addDirectory(x);
  };

  const addDirectory = (dir) => {
    if (dir.type !== "dir") return;
    if (dir.name === "..") {
      setDirs(dirs.slice(0, -1));
      return;
    }
    const currentDirPath = [...dirs, dir.name];
    setDirs(currentDirPath);
  };

  useEffect(() => {
    showFileStructure();
    let file = "";
    if (searchParams.get("file")) {
      file = `&file=${searchParams.get("file")}`;
    } else {
      setFileUrl(null);
    }
    if (url) navigate(url + addCurrentDirToUrl() + file);
  }, [dirs]);

  useEffect(() => {
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    const urlDir = searchParams.get("dir");
    const urlFile = searchParams.get("file");
    const dirs = urlDir ? urlDir.split("-") : [];

    setUrl(
      search.replace(`&dir=${urlDir}`, "").replace(`&file=${urlFile}`, "")
    );
    setDirs(dirs);
  }, []);

  console.log(data?.getTaskProjectFile?.content);
  console.log(fileUrl);

  return (
    <>
      {loading ? (
        <LoadingCircle />
      ) : fileUrl && data?.getTaskProjectFile?.content ? (
        <CardBody className="px-3 py-0 text-small text-default-400 bg-default/40">
          <CodeSnippet code={data.getTaskProjectFile.content} />
        </CardBody>
      ) : (
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
                  onClick={() => navigateFilesAndDirs(item)}
                  className="flex gap-2 "
                >
                  <Avatar
                    alt=""
                    className="w-8 h-7 bg-"
                    src={linkIcons(item.type === "dir" ? "folder" : "file")}
                  />
                  <span
                    className={`mt-auto ${
                      item.name === ".." ? "text-2xl" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
