import React from "react";
import { Grid } from "@mui/material";
import { Heading } from "./objects/heading";
import { Audio } from "./objects/audio";
import { Video } from "./objects/video";
import { Image } from "./objects/image";
import { Carousel } from "./objects/carousel";
import { DataTable } from "./objects/dataTable";
import { Paragraph } from "./objects/paragraph";
import { Links } from "./objects/links";
import { TimedDisplay } from "./objects/timedDisplay";
import { Iframe } from "./objects/iframe";
import { GraphQL } from "./objects/graphql";
export interface pageProps {
  page: any;
}
export const Page = ({ page }: pageProps) => {
  return (
    <>
      <Grid>
        {page && (
          <>
            {page.content.map((content: any, index: any) => (
              <React.Fragment key={index}>
                {content?.audio && <Audio audio={content.audio} />}
                {content?.video && <Video video={content.video} />}
                {content?.carousel && <Carousel carousel={content.carousel} />}
                {content?.dataTable && (
                  <DataTable dataTable={content.dataTable} />
                )}
                {content?.paragraph && (
                  <Paragraph paragraph={content.paragraph} />
                )}
                {content?.image && <Image image={content.image} />}
                {content?.links && <Links links={content.links} />}
                {content?.heading && <Heading heading={content.heading} />}
                {content?.timedDisplay && (
                  <TimedDisplay timedDisplay={content.timedDisplay} />
                )}
                {content?.iframe && <Iframe iframe={content.iframe} />}
                {content?.graphQL && <GraphQL graphQL={content.graphQL} />}
              </React.Fragment>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};
