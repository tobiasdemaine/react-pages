import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ContentEdit } from "../content.edit";
import Box from "@mui/material/Box";
export interface props {
  content: any;
  setContentCB: Function;
  fileHandlerCB: Function;
}

export const TimedDisplay = ({
  content,
  setContentCB,
  fileHandlerCB,
}: props) => {
  const newTimedDisplay = () => {
    var _content = { ...content };
    _content = {
      start: Date.now(),
      end: Date.now() + 3600 * 1000 * 24,
      timeZone: "AEST",
      page: {
        content: [],
      },
    };
    setContentCB(_content);
  };
  useEffect(() => {
    if (!content.page) {
      newTimedDisplay();
    }
  }, []);
  return (
    <>
      {content?.page && (
        <>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              label="start"
              value={content.start}
              onChange={(newValue: Date | null) => {
                var _content = { ...content };
                var dt = String(newValue).split(" ").slice(1, 5);
                _content.start = new Date(String(dt.join(" "))).getTime();

                setContentCB(_content);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            &nbsp;
            <DateTimePicker
              label="End"
              value={content.end}
              onChange={(newValue: Date | null) => {
                var _content = { ...content };
                var dt = String(newValue).split(" ").slice(1, 5);
                _content.end = new Date(String(dt.join(" "))).getTime();
                setContentCB(_content);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
      )}
    </>
  );
};
