import axios from "axios";
import React, { useEffect, useState } from "react";
import { Page } from "../page";
import Alert from "@mui/material/Alert";
import traverse from "traverse";
export interface props {
  graphQL: any;
}

const API_ENPOINT = process.env.REACT_APP_API_ENDPOINT;
export const GraphQL = ({ graphQL }: props) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<any>(false);
  useEffect(() => {
    // prepare the graph data
    (async () => {
      try {
        var vars = {};
        if (graphQL.variables && graphQL.variables.trim().length > 1) {
          vars = eval(graphQL.variables);
        }
        const response = await axios.post(graphQL.url, {
          query: graphQL.query,
          variables: vars,
        });

        setShow(true);
        setError(false);
        const graph = response.data.data;
        traverse(graph).forEach(function (x: any) {
          if (x.indexOf("graph.")) {
            this.update(eval(x));
          }
        });
      } catch (error) {
        setError(error);
      }
    })();
  }, [graphQL]);
  console.log(error);
  return (
    <>
      {show && (
        <>
          <Page page={graphQL.page} />
        </>
      )}
      {error && (
        <Alert sx={{ m: 2 }} severity="error">
          {error.message}
        </Alert>
      )}
    </>
  );
};
