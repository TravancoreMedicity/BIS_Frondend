import { Box, Typography } from '@mui/joy'
import Grid from '@mui/material/Grid2'
import React from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { userWiseSettingsRights } from '../../../api/commonAPI'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'

const KMCSettings = () => {

    const navigation = useNavigate()

    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authType)

    const { data: userSettings } = useQuery({
        queryKey: ['getuserSettings', loggedUser],
        queryFn: () => userWiseSettingsRights(loggedUser),
        enabled: !!loggedUser,
    });

    // console.log(userSettings, "userSettings");


    const menuName = [
        { menuSlno: 1, menuName: 'User Management', menuCodeName: 'UserManagement' },

        { menuSlno: 12, menuName: 'user Type Master', menuCodeName: 'UserTypeMaster' },
        { menuSlno: 16, menuName: 'Module Name Master', menuCodeName: 'ModuleNameMaster' },
        { menuSlno: 15, menuName: 'Menu Name Master', menuCodeName: 'MenuNameMaster' },
        { menuSlno: 14, menuName: 'Module Group Master', menuCodeName: 'ModuleGroupMaster' },
        { menuSlno: 18, menuName: 'User Group Rights', menuCodeName: 'UserGroupRights' },

    ]

    // const employeemenu = menuName?.filter(menu =>
    //     userSettings?.some(item => item.menu_slno === menu.menuSlno)
    // );
    return (
        <DefaultPageLayout label='KMC Master Settings' >
            <Grid container spacing={1} sx={{ flexGrow: 0, px: 1 }}>
                {
                    menuName?.map((val, idx) => (
                        <Grid
                            size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}
                            key={idx} onClick={() => navigation(`/Home/${val.menuCodeName}`)} >
                            <Box
                                className="border-b-[0.2rem] border-iconprimary p-0 cursor-pointer hover:bg-slate-200" >
                                <Typography level='body-sm' fontWeight={'md'} sx={{ fontFamily: 'var(--font-varient)', color: 'rgba(var(--font-primary-white))' }} >
                                    {val.menuName}
                                </Typography>
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        </DefaultPageLayout>
    )
}

export default memo(KMCSettings)

