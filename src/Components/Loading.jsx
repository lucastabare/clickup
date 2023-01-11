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
  height: 90vh;
  width: 90vw;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;
