import { Avatar, AvatarGroup } from "@nextui-org/react";
import { linkIcons } from "../../../../utils/Icons/linkIcons";

export function SocialMediaLinks({ youtube, github, linkedin }) {
  const openWebsite = (url) => {
    window.open(url, "_blank");
  };
  return (
    <AvatarGroup>
      <Avatar
        classNames={{
          base: "bg- cursor-pointer",
        }}
        src={linkIcons("youTube")}
        onClick={() => openWebsite(youtube)}
      />
      <Avatar
        classNames={{
          base: "bg- cursor-pointer",
        }}
        src={linkIcons("gitHub")}
        onClick={() => openWebsite(github)}
      />
      <Avatar
        classNames={{
          base: "bg- cursor-pointer",
        }}
        src={linkIcons("linkedIn")}
        onClick={() => openWebsite(linkedin)}
      />
    </AvatarGroup>
  );
}
