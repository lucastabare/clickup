import * as React from "react";

import { useEffect, useState } from "react";

import axios from "axios";

const Tareas = ({ Seleccionado, Resultado }) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.clickup.com/api/v2/list/"
      : "https://a00fb6e0-339c-4201-972f-503b9932d17a.remockly.com/list/";

  const query = new URLSearchParams({
    archived: "false",
    page: "0",
    order_by: "string",
    reverse: "true",
    subtasks: "true",
    statuses: "string",
    include_closed: "true",
    assignees: "string",
    tags: "string",
    due_date_gt: "0",
    due_date_lt: "0",
    date_created_gt: "0",
    date_created_lt: "0",
    date_updated_gt: "0",
    date_updated_lt: "0",
    custom_fields: "string",
  }).toString();

  const [Tarea, SetTarea] = useState([{}]);
  const fetchDataTasks = async () => {
    const resp = await fetch(`${baseUrl}${Seleccionado}/task?${query}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC`,
      },
    });
    if (!resp.ok) {
      console.log(resp);
    } else {
      return resp.json();
    }
  };

  useEffect(() => {
    if (Resultado) {
      fetchDataTasks()
        .then((res) => {
          SetTarea(res[0].tasks);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [Resultado]);

  console.log(Tarea);

  return (
    <div>
      {Tarea.map((item, index) => {
        <h1 key={index}>{item.name}</h1>;
      })}
    </div>
  );
};

export default Tareas;
