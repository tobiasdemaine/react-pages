import React, { useEffect, useRef } from "react";

export interface zoneProps {
  iframe: any;
}
const API_ENPOINT = process.env.REACT_APP_API_ENDPOINT;
export const Iframe = ({ iframe }: zoneProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const recurseForAppWindow = (element: any, origElement: any) => {
    var reduce = iframe.reduceHeight ? iframe.reduceHeight : 0;
    if (element.parentElement?.id === "AppWindow") {
      origElement.width = element.parentElement.offsetWidth;
      origElement.height = element.parentElement.offsetHeight - reduce;
      origElement.style.top = reduce === 0 ? 0 : reduce + "px";
      origElement.style.left = 0;
      origElement.style.position = "absolute";
    } else {
      if (element.parentElement) {
        recurseForAppWindow(element.parentElement, origElement);
      } else {
        origElement.width = window.innerWidth;
        origElement.height = window.innerHeight - reduce;
        origElement.style.top = reduce + "px";
        origElement.style.left = 0;
        origElement.style.position = "absolute";
      }
    }
  };

  useEffect(() => {
    if (iframeRef?.current)
      recurseForAppWindow(iframeRef.current, iframeRef.current);
    if (!iframe.src) iframe.src = "";
  }, [JSON.stringify(iframe)]);
  return (
    <>
      <iframe
        src={iframe.src}
        id="iframe"
        frameBorder="0"
        allow="xr-spatial-tracking"
        ref={iframeRef}
      />
    </>
  );
};
