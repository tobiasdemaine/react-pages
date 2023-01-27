import axios from "axios";
import React, { useEffect, useState } from "react";
import { Page } from "../page";
import Alert from "@mui/material/Alert";
import traverse from "traverse";
export interface props {
  rest: any;
}

export const Rest = ({ rest }: props) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState<any>(false);
  useEffect(() => {
    // prepare the _rest data
    (async () => {
      try {
        var response;
        if (rest.formData && rest.formData.trim().length > 1) {
          response = await axios.post(rest.url, eval(rest.formData));
        } else {
          response = await axios.get(rest.url);
        }
        setShow(true);
        setError(false);
        const _rest = response.data;
        traverse(_rest).forEach(function (x: any) {
          if (x.indexOf("rest.")) {
            this.update(eval(x));
          }
        });
      } catch (error) {
        setError(error);
      }
    })();
  }, [rest]);
  console.log(error);
  return (
    <>
      {show && (
        <>
          <Page page={rest.page} />
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
