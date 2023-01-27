import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Styler } from "./content.styler";
import { defaults } from "./content.defaults";
import { Carousel } from "./objects/carousel.edit";
import { Video } from "./objects/video.edit";
import { Audio } from "./objects/audio.edit";
import { Image } from "./objects/image.edit";
import { DataTable } from "./objects/datatable.edit";
import { Paragraph } from "./objects/paragraph.edit";
import { Links } from "./objects/links.edit";
import { TimedDisplay } from "./objects/timedDisplay.edit";
import { Heading } from "./objects/heading.edit";
import { Iframe } from "./objects/iframe.edit";
import { GraphQL } from "./objects/graphql.edit";
import { Rest } from "./objects/rest.edit";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Typography from "@mui/material/Typography";
import DialogContentText from "@mui/material/DialogContentText";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export interface props {
  page: any;
  setPageCB: Function;
  fileHandlerCB: Function;
}

// temp
const contentTypes = [
  "heading",
  "paragraph",
  "dataTable",
  "image",
  "carousel",
  "audio",
  "video",
  "links",
  "timedDisplay",
  "iframe",
  "graphQL",
  "rest",
];
const titleCaseWord = (str: string) => {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
};

export const ContentEdit = ({ page, setPageCB, fileHandlerCB }: props) => {
  const [contentType, setContentType] = useState("paragraph");
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  const [display, setDisplay] = useState<any>({ content: [], styles: [] });
  const radioGroupRef = React.useRef<HTMLElement>(null);

  const addContent = () => {
    console.log(contentType, typeof page);
    const _page = { ...page };
    _page.content.push({
      [contentType]: {
        _id: uuid(),
      },
    });
    setPageCB(_page);
    setOpen(false);
    const _display = { ...display };
    _display.content.push(true);
    _display.styles.push(false);
    setDisplay(_display);
  };

  const contentManagerUp = (index: any) => {
    const _page = { ...page };
    const moveContent = _page.content[index - 1];
    _page.content[index - 1] = _page.content[index];
    _page.content[index] = moveContent;
    setPageCB(_page);
    const _display = { ...display };
    const moveDisplay = _display.content[index - 1];
    _display.content[index - 1] = _display.content[index];
    _display.content[index] = moveDisplay;

    const moveDisplayS = _display.content[index - 1];
    _display.styles[index - 1] = _display.styles[index];
    _display.styles[index] = moveDisplayS;
    setDisplay(_display);
  };
  const contentManagerDown = (index: any) => {
    const _page = { ...page };
    const moveContent = _page.content[index + 1];
    _page.content[index + 1] = _page.content[index];
    _page.content[index] = moveContent;
    setPageCB(_page);
    const _display = { ...display };
    const moveDisplay = _display.content[index + 1];
    _display.content[index + 1] = _display.content[index];
    _display.content[index] = moveDisplay;
    const moveDisplayS = _display.content[index + 1];
    _display.styles[index + 1] = _display.styles[index];
    _display.styles[index] = moveDisplayS;
    setDisplay(_display);
  };
  const contentManagerDelete = (index: any) => {
    const _page = { ...page };
    _page.content.splice(index, 1);
    setPageCB(_page);
    const _display = { ...display };
    _display.content.splice(index, 1);
    _display.styles.splice(index, 1);
    setDisplay(_display);
  };

  useEffect(() => {
    if (page?.content) {
      const pc = page.content.length - display.content.length;
      if (pc !== 0) {
        const _display = { ...display };
        for (var i = 0; i < pc; i++) {
          _display.content.push(true);
          _display.styles.push(false);
        }
        setDisplay(_display);
      }
    }
  }, [page?.content]);

  const displayContent = (index: any) => {
    const _display = { ...display };
    _display.content[index] = !_display.content[index];
    setDisplay(_display);
  };
  const getDisplayContent = (index: any) => {
    return display.content[index];
  };

  const displayStyles = (index: any) => {
    const _display = { ...display };
    _display.styles[index] = !_display.styles[index];
    setDisplay(_display);
  };
  const getDisplayStyles = (index: any) => {
    return display.styles[index];
  };

  const contentManager = (index: any) => {
    const contentTypeName = titleCaseWord(
      Object.getOwnPropertyNames(page.content[index])[0]
    );
    return (
      <Grid
        container
        sx={{ background: "rgb(179 199 255)", borderRadius: 1, mb: 1 }}
      >
        <Dialog
          open={confirmOpen}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this content item.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setConfirmOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setConfirmOpen(false);
                contentManagerDelete(deleteIndex);
              }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Box>
          <IconButton
            aria-label="down"
            size="small"
            onClick={() => {
              displayContent(index);
            }}
          >
            {getDisplayContent(index) == true ? (
              <ArrowDropDownIcon fontSize="inherit" />
            ) : (
              <ArrowRightIcon fontSize="inherit" />
            )}
          </IconButton>
          {contentTypeName !== "GraphQL" && contentTypeName !== "TimedDisplay" && (
            <IconButton
              aria-label="down"
              size="small"
              onClick={() => {
                displayStyles(index);
              }}
            >
              {getDisplayStyles(index) == true ? (
                <ArrowDropDownIcon fontSize="inherit" />
              ) : (
                <ArrowRightIcon fontSize="inherit" />
              )}
            </IconButton>
          )}
        </Box>

        <Grid item xs={7}>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ pt: 0.5, pl: 1 }}
          >
            {contentTypeName}
          </Typography>
        </Grid>

        <Box sx={{ flexGrow: 1 }} textAlign="right">
          {index == 0 && page.content.length !== 1 ? (
            <>
              <IconButton
                aria-label="down"
                size="small"
                onClick={() => {
                  contentManagerDown(index);
                }}
              >
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </>
          ) : index !== page.content.length - 1 ? (
            <>
              <IconButton
                aria-label="up"
                size="small"
                onClick={() => {
                  contentManagerUp(index);
                }}
              >
                <ArrowUpwardIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="down"
                size="small"
                onClick={() => {
                  contentManagerDown(index);
                }}
              >
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </>
          ) : page.content.length - 1 !== 0 ? (
            <>
              <IconButton
                aria-label="up"
                size="small"
                onClick={() => {
                  contentManagerUp(index);
                }}
              >
                <ArrowUpwardIcon fontSize="inherit" />
              </IconButton>
            </>
          ) : (
            <></>
          )}
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              setDeleteIndex(index);
              setConfirmOpen(true);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Grid item xs={4}></Grid>
      </Grid>
    );
  };
  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{
          onEntering: () => {
            if (radioGroupRef.current != null) {
              radioGroupRef.current.focus();
            }
          },
        }}
        open={open}
      >
        <DialogTitle>Select Content Type</DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            ref={radioGroupRef}
            aria-label="contentTypeSelect"
            name="contentTypeSelect"
            value={contentType}
            onChange={(event: any, value: any) => {
              setContentType(value);
            }}
          >
            {contentTypes.map((option) => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio />}
                label={titleCaseWord(option)}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={addContent}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Box textAlign="right" sx={{ flexGrow: 1, pt: 1, pb: 1 }}>
        <Button
          size="small"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Content
        </Button>
      </Box>

      <Box>
        {page?.content.map((content: any, index: any) => (
          <React.Fragment key={index}>
            {content?.audio && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Audio
                    content={page.content[index].audio}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      if (_content.src) {
                        _page.content[index].audio.src = _content.src;
                      }
                      _page.content[index].audio.title = _content.title;
                      _page.content[index].audio.info = _content.info;
                      _page.content[index].audio.autoPlay = _content.autoPlay;
                      _page.content[index].audio.loop = _content.loop;
                      _page.content[index].audio.controls = _content.controls;

                      setPageCB(_page);
                    }}
                    fileHandlerCB={async (_file: any) => {
                      const fileName = await fileHandlerCB(_file);
                      return fileName;
                    }}
                  />
                )}
              </>
            )}
            {content?.video && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Video
                    content={page.content[index].video}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      if (_content.src) {
                        _page.content[index].video.src = _content.src;
                      }
                      _page.content[index].video.title = _content.title;
                      _page.content[index].video.info = _content.info;
                      _page.content[index].video.autoPlay = _content.autoPlay;
                      _page.content[index].video.loop = _content.loop;
                      _page.content[index].video.controls = _content.controls;

                      setPageCB(_page);
                    }}
                    fileHandlerCB={async (_file: any) => {
                      const fileName = await fileHandlerCB(_file);
                      return fileName;
                    }}
                  />
                )}
              </>
            )}
            {content?.carousel && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Carousel
                    content={page.content[index].carousel}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].carousel = _content;
                      setPageCB(_page);
                    }}
                    fileHandlerCB={async (_file: any) => {
                      const fileName = await fileHandlerCB(_file);
                      return fileName;
                    }}
                  />
                )}
              </>
            )}
            {content?.dataTable && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <DataTable
                    content={page.content[index].dataTable}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].dataTable = _content;
                      setPageCB(_page);
                    }}
                  />
                )}
              </>
            )}
            {content?.heading && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Heading
                    content={page.content[index].heading}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].heading = _content;
                      setPageCB(_page);
                    }}
                  />
                )}
              </>
            )}
            {content?.paragraph && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Paragraph
                    content={page.content[index].paragraph}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].paragraph = _content;
                      setPageCB(_page);
                    }}
                  />
                )}
              </>
            )}
            {content?.links && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Links
                    content={page.content[index].links}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].links = _content;
                      setPageCB(_page);
                    }}
                  />
                )}
              </>
            )}
            {content?.iframe && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Iframe
                    content={page.content[index].iframe}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].iframe = _content;
                      setPageCB(_page);
                    }}
                  />
                )}
              </>
            )}
            {content?.image && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Image
                    content={page.content[index].image}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      if (_content.src) {
                        _page.content[index].image.src = _content.src;
                      }
                      _page.content[index].image.title = _content.title;
                      setPageCB(_page);
                    }}
                    fileHandlerCB={async (_file: any) => {
                      const fileName = await fileHandlerCB(_file);

                      return fileName;
                    }}
                  />
                )}
              </>
            )}
            {content?.timedDisplay && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <TimedDisplay
                    content={page.content[index].timedDisplay}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].timedDisplay = _content;
                      setPageCB(_page);
                    }}
                    fileHandlerCB={async (_file: any) => {
                      const fileName = await fileHandlerCB(_file);

                      return fileName;
                    }}
                  />
                )}
              </>
            )}
            {content?.graphQL && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <GraphQL
                    content={page.content[index].graphQL}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].graphQL = _content;
                      setPageCB(_page);
                    }}
                    fileHandlerCB={async (_file: any) => {
                      const fileName = await fileHandlerCB(_file);

                      return fileName;
                    }}
                  />
                )}
              </>
            )}
            {content?.rest && (
              <>
                {contentManager(index)}
                {display.content[index] && (
                  <Rest
                    content={page.content[index].rest}
                    setContentCB={(_content: any) => {
                      var _page = { ...page };
                      _page.content[index].rest = _content;
                      setPageCB(_page);
                    }}
                    fileHandlerCB={async (_file: any) => {
                      const fileName = await fileHandlerCB(_file);

                      return fileName;
                    }}
                  />
                )}
              </>
            )}
            {display.styles[index] && (
              <Styler
                inStyles={
                  content[Object.keys(content)[0]].styles
                    ? content[Object.keys(content)[0]].styles
                    : defaults[Object.keys(content)[0] as keyof typeof defaults]
                }
                outStyleCB={(styles: any) => {
                  var _page = { ...page };
                  _page.content[index][Object.keys(content)[0]].styles = styles;
                  setPageCB(_page);
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </>
  );
};
