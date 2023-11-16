import React from "react";
import Icon from "../../../assets/Icon.svg";
import {
  Navbar,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

export function NavMenu() {
  return (
    <Navbar isBordered maxWidth="2xl">
      <NavbarContent data-justify="between" className="gap- hidden sm:flex">
        <Avatar
          alt="search icon"
          src={Icon}
          classNames={{
            base: "bg- text-default- rounded-",
            img: "object-contain",
          }}
        />
        <p className="flex hidden sm:block font-bold text-inherit">ICode Example</p>
      </NavbarContent>

      <NavbarContent>
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[50rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search Task..."
          size="sm"
          startContent={
            <Avatar
              alt="search icon"
              className="w-8 h-8 bg-"
              src="https://www.svgrepo.com/show/418086/search.svg"
            />
          }
          type="search"
        />
        <Avatar
          as="button"
          className="transition-transform bg-"
          size="xl"
          isDisabled=""
          src="https://www.svgrepo.com/show/418014/programming.svg"
        />
        <Avatar
          as="button"
          className="transition-transform bg-"
          size="xl"
          isDisabled=""
          src="https://www.svgrepo.com/show/418016/play-1.svg"
        />
      </NavbarContent>
      <NavbarContent data-justify="between">
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
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
