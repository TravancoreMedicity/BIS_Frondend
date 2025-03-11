import React, { useCallback } from 'react'
import { memo } from 'react'
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import { Avatar, Box, Divider, Typography } from '@mui/joy';
import person from '../assets/Individual.gif'
import settings from '../assets/setting.gif'
import exit from '../assets/exit.gif'
import { useNavigate } from 'react-router-dom';
import { PeopleTag } from 'iconoir-react'
import axiosApi from '../Axios/Axios';
import { toast } from 'react-toastify';
// import { socket } from '../ws/socket';

const LogoutMoidal = () => {

    const navigate = useNavigate()
    const handleLogout = useCallback(async () => {
        const userSlno = localStorage.getItem("app_auth");
        // socket.disconnect();

        if (userSlno) {
            const userId = atob(JSON.parse(userSlno)?.authNo);
            if (userId) {
                // localStorage.removeItem("app_auth");
                // window.location.href = "/";
                const res = await axiosApi.get(`/user/logout/${userId}`);
                if (res) {
                    localStorage.removeItem("app_auth");

                    toast.success(
                        <div className='flex h-20 flex-col'>You have been successfully logged out</div>,
                        {
                            position: "top-center", // Centers toast horizontally at the top
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        }
                    );


                    setTimeout(() => {
                        navigate('/')
                    }, 1000); // Wait 3 seconds before redirecting
                }
            }

        }
    }, [])

    return (
        <Dropdown >
            <MenuButton
                sx={{
                    bgcolor: 'rgba(15,18,20,0.5)',
                    border: '0.005rem solid rgba(var(--border-primary))',
                }}
                slots={{ root: Avatar, }}
                slotProps={{ root: { variant: 'plain', } }}
            >
                <PeopleTag style={{ color: 'rgba(var(--icon-primary))' }} />
            </MenuButton>

            <Menu
                placement="bottom-start"
                sx={{
                    width: 300,
                    boxShadow: 'lg',
                    borderRadius: 'lg',
                    bgcolor: 'rgba(var(--bg-card))',
                    borderColor: 'rgba(var(--border-primary))',
                }}
                popperOptions={
                    {
                        modifiers: [
                            {
                                name: 'offset',
                                options: {
                                    offset: [0, 10],
                                },
                            },
                        ],
                    }
                }
            >
                <MenuItem
                    sx={{
                        mt: 1,
                        py: 1,
                        pb: 2,
                        '&.MuiMenuItem-root:hover': {
                            bgcolor: 'transparent',
                        }
                    }}
                >
                    <Box className="flex items-center gap-2"  >
                        <Avatar
                            className="drop-shadow-lg"
                            alt='avatar'
                            size='lg'
                            sx={{
                                bgcolor: 'rgba(15,18,20,0.5)',
                                border: '0.005rem solid rgba(var(--border-primary))',
                            }}
                            src={person}
                        />
                        <Box>
                            <Typography level='body-md' noWrap
                                sx={{ width: 300, fontWeight: 500, fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }}
                            >Name Of Person</Typography>
                            <Typography level='body-xs' sx={{
                                fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))'
                            }} >Manager IT</Typography>
                        </Box>
                    </Box>
                </MenuItem>
                <Divider sx={{ mx: 1, backgroundColor: 'rgba(213,82,155,0.5)' }} />
                <MenuItem sx={{
                    py: 0.5,
                    '&.MuiMenuItem-root:hover': {
                        bgcolor: 'rgba(213,82,155,0.1)',
                    }
                }}>
                    <ListItemDecorator  >
                        <Box component={'img'} src={settings} alt='settings' sx={{ width: 30, height: 30 }} />
                    </ListItemDecorator>
                    <Typography
                        sx={{ fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }}
                    >
                        Settings
                    </Typography>
                </MenuItem>
                <Divider sx={{ mx: 1, backgroundColor: 'rgba(213,82,155,0.5)' }} />
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        '&.MuiMenuItem-root:hover': {
                            bgcolor: 'rgba(213,82,155,0.1)',
                        }
                    }}
                >
                    <ListItemDecorator sx={{ color: 'inherit' }}>
                        <Box component={'img'} src={exit} alt='settings' sx={{ width: 30, height: 30 }} />
                    </ListItemDecorator>{' '}
                    <Typography
                        sx={{ fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }}
                    >
                        Sign Out
                    </Typography>
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

export default memo(LogoutMoidal)