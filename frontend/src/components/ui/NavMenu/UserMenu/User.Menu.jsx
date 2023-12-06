import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useAuth } from "../../../../AuthContext/AuthContext";
import { LOGOUT_MUTATION } from "../../../../graphql/mutations/logOutMutation";
import { useMutation } from "@apollo/client";


export function UserMenu() {
  const { state, dispatch } = useAuth();

  const [logout] = useMutation(LOGOUT_MUTATION);

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      if (data.logout.code === 200) {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="Details">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">test@test.com</p>
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
          onPress={() => handleLogout()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
