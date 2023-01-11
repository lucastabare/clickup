import * as React from "react";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Loading from "./Loading";
import Typography from "@mui/material/Typography";
import VentanaModal from "./VentanaModal";
import axios from "axios";

const Tareas = ({ Seleccionado, Resultado }) => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://api.clickup.com/api/v2/list/"
      : "https://a00fb6e0-339c-4201-972f-503b9932d17a.remockly.com/list/";

  const [Tarea, SetTarea] = useState({});
  const [IsLoading, SetLoading] = useState(true);
  const [Modal, SetModal] = useState(false);
  const [Data, SetData] = useState({});

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

  async function getTaks() {
    try {
      const response = await axios({
        url: `${baseUrl}${Seleccionado}/task?${query}`,
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: "pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC",
        },
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (Resultado) {
      async function loadTaks() {
        const response = await getTaks();
        console.log(response.data[0].tasks);
        if (response.status === 200) {
          SetLoading(!IsLoading);
          SetTarea(response.data);
        }
      }

      loadTaks();
    }
  }, [Resultado]);

  return IsLoading ? (
    <Loading />
  ) : (
    <div className="col-md-12 d-flex mt-4">
      {Tarea[0].tasks.map((item, idx) => (
        <Card sx={{ width: 250, marginX: 1 }} key={idx}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              #{item.id}
            </Typography>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {item.tags}
            </Typography>
            <Typography variant="body2">{item.description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                SetData({
                  id: item.id,
                  name: item.name,
                  description: item.text_content,
                  url: item.url,
                  tags: item.tags,
                }),
                  SetModal(!Modal);
              }}
              size="small"
            >
              Ver Mas
            </Button>
          </CardActions>
        </Card>
      ))}

      <VentanaModal Modal={Modal} SetModal={SetModal} Data={Data} />
    </div>
  );
};

export default Tareas;
