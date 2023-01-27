
import React, { useCallback, useState, useEffect } from "react"
import { useDelayFire } from '../hooks/delayFire';


import { Typography } from "@mui/material"
import { useDropzone } from 'react-dropzone'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export interface props {
    content: any,
    setContentCB: Function,
    fileHandlerCB: Function
}


export const Image = ({ content, setContentCB, fileHandlerCB }: props) => {
    const [image, setImage] = useState<any>(false)
    const { delayFire, _props, set_props } = useDelayFire(content)

    const onDrop = useCallback(async (acceptedFiles: any) => {
        var fileSrc: any
        fileSrc = URL.createObjectURL(acceptedFiles[0])
        setImage(fileSrc)
        const fileName = await fileHandlerCB(acceptedFiles[0])
        console.log(fileName)
        const _content = { ...content };
        _content.src = fileName;
        console.log(_content)
        setContentCB(_content)

    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop })
    useEffect(() => {
        if (content.src) {
            setImage(content.src)
        }
    }, []);
    useEffect(() => {
        set_props(content)
    }, [content]);
    return (
        <>
            <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                label="Image Title"
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

            <Box id="uploadFiles" textAlign="center" sx={{ backgroundColor: '#efefef', p: 3, borderRadius: 2 }} {...getRootProps()}>
                <input {...getInputProps()} />
                <Typography gutterBottom variant="body1" component="div">
                    Drag 'n' drop some files here, or click to select files
                </Typography>
            </Box>
            {
                image !== false &&
                <>
                    <Box sx={{ mt: 2 }} textAlign="center">
                        <img src={image} width="350"></img>
                    </Box>
                </>

            }
        </>
    )
}


