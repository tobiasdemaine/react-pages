import React, { useEffect, useState, useRef } from "react";
import { defaults } from "../content.defaults";
import {
  Grid,
  Button,
  Typography,
  Box,
  Card,
  MobileStepper,
  CardContent,
  CardMedia,
} from "@mui/material";

import ReactSwipe from "react-swipe";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import _ from "lodash";

export interface zoneProps {
  carousel: any;
}
const API_ENPOINT = process.env.REACT_APP_API_ENDPOINT;

export const Carousel = ({ carousel }: zoneProps) => {
  const [styles, setStyles] = useState<any>(defaults.carousel);

  useEffect(() => {
    if (carousel.styles) {
      setStyles(carousel.styles);
    }
  }, [carousel.styles]);
  const [activeStep, setActiveStep] = useState(0);
  const swipeOptions = {
    startSlide: activeStep,
    callback(index: any, elem: any) {
      //console.log(index, elem);
    },
    transitionEnd(index: any, elem: any) {
      //console.log("ended transition");
      setActiveStep(index);
    },
  };

  const swipeRef: any = useRef(null);
  useEffect(() => {
    if (!swipeRef?.current) {
      return;
    }
  });
  return (
    <>
      {carousel && (
        <>
          <Box component="div" sx={styles[0].container.Box}>
            <ReactSwipe
              className="carousel"
              swipeOptions={swipeOptions}
              ref={(el) => (swipeRef.current = el)}
            >
              {carousel.cards &&
                carousel.cards.map((card: any, index: any) => (
                  <Card sx={_.cloneDeep(styles[1].card.Card)} key={index}>
                    {card.src && (
                      <CardMedia
                        component="img"
                        image={card.src}
                        alt={card.title}
                      />
                    )}
                    <CardContent>
                      <Typography
                        sx={_.cloneDeep(styles[2].title.Typography)}
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {card.title}
                      </Typography>
                      <Typography
                        sx={_.cloneDeep(styles[3].info.Typography)}
                        variant="body2"
                        color="text.secondary"
                      >
                        {card.info}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </ReactSwipe>
            <MobileStepper
              steps={carousel?.cards?.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={() => swipeRef?.current?.next()}
                  disabled={activeStep === carousel?.cards?.length - 1}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  disabled={activeStep === 0}
                  onClick={() => swipeRef?.current?.prev()}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </Box>
        </>
      )}
    </>
  );
};
