import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Grid from "@mui/material/Grid";
import { ContentEdit } from "../content.edit";
import Box from "@mui/material/Box";
import { useDelayFire } from "../hooks/delayFire";

export interface props {
  content: any;
  setContentCB: Function;
  fileHandlerCB: Function;
}

export const Rest = ({ content, setContentCB, fileHandlerCB }: props) => {
  const { delayFire, _props, set_props } = useDelayFire(content);
  useEffect(() => {
    set_props(content);
  }, [content]);

  useEffect(() => {
    if (!content.page) {
      var _content = { ...content };
      _content = {
        page: {
          content: [],
        },
      };
      setContentCB(_content);
    }
  }, []);
  return (
    <>
      <>
        <Grid container>
          <Grid item sm={12}>
            <TextField
              id="url"
              label="End Point"
              sx={{ width: "100%", pb: 1 }}
              onChange={(event: any) => {
                delayFire("url", event.target.value, () => {
                  const _content = { ...content };
                  _content.url = event.target.value;
                  setContentCB(_content);
                });
              }}
            />
          </Grid>

          <Grid item sm={12}>
            <TextField
              id="formData"
              label="formData"
              multiline
              sx={{ width: "100%" }}
              onChange={(event: any) => {
                delayFire("formData", event.target.value, () => {
                  const _content = { ...content };
                  _content.variables = event.target.value;
                  setContentCB(_content);
                });
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            pl: 1,
            pr: 1,
            mt: 1,
            backgroundColor: "#f8fbff",
            borderRadius: 2,
          }}
        >
          <ContentEdit
            page={content.page}
            setPageCB={(_page: any) => {
              const _content = { ...content };
              _content.page = _page;
              setContentCB(_content);
            }}
            fileHandlerCB={async (_file: any) => {
              const fileName = await fileHandlerCB(_file);

              return fileName;
            }}
          />
        </Box>
      </>
    </>
  );
};
