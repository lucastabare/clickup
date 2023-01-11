import "bootstrap/dist/css/bootstrap.css";

import * as React from "react";

import { useEffect, useState } from "react";

import Select from "react-select";
import Tareas from "./Tareas";

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

  const fetchDataList = async () => {
    const resp = await fetch(`${baseUrl}${folderId}/list?${query}`, {
      method: "GET",
      headers: {
        Authorization: "pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC",
      },
    });
    if (!resp.ok) {
      console.log(resp);
    } else {
      return resp.json();
    }
  };

  useEffect(() => {
    fetchDataList()
      .then((res) => {
        setFiltro(res.lists);
        console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const handleChangeFiltro = (selectedOption) => {
    setSeleccionado(selectedOption.value);
    SetResultado(true);
  };

  var options = [];
  Filtros.map((item) => {
    options = [
      {
        value: item.id,
        label:
          item.name +
          " " +
          new Date(item.start_date).toLocaleString().split(",")[0],
      },
    ];
  });

  return (
    <>
      <div className="container">
        <div className="container">
          <div className="mt-5 m-auto w-50">
            <Select
              options={options}
              onChange={handleChangeFiltro}
              autoFocus={true}
            />
          </div>
        </div>
      </div>
      <Tareas Seleccionado={Seleccionado} Resultado={Resultado} />
    </>
  );
};

export default Filtro;
