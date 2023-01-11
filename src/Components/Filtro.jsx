import "bootstrap/dist/css/bootstrap.css";

import * as React from "react";

import { useEffect, useState } from "react";

import Tareas from "./Tareas";
import axios from "axios";

const Filtro = () => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.clickup.com/api/v2/folder/"
      : "https://a00fb6e0-339c-4201-972f-503b9932d17a.remockly.com/folder/";

  const [Resultado, SetResultado] = useState(false);
  const [Filtros, setFiltro] = useState([]);
  const [Seleccionado, setSeleccionado] = useState(null);
  const query = new URLSearchParams({ archived: "false" }).toString();
  const folderId = "121685777";

  async function getList() {
    try {
      const response = await axios({
        url: `${baseUrl}${folderId}/list?${query}`,
        method: "GET",
        headers: {
          Authorization: "pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC",
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function loadList() {
      const response = await getList();
      if (response.status === 200) {
        setFiltro(response.data.lists);
      }
    }

    loadList();
  }, []);

  const handleChangeFiltro = (event) => {
    setSeleccionado(event.target.value);
    SetResultado(true);
  };

  return (
    <>
      <div className="container">
        <div className="container">
          <div className="mt-5 m-auto w-50">
            <select
              className="form-select"
              aria-label="Seleccione sprint"
              placeholder="Seleccione sprint"
              onChange={handleChangeFiltro}
            >
              <option defaultValue>Seleccione sprint</option>
              {Filtros.map((item, idx) => (
                <option key={idx} value={item.id}>
                  {item.name}-
                  {new Date(item.start_date * 1000).toLocaleDateString(
                    "es-ES",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {Resultado ? (
        <Tareas Seleccionado={Seleccionado} Resultado={Resultado} />
      ) : null}
    </>
  );
};

export default Filtro;
