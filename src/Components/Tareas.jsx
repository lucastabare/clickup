/* eslint-disable array-callback-return */
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
const Tareas = (props) => {
  var URL;
  if (window.location.href !== "http://localhost:3000/") {
    URL = "https://api.clickup.com/api/v2/list/";
  } else {
    URL = "https://a00fb6e0-339c-4201-972f-503b9932d17a.remockly.com/list/";
  }

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

  const listId = props.Seleccionado;

  const [Tareas, SetTareas] = useState();
  
  useEffect(() => {
    if (props.Resultado) {
      axios
      .get(URL + `${listId}/task?${query}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC`,
        },
      })
      .then((result) => SetTareas(result.data))
      .catch((error) => console.log(error));
     }
  }, [props.Resultado]);

  console.log(Tareas[0].tasks)

  return (
    <>
      {/* {Tareas.map((item, index) => {
        <Card sx={{ minWidth: 275 }} key={index}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              <h3>{item}</h3>
              {item.id}
            </Typography>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">{item.description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Ver mas</Button>
          </CardActions>
        </Card>;
      })} */}
    </>
  );
};

export default Tareas;
