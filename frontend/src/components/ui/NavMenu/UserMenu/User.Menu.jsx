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
import { useNavigate } from "react-router-dom";


export function UserMenu() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT_MUTATION);

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

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          className="ring-default"
          isBordered
          as="button"
          size="sm"
          src={state.iconUrl ? state.iconUrl : "https://www.svgrepo.com/show/418032/user.svg"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="Details">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{state.username}</p>
        </DropdownItem>
        <DropdownItem
          key="settings"
          onPress={() => {
            navigate('/profile');
          }}
        >
          My Settings
        </DropdownItem>
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
