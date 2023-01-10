import React from "react";
import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Tareas = ({ Resultado, Seleccionado }) => {
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

  const listId = "124";

  const [Tareas, SetTareas] = useState([{}]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: "pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC",
  };

  const fetchDataTaks = async () => {
    const resp = await fetch(URL + `${listId}/task?${query}`, {
      headers,
    });

    if (!resp.ok) {
      console.log(resp.url);
    } else {
      console.log(resp);
      return resp.json();
    }
  };

  useEffect(() => {
    if (Resultado) {
      fetchDataTaks()
        .then((resp) => {
          SetTareas(resp.tasks);
          console.log(Tareas.tasks);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, [Resultado]);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {Tareas != null
        ? Tareas.map((item) => {
            <Card>
              <CardHeader>
                <Heading size="md">
                  {item.id}
                  {item.name}
                </Heading>
                <Badge ml="1" fontSize="0.8em" colorScheme="green">
                  {item.tags}
                </Badge>
              </CardHeader>
              <CardBody>
                <Text>{item.description}</Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>;
          })
        : "No hay tarjetas"}
    </SimpleGrid>
  );
};

export default Tareas;
