
import React, { useCallback, useState, useEffect } from "react"
import { useDelayFire } from '../hooks/delayFire';
import { Typography } from "@mui/material"
import { useDropzone } from 'react-dropzone'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ReactAudioPlayer from 'react-audio-player'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export interface props {
    content: any,
    setContentCB: Function,
    fileHandlerCB: Function
}


export const Audio = ({ content, setContentCB, fileHandlerCB }: props) => {
    const { delayFire, _props, set_props } = useDelayFire(content)
    const [audio, setAudio] = useState<any>(false)


    const onDrop = useCallback(async (acceptedFiles: any) => {
        var fileSrc: any
        fileSrc = URL.createObjectURL(acceptedFiles[0])
        setAudio(fileSrc)
        const fileName = await fileHandlerCB(acceptedFiles[0])
        const _content = { ...content };
        _content.src = fileName;
        setContentCB(_content)

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    useEffect(() => {

        if (content.src) {
            setAudio(content.src)
        }


    }, []);
    useEffect(() => {
        set_props(content)
    }, [content]);
    return (
        <>
            <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                label="Title"
                id="title"
                value={_props.title ? _props.title : ""}

                onChange={(event: any) => {
                    delayFire(
                        "title",
                        event.target.value,
                        () => {
                            const _content = { ...content };
                            _content.title = event.target.value;
                            setContentCB(_content)
                        })
                }
                } />
            <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                label="Description"
                id="description"
                value={_props.info ? _props.info : ""}
                multiline
                rows={4}
                onChange={(event: any) => {
                    delayFire(
                        "info",
                        event.target.value,
                        () => {
                            const _content = { ...content };
                            _content.info = event.target.value;
                            setContentCB(_content)
                        })
                }
                } />
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={content.autoPlay ? content.autoPlay : false}
                    onClick={() => {
                        const _content = { ...content };
                        _content.autoPlay = !content.autoPlay;
                        setContentCB(_content)

                    }}
                />} label="AutoPlay" /> <FormControlLabel control={<Checkbox checked={content.loop ? content.loop : false}
                    onClick={() => {
                        const _content = { ...content };
                        _content.loop = !content.loop;
                        setContentCB(_content)

                    }}
                />} label="Loop" />
                <FormControlLabel control={<Checkbox checked={content.controls ? content.controls : false}
                    onClick={() => {
                        const _content = { ...content };
                        _content.controls = !content.controls;
                        setContentCB(_content)

                    }}
                />} label="Controls" />

            </FormGroup>
            <Box id="uploadFiles" textAlign="center" sx={{ backgroundColor: '#efefef', p: 3, borderRadius: 2 }} {...getRootProps()}>
                <input {...getInputProps()} />
                <Typography gutterBottom variant="body1" component="div">
                    Drag 'n' drop some files here, or click to select files
                </Typography>
            </Box>
            {
                audio !== false &&
                <>
                    <Box sx={{ mt: 2 }} textAlign="center">
                        <ReactAudioPlayer
                            src={audio}
                            controls={true}

                        />
                    </Box>
                </>

            }
        </>
    )
}

