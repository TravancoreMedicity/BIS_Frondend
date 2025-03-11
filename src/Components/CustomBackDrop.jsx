// @ts-nocheck
import { Backdrop, CircularProgress } from '@mui/material';
import React, { memo } from 'react'

const CustomBackDrop = ({ setOpen, open }) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Backdrop
            // sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1, backgroundColor: 'transparent' })}
            sx={{
                zIndex: 1
            }}
            open={open}
            invisible
        // className='flex flex-col justify-center items-center'
        >
            <CircularProgress sx={{ color: 'rgba(216,75,154,1)' }} />
        </Backdrop>
    )
}

export default memo(CustomBackDrop) 