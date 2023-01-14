import "bootstrap/dist/css/bootstrap.css";
import "select2";

import * as React from "react";

import { useEffect, useRef, useState } from "react";

import $ from "jquery";
import Loading from "./Loading";
import Tareas from "./Tareas";
import axios from "axios";

const Filtro = () => {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://api.clickup.com/api/v2/folder/"
      : "https://a00fb6e0-339c-4201-972f-503b9932d17a.remockly.com/folder/";

  const [Resultado, SetResultado] = useState(null);
  const [Filtros, setFiltro] = useState([]);
  const [Seleccionado, setSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams({ archived: "false" }).toString();
  const folderId = "121685777";
  const selectRef = useRef(null);

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
        setLoading(false);
      }
    }

    loadList();
  }, []);

  useEffect(() => {
    $(selectRef.current)
      .select2({
        data: Filtros,
        placeholder: "Seleccione Una Opcion",
      })
      .on("change", handleChangeFiltro);
  }, [Filtros]);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.addEventListener("change", handleChangeFiltro);
      return () => {
        selectRef.current.removeEventListener("change", handleChangeFiltro);
      };
    }
  }, []);

  const handleChangeFiltro = (event) => {
    console.log(event.target.value);
    setSeleccionado(event.target.value);
    console.log(Resultado);
    SetResultado(!Resultado);
    console.log(Resultado);
  };

  return (
    <>
      <div className="container">
        <div className="container">
          <div className="mt-5 m-auto w-100">
            {loading ? (
              <Loading />
            ) : (
              <select ref={selectRef}>
                <option value="" defaultValue>
                  Seleccione una opcion
                </option>
                {Filtros.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
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
