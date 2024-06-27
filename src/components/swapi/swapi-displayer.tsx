"use client";

import SwapiFilms from "./menus/swapi-films";
import SwapiNotImplementedMenu from "./menus/swapi-notimplemented";
import SwapiPeople from "./menus/swapi-people";

import { IDictionaryContent } from "@/interfaces/main";

export default function SwapiDisplayer(props: { menu: IDictionaryContent }) {
  const { menu } = props;

  switch (menu.key) {
    case "people":
      return <SwapiPeople data={menu} />;
   
    case "films":
      return <SwapiFilms data={menu} />;
    case "species":
    default:
      return <SwapiNotImplementedMenu />;
  }
}
