import {Tabs, Tab, Chip} from "@nextui-org/react";
import { DropDownMenuIcon } from "../DropDownMenuIcon/DropDownMenuIcon";
import { languageIcons } from "../../utils/languageIcons/languageIcons";


export default function Index() {
  return (
    <div className="flex items-center w-full flex-col">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        onSelectionChange={(e) => console.log(e)}
        classNames={{
          tabList: "sm:gap-10 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          key="Python"
          title={
            <div className="flex items-center space-x-2">
              <DropDownMenuIcon alt="Python" src={languageIcons("Python")} />
              <span>Python</span>
              {/* <Chip size="sm" variant="faded">9</Chip> */}
            </div>
          }
        />
        <Tab
          key="JavaScript"
          title={
            <div className="flex items-center space-x-2">
              <DropDownMenuIcon alt="JavaScript" src={languageIcons("JavaScript")} />
              <span>JavaScript</span>
              {/* <Chip size="sm" variant="faded">3</Chip> */}
            </div>
          }
        />
        <Tab
          key="C#"
          title={
            <div className="flex items-center space-x-2">
              <DropDownMenuIcon alt="C#" src={languageIcons("C#")} />
              <span>C#</span>
              {/* <Chip size="sm" variant="faded">1</Chip> */}
            </div>
          }
        />
                <Tab
          key="Java"
          title={
            <div className="flex items-center space-x-2">
              <DropDownMenuIcon alt="Java#" src={languageIcons("Java")} />
              <span>Java</span>
              {/* <Chip size="sm" variant="faded">1</Chip> */}
            </div>
          }
        />
      </Tabs>
    </div>  
  );
}
