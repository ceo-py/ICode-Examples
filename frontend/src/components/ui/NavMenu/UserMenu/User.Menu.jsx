import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useAuth } from "../../../../AuthContext/AuthContext";
import { LOGOUT_MUTATION } from "../../../../graphql/mutations/logOutMutation";
import { useMutation, useQuery } from "@apollo/client";
import { NAV_MENU_QUERY } from "../../../../graphql/queries/navMenuQuery";
import { useEffect, useState } from "react";

export function UserMenu() {
  const { dispatch } = useAuth();
  const { data, refetch } = useQuery(NAV_MENU_QUERY);
  const [username, setUsername] = useState("");
  const [icon, setIcon] = useState("");

  const [logout] = useMutation(LOGOUT_MUTATION);

  useEffect(() => {
    if (data && data.getUser.userDetails) {
      setUsername(data.getUser.userDetails.username);
      setIcon(data.getUser.userDetails.icon);
    }
  }, [data]);

  const handleLogout = () => {
    logout()
      .then(({ data }) => {
        if (data.logout.code === 200) {
          dispatch({ type: "LOGOUT" });
        }
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
      });
  };
  refetch();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          className="ring-default"
          isBordered
          as="button"
          size="sm"
          src={icon ? icon : "https://www.svgrepo.com/show/418032/user.svg"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="Details">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{username}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={() => {
            handleLogout();
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
