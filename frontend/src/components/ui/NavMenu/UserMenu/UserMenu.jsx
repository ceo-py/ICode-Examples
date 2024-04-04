import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useAuth } from "../../../../ContextGlobal/AuthContext";
import { LOGOUT_MUTATION } from "../../../../graphql/mutations/logOutMutation";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DropDownMenuIcon } from "../../DropDownMenuIcon/DropDownMenuIcon";
import serverError from "../../../utils/serverError/serverError";
import { Notifications } from "./Notifications/Notifications";
import ThemeSwitch, { changeThemeMode } from "../ThemeSwitch/ThemeSwitch";
import { selectedThemeSignal } from "../ThemeSwitch/ThemeSignal";
import { linkIcons } from "../../../utils/Icons/linkIcons";

export function UserMenu() {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [logout] = useMutation(LOGOUT_MUTATION);

  const handleLogout = () => {
    logout()
      .then(({ data }) => {
        if (data.logout.code === 200) {
          dispatch({ type: "LOGOUT" });
          navigate("/");
        }
      })
      .catch((error) => {
        serverError();
      });
  };

  return (
    <>
      <Notifications />
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            className="ring-default w-5 custom-sm:w-8 h-5 custom-sm:h-8"
            as="button"
            isBordered
            size="sm"
            showFallback
            src={state.iconUrl}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="user" className="h-14 gap-2" textValue="Details">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{state.username}</p>
          </DropdownItem>
          <DropdownItem
            key="home"
            onPress={() => {
              navigate(`/user?name=${state.username}`);
            }}
            startContent={
              <DropDownMenuIcon
                alt={"home"}
                src={"https://www.svgrepo.com/show/418081/home.svg"}
              />
            }
          >
            Home
          </DropdownItem>
          <DropdownItem
            key="upload"
            onPress={() => {
              navigate("/upload");
            }}
            startContent={
              <DropDownMenuIcon
                alt={"upload"}
                src={"https://www.svgrepo.com/show/418110/send.svg"}
              />
            }
          >
            Upload
          </DropdownItem>
          <DropdownItem
            key="profile"
            onPress={() => {
              navigate("/profile");
            }}
            startContent={
              <DropDownMenuIcon
                alt={"profile"}
                src={"https://www.svgrepo.com/show/418085/setting.svg"}
              />
            }
          >
            Profile
          </DropdownItem>
          <DropdownItem
            key="theme switch"
            onPress={() => {
              changeThemeMode();
            }}
            startContent={
              <DropDownMenuIcon
                alt={"profile"}
                src={`${
                  selectedThemeSignal.value === "dark"
                    ? linkIcons("moon")
                    : linkIcons("sun")
                }`}
              />
            }
          >
            {`Appearance: ${
              selectedThemeSignal.value === "dark" ? "Dark" : "Light"
            }`}
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onPress={() => {
              handleLogout();
            }}
            startContent={
              <DropDownMenuIcon
                alt={"logout"}
                src={"https://www.svgrepo.com/show/418030/turn-off.svg"}
              />
            }
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
