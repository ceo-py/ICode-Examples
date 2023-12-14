import {Tabs, Tab, Chip} from "@nextui-org/react";


export default function Index() {
  return (
    <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              {/* <GalleryIcon/> */}
              <span>Photos</span>
              <Chip size="sm" variant="faded">9</Chip>
            </div>
          }
        />
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              {/* <MusicIcon/> */}
              <span>Music</span>
              <Chip size="sm" variant="faded">3</Chip>
            </div>
          }
        />
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              {/* <VideoIcon/> */}
              <span>Videos</span>
              <Chip size="sm" variant="faded">1</Chip>
            </div>
          }
        />
      </Tabs>
    </div>  
  );
}
