import { GetPopulationChip, ModalPlanet } from "@/app/functions/planets";
import { TableFooter, TableHeader } from "@/app/functions/table";
import { IDictionaryContent } from "@/interfaces/main";
import { ISwapiPlanet, ISwapiPlanets } from "@/interfaces/swapi";
import { EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SwapiPlanets(props: { data: IDictionaryContent }) {
  const { data } = props;

  const [swapiPlanets, setSwapiPlanets] = useState<ISwapiPlanets>();
  const [apiRequest, setApiRequest] = useState<string>(data.value);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<string>("1");
  const [modalInfos, setModalInfos] = useState<ISwapiPlanet | undefined>();

  useEffect(() => {
    axios
      .get<ISwapiPlanets>(apiRequest)
      .then(function (response) {
        setSwapiPlanets(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apiRequest]);

  useEffect(() => {
    if (swapiPlanets) {
      var numberPages: number = swapiPlanets?.count / 10;

      setMaxPage(
        numberPages % 1 === 0
          ? numberPages.toString()
          : (numberPages + 1).toFixed(0)
      );
    }
  }, [swapiPlanets]);

  const prevPage = () => {
    if (swapiPlanets && swapiPlanets?.previous) {
      setSwapiPlanets(undefined);
      setApiRequest(swapiPlanets.previous);
      setCurrentPageNumber((prevNumber) => prevNumber - 1);
    }
  };

  const nextPage = () => {
    if (swapiPlanets && swapiPlanets?.next) {
      setSwapiPlanets(undefined);
      setApiRequest(swapiPlanets.next);
      setCurrentPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  const totalPages = (numberItems: number) => {
    var numberPages = numberItems / 10;
    return numberPages % 1 === 0 ? numberPages : (numberPages + 1).toFixed(0);
  };

  return (
    <>
      {modalInfos && (
        <ModalPlanet fSetterInfos={setModalInfos} infos={modalInfos} />
      )}
      <>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <TableHeader
            headers={[
              "Name",
              "Climate",
              "Gravity",
              "Terrain",
              "Population",
              "Full infos",
            ]}
          />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {swapiPlanets
              ? swapiPlanets.results &&
                swapiPlanets.results.map((planet, index) => {
                  return (
                    <tr className="hover:bg-gray-50" key={index}>
                      <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="font-medium text-gray-700">
                          {planet.name}
                        </div>
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">
                          {planet.climate}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full border-gray-600 px-2 py-1 text-xs font-semibold text-gray-600">
                          {planet.gravity}
                        </span>
                      </td>
                      <td className="px-6 py-4">{planet.terrain}</td>
                      <td className="px-6 py-4">
                        {GetPopulationChip(planet.population)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">
                          <a
                            onClick={() =>
                              setModalInfos(swapiPlanets.results[index])
                            }
                            className="cursor-pointer"
                          >
                            <EyeIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : Array.from({ length: 10 }, (_, index) => (
                  <tr className="hover:bg-gray-50" key={index}>
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="animate-pulse bg-gray-200 h-6 w-40"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-4">
                        <a className="cursor-wait">
                          <EyeIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <TableFooter
          fPrevPage={() => prevPage()}
          fNextPage={() => nextPage()}
          currentPage={currentPageNumber}
          numberPages={maxPage}
        />
      </>
    </>
  );
}
