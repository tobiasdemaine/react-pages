// style editor 

import { Add, DeleteRounded } from "@mui/icons-material";
import _ from 'lodash';
import {
    IconButton,
    Typography,
    Grid,
    TextField,
    Button,
    NativeSelect,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import React, { Fragment, RefObject, useEffect, useState } from "react";

import { styleKeys } from "./content.styleKeys"

import useDynamicRefs from './hooks/useDynamicRefs'


interface props {
    inStyles: any[],
    outStyleCB: Function,
}
interface nodes {
    index: number,
    node1: string;
    node2: string;
    node3: string;
}

export const Styler = ({ inStyles, outStyleCB }: props) => {
    const [styleGroup, setStyleGroup] = useState(inStyles)
    const [getRef, setRef] = useDynamicRefs();
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
    const [nodes, setNodes] = useState<nodes>({ index: 0, node1: '', node2: '', node3: '' })
    useEffect(() => {
        outStyleCB(styleGroup)
    }, [styleGroup])
    useEffect(() => {
        styleKeys.sort()
    }, [])

    const isNumeric = (value: any) => {
        return /^-?\d+$/.test(value);
    }

    return (
        <>
            <Grid >
                <Dialog
                    open={confirmOpen}
                    onClose={() => { }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Delete?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this style.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setConfirmOpen(false)
                        }}>Cancel</Button>
                        <Button onClick={() => {
                            setConfirmOpen(false)
                            const _styleGroup = _.cloneDeep(styleGroup)
                            delete _styleGroup[nodes.index][nodes.node1][nodes.node2][nodes.node3]
                            setStyleGroup(_styleGroup)
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <>

                    {
                        styleGroup.map((styles: any, index: number) => (
                            <Grid key={index} container sx={{ mb: 2 }}>
                                <>
                                    {Object.entries(styles).map(([key, val]) => (

                                        <React.Fragment key={key}>
                                            <Grid item xs={12} sx={{ p: 0.5, pl: 1, borderRadius: 1, backgroundColor: '#efefef', mb: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500, }}>{key}</Typography>
                                            </Grid>
                                            {Object.entries(Object.values(val as object)[0]).map(([_key, _val]) => (
                                                <React.Fragment key={_key}>
                                                    <Grid item xs={5} sx={{ p: 1 }}>

                                                        {
                                                            _key
                                                        }
                                                    </Grid>
                                                    <Grid item xs={6} sx={{ mb: 0.5 }}>
                                                        <TextField
                                                            sx={{ width: '100%' }}
                                                            size="small"
                                                            variant="standard"
                                                            value={_val} //_styleGroup[index][key][Object.values(val as object)[0]][_key]
                                                            onChange={
                                                                (event: any) => {
                                                                    const _styleGroup = _.cloneDeep(styleGroup)
                                                                    _styleGroup[index][key][Object.keys(val as object)[0]][_key] = isNumeric(event.target.value) ? parseFloat(event.target.value) : event.target.value
                                                                    setStyleGroup(_styleGroup)
                                                                }
                                                            }
                                                        >
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                                                        <IconButton onClick={
                                                            (event: any) => {
                                                                setNodes(
                                                                    {
                                                                        index: index,
                                                                        node1: key,
                                                                        node2: Object.keys(val as object)[0],
                                                                        node3: _key
                                                                    }
                                                                )
                                                                setConfirmOpen(true)
                                                            }
                                                        }>
                                                            <DeleteRounded />
                                                        </IconButton>
                                                    </Grid>
                                                </React.Fragment>
                                            ))}

                                            <Grid container sx={{ pb: 0.2, borderRadius: 1, backgroundColor: '#efefef' }}>
                                                <Grid item xs={5} sx={{ mt: 1, pl: 1 }} >
                                                    <NativeSelect
                                                        sx={{ width: '95%' }}
                                                        variant="outlined"
                                                        inputRef={setRef('select_' + index + key) as any}>
                                                        {
                                                            styleKeys.map((value, index) => (
                                                                <option key={index} value={value}>{value}</option>
                                                            )
                                                            )
                                                        }
                                                    </NativeSelect>

                                                </Grid>
                                                <Grid item xs={6} sx={{ mt: "11px" }}>
                                                    <TextField
                                                        sx={{ width: '100%' }}
                                                        size="small"
                                                        variant="standard"
                                                        inputRef={setRef('value_' + index + key) as any}

                                                    >
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={1} sx={{ mt: 0.5, textAlign: 'center' }}>
                                                    <IconButton onClick={() => {
                                                        const _styleGroup = _.cloneDeep(styleGroup)
                                                        const selectRef = getRef('select_' + index + key) as RefObject<any>
                                                        const valueRef = getRef('value_' + index + key) as RefObject<any>

                                                        _styleGroup[index][key][Object.keys(val as object)[0]][selectRef.current.value] = isNumeric(valueRef.current.value) ? parseFloat(valueRef.current.value) : valueRef.current.value
                                                        setStyleGroup(_styleGroup)
                                                        valueRef.current.value = ''
                                                    }}>
                                                        <Add />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>


                                    ))}


                                </>
                            </Grid>
                        ))
                    }
                </>
            </Grid >
        </>
    )
}