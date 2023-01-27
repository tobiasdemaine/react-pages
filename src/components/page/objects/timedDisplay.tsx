import React, { useEffect, useState } from "react";
import { Page } from "../page";

export interface props {
  timedDisplay: any;
}

export const TimedDisplay = ({ timedDisplay }: props) => {
  const [time, setTime] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (timedDisplay.forced) {
      setTime(timedDisplay.forced);
    } else {
      setTime(Date.now());
    }
  }, [JSON.stringify(timedDisplay)]);

  useEffect(() => {
    if (time > timedDisplay.start && time < timedDisplay.end) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [time]);

  return (
    <>
      {show && (
        <>
          <Page page={timedDisplay.page} />
        </>
      )}
    </>
  );
};
