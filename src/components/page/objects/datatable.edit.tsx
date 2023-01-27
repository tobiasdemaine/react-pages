import React, { useEffect, useState } from 'react';
import { useDelayFire } from '../hooks/delayFire';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import DeleteIcon from '@mui/icons-material/Delete';

export interface props {
    content: any,
    setContentCB: Function,
}


export const DataTable = ({ content, setContentCB }: props) => {
    const { delayFire, _props, set_props } = useDelayFire(content)
    const [cols, setCols] = useState(2)
    const [edit, setEdit] = useState(false)

    const newTable = () => {
        setEdit(true)
        const columns: string[] = []
        const align: string[] = []
        const rowData: any[] = []

        var data: string[] = []
        for (var i = 0; i < cols; i++) {
            columns.push("head" + (i + 1));
            align.push("left");
            data.push("")
        }
        rowData.push(data)
        const _content = { ...content }
        _content.title = ""
        _content.info = ""
        _content.rowData = rowData
        _content.align = align
        _content.columns = columns
        setContentCB(_content)
        set_props({ ..._content })
    }

    const setDataAlign = (index: any, align: any) => {
        const _content = { ...content }
        _content.align[index] = align
        setContentCB(_content)
    }

    const setColumnTitle = (index: any, text: any) => {
        delayFire(
            "columns[" + index + "]",
            text,
            () => {
                const _content = { ...content };
                _content.columns[index] = text;
                //setContentCB(_content)
            })
    }
    const setRowColumnData = (row: any, index: any, text: any) => {
        delayFire(
            "rowData[" + row + "][" + index + "]",
            text,
            () => {
                const _content = { ...content };
                _content.rowData[row][index] = text;
                //setContentCB(_content)
            })
    }

    function addRow() {
        var data: string[] = []
        for (var i = 0; i < cols; i++) {
            data.push("")
        }
        const _content = { ...content }
        _content.rowData.push(data)
        setContentCB(_content)
        set_props(_content)
    }

    function deleteRow(index: any) {
        const _content = { ...content }
        _content.rowData.splice(index, 1)
        setContentCB(_content)
        set_props(_content)
    }
    useEffect(() => {
        if (content.columns) {
            setCols(content.columns.length)
            setEdit(true)
        }
    }, [])
    useEffect(() => {
        set_props(content)
    }, [content]);
    return (
        <>
            {
                edit === true ? (
                    <Box>
                        <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                            label="Table Title"
                            id="tabletitle"
                            value={_props.title || ""}
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
                            value={_props.info || ""}
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


                        <Table padding="none">
                            <TableHead>
                                <TableRow>
                                    {
                                        content?.align &&
                                        content.align.map((alignData: any, index: any) => (
                                            <TableCell align="center" key={index} >
                                                <IconButton aria-label="down" size="small" onClick={() => { setDataAlign(index, 'left') }}>
                                                    <FormatAlignLeftIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton aria-label="down" size="small" onClick={() => { setDataAlign(index, 'center') }}>
                                                    <FormatAlignCenterIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton aria-label="down" size="small" onClick={() => { setDataAlign(index, 'right') }}>
                                                    <FormatAlignRightIcon fontSize="inherit" />
                                                </IconButton>

                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                                <TableRow>
                                    {


                                        _props?.columns &&
                                        _props.columns.map((colData: any, index: any) => (
                                            <TableCell key={index} >
                                                <input
                                                    style={{
                                                        width: '100%',
                                                        borderRadius: 0,
                                                        border: '1px solid #aaa',
                                                        textAlign: content.align[index],
                                                        fontWeight: 800,
                                                        backgroundColor: '#ddd'
                                                    }}
                                                    onChange={(event: any) => {
                                                        delayFire(
                                                            "columns[" + index + "]",
                                                            event?.target.value,
                                                            () => {
                                                                const _content = { ...content };
                                                                _content.columns[index] = event?.target.value;
                                                                setContentCB(_content)
                                                            })
                                                        //setColumnTitle(index, event?.target.value)
                                                    }}
                                                    value={_props.columns[index] || ""}
                                                />
                                            </TableCell>
                                        ))
                                    }

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    _props?.rowData &&
                                    _props.rowData.map((rowD: any, rowIndex: any) => (
                                        <TableRow key={rowIndex}>
                                            {
                                                rowD.map((cell: any, index: any) => (
                                                    <TableCell key={index}>
                                                        <input
                                                            style={{
                                                                width: '100%',
                                                                borderRadius: 0,
                                                                border: '1px solid #aaa',
                                                                textAlign: content.align[index]
                                                            }}
                                                            onChange={(event: any) => {
                                                                //setRowColumnData(rowIndex, index, event?.target.value)
                                                                delayFire(
                                                                    "rowData[" + rowIndex + "][" + index + "]",
                                                                    event?.target.value,
                                                                    () => {
                                                                        const _content = { ...content };
                                                                        _content.rowData[rowIndex][index] = event?.target.value;
                                                                        setContentCB(_content)
                                                                    })
                                                            }}
                                                            value={_props.rowData[rowIndex][index] || ""}
                                                        />
                                                    </TableCell>
                                                ))

                                            }
                                            <TableCell padding="none" sx={{ width: "20px" }}>
                                                <IconButton aria-label="delete" size="small" onClick={() => { deleteRow(rowIndex) }}>
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <Button onClick={addRow}>Add Row</Button>
                    </Box>
                ) :
                    (
                        <Box >
                            <TextField
                                label="Columns"
                                id="outlined-size-small"
                                value={cols || 2}
                                size="small"
                                onChange={(event: any) => { setCols(event.target.value) }}
                                sx={{ mr: 3 }}
                                type="number"
                            />
                            <Button onClick={newTable}>New DataTable</Button>


                        </Box>
                    )
            }

        </>
    )
}