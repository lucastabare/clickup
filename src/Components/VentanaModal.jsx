import React, { useEffect, useState } from "react";

import { Badge } from "@chakra-ui/react";
import axios from "axios";
import styled from "styled-components";

const VentanaModal = ({ Modal, SetModal, Data }) => {
  const [Comment, SetComment] = useState([]);
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://api.clickup.com/api/v2/task/"
      : "https://a00fb6e0-339c-4201-972f-503b9932d17a.remockly.com/folder/";

  async function getComment() {
    try {
      const response = await axios({
        url: `${baseUrl}${Data.id}/comment?`,
        method: "GET",
        headers: {
          Authorization: "pk_49672506_V0621PT86LKNHBNGNSU536XZ3OKXHBLC",
        },
      });
      console.log(response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function loadComment() {
      const response = await getComment();
      if (response) {
        SetComment(response.data.comments);
        console.log(Comment);
      }
    }
    if (Data.id != null && Data.id != undefined) {
      loadComment();
    }
  }, [Modal]);

  return (
    <>
      {Modal && (
        <Overlay>
          <ContenedorModal>
            <EncabezadoModal>
              <h3>
                #{Data.id}-{Data.name}
              </h3>
              {/* <Badge>{Data.tags}</Badge> */}
            </EncabezadoModal>
            <BotonCerrar onClick={() => SetModal(!Modal)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </BotonCerrar>
            <Contenido>
              <h3>Description</h3>
              <p>{Data.description}</p>
              <a href={Data.url} target="_blank">
                {Data.url}
              </a>

              <h3>Comentario</h3>
              <p>{Comment.map((item) => item.comment_text)}</p>

              {/* <button>Cerrar</button> */}
            </Contenido>
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default VentanaModal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ContenedorModal = styled.div`
  width: 600px;
  min-height: 100px;
  max-height: 80vh;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;

  h3 {
    font-weight: 500;
    font-size: 20px;
    color: #1766dc;
  }
`;

const BotonCerrar = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.3 ease all;
  border-radius: 5px;
  color: #1766dc;

  &:hover {
    background: #f2f2f2;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Contenido = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 500px;

  h3 {
    font-size: 25px;
    font-weight: 700;
    margin: 10px 0 10px 0;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;
    margin-right: 20px;
  }

  button {
    width: 100px;
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
`;
