import { Avatar, AvatarGroup } from "@nextui-org/react";
import { linkIcons } from "../../../../utils/Icons/linkIcons";
import { useAuth } from "../../../../../AuthContext/AuthContext";
import { FOLLOW_USER_MUTATION } from "../../../../../graphql/mutations/followUser";
import { useMutation } from "@apollo/client";
import serverError from "../../../../utils/serverError/serverError";
import { useNavigate } from "react-router-dom";
import { GET_USER_HOME_DETAILS } from "../../../../../graphql/queries/userHomeQuery";

export function SocialMediaLinks({
  youtube,
  github,
  linkedin,
  username,
  userId,
  follower,
}) {
  const { state } = useAuth();
  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    refetchQueries: [
      {
        query: GET_USER_HOME_DETAILS,
        variables: {
          input: {
            username,
          },
        },
      },
    ],
  });

  const navigate = useNavigate();

  const handleFollowUser = async (id) => {
    if (!state.isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      const { data } = await followUser({
        variables: { input: { id } },
      });
    } catch (error) {
      serverError();
    }
  };

  const openWebsite = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <AvatarGroup>
        {youtube && (
          <Avatar
            classNames={{
              base: "bg- cursor-pointer",
            }}
            src={linkIcons("youTube")}
            onClick={() => openWebsite(youtube)}
          />
        )}
        {github && (
          <Avatar
            classNames={{
              base: "bg- cursor-pointer",
            }}
            src={linkIcons("gitHub")}
            onClick={() => openWebsite(github)}
          />
        )}
        {linkedin && (
          <Avatar
            classNames={{
              base: "bg- cursor-pointer",
            }}
            src={linkIcons("linkedIn")}
            onClick={() => openWebsite(linkedin)}
          />
        )}
        {state?.username !== username && (
          <Avatar
            classNames={{
              base: "bg- cursor-pointer",
            }}
            color="success"
            isBordered={follower}
            src={"https://www.svgrepo.com/show/418021/user-plus.svg"}
            onClick={() => handleFollowUser(userId)}
          />
        )}

        {/* {github && (
          <About about={about} />
        )} */}
      </AvatarGroup>
    </>
  );
}
