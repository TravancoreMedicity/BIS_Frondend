import React from 'react'
import { memo } from 'react'
import { Box, Divider, Typography } from '@mui/joy'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { baseColor } from '../Constant/Constant'
import AirlinesIcon from '@mui/icons-material/Airlines';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ToastContainer } from 'react-toastify'
import { HomeSimple, LogOut, ReportColumns } from 'iconoir-react'

const DefaultPageLayout = ({ label, children }) => {
    const navigate = useNavigate()
    return (
        <Box className="m-1 h-dvh overscroll-none" sx={{ backgroundColor: 'rgba(var(--bg-common))', borderColor: 'rgba(var(--border-primary))' }} >
            <Box className="flex flex-col m-0 rounded-xl p-1 pb-2 overflow-scroll w-full"
                sx={{ backgroundColor: 'rgba(var(--bg-card))', border: 1, borderColor: 'rgba(var(--border-primary))' }} >
                <ToastContainer />
                <Box className="flex flex-row items-center" >
                    <ReportColumns fontSize='medium' className='text-iconprimary ml-2' />
                    <Typography level='title-md' textAlign='left'
                        sx={{ p: 0.5, flexGrow: 1, color: 'rgba(var(--font-primary-white))', fontFamily: 'var(--font-varient)' }} >{label}</Typography>
                    <Box onClick={() => navigate('/Home/Dashboard')} >
                        <HomeSimple className='text-iconprimary cursor-pointer mr-1' /></Box>
                    <Box onClick={() => navigate(-1)} >
                        <LogOut className='text-iconprimary cursor-pointer mr-3' /></Box>
                </Box>
                <Divider sx={{ m: 0, mb: 0.5, backgroundColor: 'rgba(var(--border-primary))' }} />
                {children}
            </Box>
        </Box>
    )
}

export default memo(DefaultPageLayout) 