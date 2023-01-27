
import React, { useCallback, useState, useEffect } from "react"
import { useDelayFire } from '../hooks/delayFire';

import { useDropzone } from 'react-dropzone'
import { Typography } from "@mui/material"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Delete Zone
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface props {
    content: any,
    setContentCB: Function,
    fileHandlerCB: Function
}


export const Carousel = ({ content, setContentCB, fileHandlerCB }: props) => {
    const { delayFire, _props, set_props } = useDelayFire(content)

    const [image, setImage] = useState<any>({ src: [] })
    const [tab, setTab] = useState<any>(false)

    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)



    const newCard = () => {
        const _content = { ...content };
        if (!_content.cards) {
            _content.cards = []
        }
        _content.cards.push(
            {
                title: "New Card",
                info: "",
                src: false
            }
        )
        const _image = { ...image };
        _image.src.push(false)
        setImage(_image)
        setContentCB(_content)
        setTab(_content.cards.length - 1)
        set_props(_content)
    }

    const deleteCard = () => {
        const _content = { ...content };
        _content.cards.splice(tab, 1);
        setContentCB(_content)
        set_props(_content)
        const _image = { ...image };
        _image.src.splice(tab, 1);
        setImage(_image)
        if (_content.cards.length == 0) {
            setTab(false)
        } else {
            setTab(_content.cards.items.length - 1)
        }

    }
    const [tmpImg, setTmpImg] = useState<any>(false)
    const onDrop = useCallback(async (acceptedFiles: any) => {
        var fileSrc: any
        fileSrc = URL.createObjectURL(acceptedFiles[0])

        //const _image = { ...image };
        //_image.src[tab] = fileSrc
        //setImage(_image)
        const fileName = await fileHandlerCB(acceptedFiles[0])
        setTmpImg(fileName)
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    useEffect(() => {
        if (tab !== false) {
            if (content.cards[tab].src != false) {
                const _image = { ...image };
                console.log(content.cards[tab].src)
                _image.src[tab] = content.cards[tab].src;
                setImage(_image)
            }
        }
    }, [tab])

    useEffect(() => {
        if (tmpImg !== false) {
            const _content = { ...content };
            _content.cards[tab].src = tmpImg;
            setContentCB(_content)
            const _image = { ...image };
            _image.src[tab] = tmpImg
            setImage(_image)
            setTmpImg(false)
        }
    }, [tmpImg])
    useEffect(() => {
        set_props(content)
    }, [content]);
    return (
        <>
            <Dialog
                open={confirmOpen}
                onClose={() => { }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this menu item.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setConfirmOpen(false)
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        setConfirmOpen(false)
                        deleteCard()
                    }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


            <Tabs
                variant="scrollable"
                value={tab}
                onChange={(event: React.SyntheticEvent, newValue: number) => {
                    setTab(newValue)

                }}

            >
                {
                    content.cards &&
                    content.cards.map((item: any, index: any) => (
                        <Tab key={index} label={item.title} />
                    ))
                }

                <Box textAlign="right" sx={{ minWidth: 160, flexGrow: 1, pt: 1 }}>
                    <Button sx={{ mr: .5 }} size="small" onClick={() => {
                        setConfirmOpen(true)
                    }}>Delete</Button>
                    <Button size="small" onClick={newCard}>New Card</Button>
                </Box>
            </Tabs>
            {
                tab !== false &&
                <Box role="tabpanel" sx={{ pt: 2 }}>

                    <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                        label="Image Title"
                        id="title"
                        value={_props.cards[tab].title ? _props.cards[tab].title : ""}
                        onChange={(event: any) => {
                            delayFire(
                                "cards[" + tab + "].title",
                                event.target.value,
                                () => {
                                    const _content = { ...content };
                                    _content.cards[tab].title = event.target.value;
                                    setContentCB(_content)
                                })


                        }} />
                    <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                        label="Description"
                        id="description"
                        multiline
                        rows={4}
                        value={_props.cards[tab].info ? _props.cards[tab].info : ""}
                        onChange={(event: any) => {
                            delayFire(
                                "cards[" + tab + "].info",
                                event.target.value,
                                () => {
                                    const _content = { ...content };
                                    _content.cards[tab].info = event.target.value;
                                    setContentCB(_content)
                                })
                        }} />
                    <Box id="uploadFiles" textAlign="center" sx={{ backgroundColor: '#efefef', p: 3, borderRadius: 2 }} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Typography gutterBottom variant="body1" component="div">
                            Drag 'n' drop some files here, or click to select files
                        </Typography>
                    </Box>
                    {
                        image.src[tab] !== false &&
                        <>
                            <Box sx={{ mt: 2 }} textAlign="center">
                                <img src={image.src[tab]} width="400"></img>
                            </Box>
                        </>

                    }
                </Box>
            }
        </>
    )
}
