import { IconButton, Tooltip } from '@mui/joy'
import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { baseColor } from '../Constant/Constant';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';

const CommonMenuList = ({
    handleSubmitButtonFun,
    handleViewButtonFun,
    submitLabel
}) => {

    const navigation = useNavigate()

    return (
        <>
            <IconButton
                variant='outlined'
                sx={{
                    mt: 1, mr: 1,
                    fontWeight: 400,
                    '&:hover': {
                        borderColor: 'rgba(var(--icon-primary))',
                        backgroundColor: 'transparent',
                    }
                }}
                onClick={handleSubmitButtonFun}>
                <Tooltip title={submitLabel || "Click Here to Submit"} arrow variant='outlined'
                    sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }} >
                    <QueueIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                </Tooltip>
            </IconButton>
            <IconButton
                variant='outlined'
                sx={{
                    mt: 1, mr: 1, fontWeight: 400,
                    backgroundColor: 'transparent',
                    '&:hover': {
                        borderColor: 'rgba(var(--icon-primary))',
                        backgroundColor: 'transparent',
                    }
                }}
                onClick={handleViewButtonFun}>
                <Tooltip title="Click Here to View" arrow variant='outlined'
                    sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                    <SearchIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                </Tooltip>
            </IconButton>
            <IconButton
                variant='outlined'
                sx={{
                    mt: 1, mr: 1, fontWeight: 400,
                    '&:hover': {
                        borderColor: 'rgba(var(--icon-primary))',
                        backgroundColor: 'transparent',
                    }
                }}
                onClick={() => navigation(-1)}>
                <Tooltip title="Back to Previous Page" arrow variant='outlined'
                    sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                    <CloseIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                </Tooltip>
            </IconButton>
        </>
    )
}

export default memo(CommonMenuList) 