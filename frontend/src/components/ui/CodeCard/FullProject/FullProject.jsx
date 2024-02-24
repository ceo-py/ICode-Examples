import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export function FullProject({ project, setDirs, dirs }) {
  const showFileStructure = (dirs) => {
    let current = Object.keys(project);
    dirs.forEach((key) => {
      if (current && current.hasOwnProperty(key)) {
        current = current[key];
      }
    });
    
    return current.map((x, i) => ({"name":x, "key":i}));
  };


  const addDirectory = (dir) => {
    setDirs([...dirs, dir])
  }
  return (
    <Table
      aria-label="table with client side pagination"
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
      <TableBody items={showFileStructure(dirs)} emptyContent={"Empty folder"}>
        {(item) => (
          <TableRow key={crypto.randomUUID()} className="cursor-pointer">
            <TableCell onClick={() => addDirectory(item.name)}>{item.name}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
