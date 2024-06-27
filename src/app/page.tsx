"use client";
import Navbar from "@/components/general/navbar";
import SwapiDisplayer from "@/components/swapi/swapi-displayer";
import SwapiMenus from "@/components/swapi/swapi-menu";
import { IDictionaryContent } from "@/interfaces/main";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [swapiMenus, setSwapiMenus] = useState<IDictionaryContent[]>();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    axios
      .get<Record<string, string>>(`https://swapi.dev/api/`)
      .then(function (response) {
        var mappedDictionary: IDictionaryContent[] = Object.entries(
          response.data
        ).map(([key, value]) => {
          return {
            key,
            value,
          };
        });
        setSwapiMenus(mappedDictionary);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const changeIndex = (number: number) => {
    if (number >= 0 && number < swapiMenus!.length) {
      setIndex(number);
    }
  };

  return (
    <>
      <Navbar />
      {swapiMenus ? (
        <main className="flex min-h-screen flex-col items-center p-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-10"
          >
            <div className="blur-[106px] h-80 bg-gradient-to-br from-blue-400 to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-64 bg-gradient-to-r from-purple-400 to-cyan-300 dark:to-indigo-600"></div>
          </div>
          <SwapiMenus
            menus={swapiMenus}
            indexChanger={changeIndex}
            selectedIndex={index}
          />
          <SwapiDisplayer menu={swapiMenus[index]} />
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center bg-indigo-500 justify-center">
          <h1>loading</h1>
        </main>
      )}
    </>
  );
}
