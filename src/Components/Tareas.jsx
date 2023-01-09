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

const Tareas = ({ Seleccionado }) => {
  var URL;
  if (window.location.href !== "http://localhost:3000/") {
    URL = "https://api.clickup.com/api/v2/list/";
  } else {
    URL = "https://a00fb6e0-339c-4201-972f-503b9932d17a.remockly.com/list/";
  }

  //const [Seleccionado, setSeleccionado] = useState(null);
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

  const listId = Seleccionado;

  const [Tareas, SetTareas] = useState([{}]);

  const fetchDataTaks = async () => {
    const resp = await fetch(URL + `/${listId}/task?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC",
      },
    });
    if (!resp.ok) {
    } else {
      return resp.json();
    }
  };

  useEffect(() => {
    fetchDataTaks()
      .then((res) => {
        SetTareas(res.tasks);
      })
      .catch((e) => {
        console.log(e.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Seleccionado]);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {Tareas.map((item) => {
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
      })}
    </SimpleGrid>
  );
};

export default Tareas;
