// @ts-nocheck
import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import CustomSelectWithLabel from '../../Components/CustomSelectWithLabel';
import DefaultPageLayout from '../../Components/DefaultPageLayout';
import MasterPageLayout from '../../Components/MasterPageLayout';
import { Box, IconButton, Tooltip, Typography } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import { getAllUsers, getMenuNames, getSubMenuNames } from '../../api/commonAPI';
import { useNavigate } from 'react-router-dom';
import CustomBackDropWithOutState from '../../Components/CustomBackDropWithOutState';
import { PlusCircleSolid, PlusCircle } from "iconoir-react";
import axiosApi from '../../Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from '../../Constant/Constant';

const GraphicalViewMaster = () => {
    const navigation = useNavigate()

    const GraphicalViewRights = lazy(() => import('../../Components/CustomTable'));


    const [filteredSubMenus, setFilteredSubMenus] = useState([]);
    const [viewtable, setViewTable] = useState(0)
    const [tableData, setTableData] = useState([])
    // ✅ state stores the whole selected employee option
    const [UserGroupRights, setUserGroupRights] = useState({
        employee: null,       // { value, label }
        user_type_slno: 0,
        module_name: 0,
        user_type_status: 0,
        menuName: 0
    })

    const { employee, menuName } = UserGroupRights

    // Fetch all users
    const { data: AllUserList = [] } = useQuery({
        queryKey: ["userList"],
        queryFn: getAllUsers,
        staleTime: Infinity,
    });

    const { data: getSubMenuName } = useQuery({
        queryKey: ["GetSubMenuNames"],
        queryFn: getSubMenuNames,
        staleTime: Infinity,
    });

    const { data: fetchMenus } = useQuery({
        queryKey: ["GetMenuNames"],
        queryFn: getMenuNames,
        staleTime: Infinity,
    });

    const menus = fetchMenus?.map((val) => {
        return {
            value: val.bis_menu_slno,
            label: val.bis_menu_name,
            // menu_module: val.bis_menu_module
        }
    }, [])

    const subMenus = getSubMenuName?.map((val) => {
        return {
            value: val.bis_sub_menu_slno,
            label: val.bis_sub_menu_name,
            menu_slno: val.bis_menu_slno
        }
    }, [getSubMenuName])

    // console.log(filteredSubMenus);

    // bis_sub_menu_slno, bis_sub_menu_name, bis_mod_slno, bis_menu_slno, bis_sub_menu_status

    // Convert API data into dropdown-friendly options
    const employeeOptions = AllUserList.map(user => ({
        value: user.user_slno,
        label: (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography level="body-md" sx={{ fontWeight: 500 }}>
                    {user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
                </Typography>
                <Typography level="body-sm" sx={{ color: "green", fontStyle: "italic" }}>
                    ({user.user_slno})
                </Typography>
            </Box>
        )
    }));

    // handle employee dropdown change
    const handleEmployeeChange = (e, val) => {
        setUserGroupRights(prev => ({
            ...prev,
            employee: val || null   // store whole object or null if cleared
        }))
    }

    const viewuserList = useCallback(() => {
        // console.log("Viewing user list...");
    }, [])

    const postData = useMemo(() => {
        return {
            emp_no: parseInt(employee),
            menu_slno: parseInt(menuName)
        }
    }, [employee, menuName])


    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (employee === null && menuName === 0) {
            infoNofity("Select Employee Name & Menu Name")
        } else {
            const result = await axiosApi.post('/bisGraphicalViewMast', postData)
            const { success, data } = result.data

            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
                warningNofity("Menus Not Available")
            }
        }
    }, [postData, employee, menuName])

    const groupRightUpdateDetl = useCallback(async (val) => {
        const { view_emp_no, sub_menu_view_rights, view_menu_slno, view_mast_slno } = val;
        console.log(val);

        const postData = {
            menu_view: sub_menu_view_rights === 0 ? 1 : 0,
            emp_no: view_emp_no,
            menu_slno: view_menu_slno,
            view_mast_slno: view_mast_slno
        }
        const result = await axiosApi.patch('/bisGraphicalViewMast', postData)
        const { success, message, data } = result.data
        if (success === 1) {
            succesNofity(message)
            setTableData(data)
        } else {
            setTableData([])
            warningNofity(message)
        }
    }, [])

    return (
        <DefaultPageLayout label="Graphical View Rights Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >

                    <CustomSelectWithLabel
                        labelName='Employee Names'
                        dataCollection={employeeOptions}
                        values={employee}
                        handleChangeSelect={handleEmployeeChange}
                        placeholder={"Select Employee Name"}
                    />
                    <CustomSelectWithLabel
                        labelName='Menu Names'
                        dataCollection={menus}
                        values={Number(menuName)}
                        handleChangeSelect={(e, val) => {
                            const selectedMenu = menus?.find(m => m.value === val);

                            // update state
                            setUserGroupRights(prev => ({
                                ...prev,
                                menuName: val
                            }));

                            // filter submenus
                            const relatedSubMenus = subMenus?.filter(sm => sm.menu_slno === val) || [];
                            setFilteredSubMenus(relatedSubMenus);
                        }}
                        placeholder={"Select Menu Names"}
                    />
                </Box >


                <Box>
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
                        onClick={handleSubmitUserManagment}>
                        <Tooltip title="Click Here to Submit" arrow variant='outlined'
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
                        onClick={viewuserList}
                    >
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
                        onClick={() => navigation(-1)}
                    >
                        <Tooltip title="Back to Previous Page" arrow variant='outlined'
                            sx={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }}>
                            <CloseIcon sx={{ fontWeight: 400, color: 'rgba(var(--icon-primary))' }} />
                        </Tooltip>
                    </IconButton>
                </Box>
            </MasterPageLayout >

            {tableData?.length !== 0 ? (
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />}>
                    <GraphicalViewRights tableHeaderCol={['Slno', 'Menus', 'Action']}>
                        {tableData?.map((val, ndx) => {
                            return (
                                <tr key={ndx + 1}>
                                    <td>{val.view_mast_slno}</td>
                                    <td>{val.bis_sub_menu_name?.toUpperCase()}</td>
                                    <td>
                                        {val.sub_menu_view_rights === 0 ? (
                                            <IconButton aria-label="add" onClick={() => groupRightUpdateDetl(val)}>
                                                <PlusCircle style={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }} />
                                            </IconButton>
                                        ) : (
                                            <IconButton aria-label="add" onClick={() => groupRightUpdateDetl(val)}>
                                                <PlusCircleSolid style={{ color: 'rgba(var(--icon-primary))', backgroundColor: 'transparent' }} />
                                            </IconButton>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </GraphicalViewRights>
                </Suspense>
            ) : null}
        </DefaultPageLayout>
    )
}

export default memo(GraphicalViewMaster)







