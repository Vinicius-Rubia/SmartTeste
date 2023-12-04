import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import transition from "../../utils/transition";
import * as C from "./styles";

const menu = [
  {
    url: "/welcome",
    title: "Início",
  },
  {
    url: "/chat",
    title: "Chat",
  },
  {
    url: "/context",
    title: "Contexto",
  },
];

const lastItem = menu.length - 1;

const Menu: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <C.Trigger aria-label="Menu Options">
          <IoMenuSharp className="text-3xl" />
        </C.Trigger>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <C.MenuContent>
          {menu.map((menuItem, index) => (
            <Link to={menuItem.url} key={index}>
              <C.MenuItem className={`${index === lastItem && "border-none"}`}>
                {menuItem.title}
              </C.MenuItem>
            </Link>
          ))}
        </C.MenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default transition(Menu);
