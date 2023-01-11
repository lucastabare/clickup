import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Spinner } from "reactstrap";
import styled from "styled-components";

const Loading = () => {
  return (
    <>
      <ContenedorSpinner>
        <Spinner color="primary" />
      </ContenedorSpinner>
    </>
  );
};

export default Loading;

const ContenedorSpinner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-content: center;
`;
