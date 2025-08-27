import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import { Box, IconButton, Tooltip } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant';
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel';
import { userStatus } from '../../../Constant/Data';
import axiosApi from '../../../Axios/Axios';
import { getMenuNames, getModules, getSubMenuNames } from '../../../api/commonAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'iconoir-react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';

const SubMenuMaster = () => {

    const navigation = useNavigate()

    const queryClient = useQueryClient()

    const MenuNameList = lazy(() => import('../../../Components/CustomTable'));

    const [viewtable, setViewTable] = useState(0)
    const [editData, setEditData] = useState(0)
    const [Sub_MenuNames, setSub_MenuNames] = useState({
        Sub_Menu_slno: 0,
        Sub_Menu_name: '',
        Sub_Menu_status: 0,
        menuName: 0,
        module_slno: 0
    })

    const { Sub_Menu_name, Sub_Menu_status, menuName } = Sub_MenuNames

    const { data: getmodulelist } = useQuery({
        queryKey: ["modulelist"],
        queryFn: getModules,
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
            menu_module: val.bis_menu_module
        }
    }, [])

    const { data: getSubMenuName } = useQuery({
        queryKey: ["GetSubMenuNames"],
        queryFn: getSubMenuNames,
        staleTime: Infinity,
    });

    const handleChange = (e) => {
        setSub_MenuNames({ ...Sub_MenuNames, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {

        e.preventDefault();
        if (editData === 0) {
            if (Sub_MenuNames.Sub_Menu_name.trim() === '') {
                warningNofity('Name Of the Sub Menu cannot be empty');
                return;
            }
            const postdata = {
                Sub_Menu_name: Sub_MenuNames?.Sub_Menu_name,
                Sub_Menu_status: Number(Sub_MenuNames?.Sub_Menu_status),
                Menu_name: Number(Sub_MenuNames?.menuName),
                Module_slno: Number(Sub_MenuNames?.module_slno)   // ✅ now available directly
            };
            const response = await axiosApi.post('/bisSubMenuMaster/insertSubMenuName', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['GetSubMenuNames'])
                succesNofity(message)
                setSub_MenuNames({
                    Sub_Menu_name: '',
                    Sub_Menu_status: 0,
                    Menu_name: 0,
                    Module_slno: 0
                });
            }
            else {
                warningNofity(message)
            }
        } else {
            const postdata = {
                Sub_Menu_slno: Sub_MenuNames?.Sub_Menu_slno,
                Sub_Menu_name: Sub_MenuNames?.Sub_Menu_name,
                Sub_Menu_status: Number(Sub_MenuNames?.Sub_Menu_status),
                Menu_name: Number(Sub_MenuNames?.menuName),
                Module_slno: Number(Sub_MenuNames?.module_slno)
            }
            const response = await axiosApi.patch('/bisSubMenuMaster/editSubMenuName', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['GetSubMenuNames'])
                succesNofity(message)
                setSub_MenuNames({
                    Sub_Menu_slno: 0,
                    Sub_Menu_name: '',
                    Sub_Menu_status: 0,
                    Menu_name: 0,
                    Module_slno: 0
                });
            }
            else {
                warningNofity(message)
            }
        }
    }, [Sub_MenuNames, queryClient, editData])

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setSub_MenuNames({
            Sub_Menu_slno: item?.bis_sub_menu_slno,
            Sub_Menu_name: item?.bis_sub_menu_name,
            Sub_Menu_status: parseInt(item?.bis_sub_menu_status),
            menuName: item?.bis_menu_slno,   // ✅ this sets the menu dropdown
            module_slno: item?.bis_mod_slno  // ✅ this sets the module
        });
    }, [])

    return (
        <DefaultPageLayout label="Sub Menu Name Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'Sub_Menu_name', value: e.target.value } })}
                        values={Sub_Menu_name}
                        placeholder="Name of Sub Menu"
                        labelName='Name of Sub Menu'
                        type="text"
                    />
                    <CustomSelectWithLabel
                        labelName='Menu Names'
                        dataCollection={menus}
                        values={Number(menuName)}   // 👈 selected value comes from state
                        handleChangeSelect={(e, val) => {
                            const selectedMenu = menus?.find(m => m.value === val);
                            setSub_MenuNames(prev => ({
                                ...prev,
                                menuName: val,   // ✅ this controls the box
                                module_slno: selectedMenu?.menu_module || 0
                            }));
                        }}
                        placeholder={"Select Menu Names"}
                    />

                    <CustomSelectWithLabel
                        labelName='Module Status'
                        dataCollection={userStatus}
                        values={Number(Sub_Menu_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'Sub_Menu_status', value: val } })}
                        placeholder={"Menu Status"}
                    />

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
                </Box >
            </MasterPageLayout >
            {viewtable === 1 ?
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                    <MenuNameList tableHeaderCol={['Action', 'Slno', ' Sub Menu Nme', 'Module ', "Menu Name", 'Status']} >
                        {
                            getSubMenuName?.map((item, idx) => (
                                <tr key={idx}>
                                    <td ><Edit onClick={() => EditBtn(item)} style={{
                                        color: "rgba(var(--color-pink))",
                                        ":hover": {
                                            color: "grey",
                                        }, p: 0.5
                                    }} /></td>
                                    <td>{idx + 1}</td>
                                    <td>{item?.bis_sub_menu_name?.toUpperCase()}</td>
                                    <td>{getmodulelist.find(module => module.value === item?.bis_mod_slno)?.label || 'Unknown Module'}</td>
                                    <td>{menus.find(module => module.value === item?.bis_menu_slno)?.label || 'Unknown Menu'}</td>
                                    <td>{Number(item?.bis_sub_menu_status) === 1 ? "Active" : Number(item?.bis_sub_menu_status) === 2 ? "Inactive" : "Suspented"}</td>
                                </tr>
                            ))
                        }
                    </MenuNameList>
                </Suspense> : null}
        </DefaultPageLayout >
    )
}

export default memo(SubMenuMaster) 