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
import { getMenuNames, getModules } from '../../../api/commonAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Edit } from 'iconoir-react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';

const MenuNameMaster = () => {

    const navigation = useNavigate()

    const queryClient = useQueryClient()

    const MenuNameList = lazy(() => import('../../../Components/CustomTable'));

    const [viewtable, setViewTable] = useState(0)
    const [editData, setEditData] = useState(0)
    const [MenuNames, setMenuNames] = useState({
        Menu_slno: 0,
        Menu_name: '',
        module_name: 0,
        Menu_status: 0
    })

    const { Menu_name, Menu_status, module_name } = MenuNames

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

    const handleChange = (e) => {
        setMenuNames({ ...MenuNames, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (editData === 0) {
            if (MenuNames.Menu_name.trim() === '') {
                warningNofity('Name Of the Module Group cannot be empty');
                return;
            }
            const postdata = {
                Menu_name: MenuNames?.Menu_name,
                Menu_status: Number(MenuNames?.Menu_status),
                module_name: MenuNames?.module_name,
            }
            const response = await axiosApi.post('/MenuNameMaster/insertMenuName', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['GetMenuNames'])
                succesNofity(message)
                setMenuNames({
                    Menu_slno: 0,
                    Menu_name: '',
                    module_name: '',
                    Menu_status: 0
                });
            }
            else {
                warningNofity(message)
            }
        } else {
            const postdata = {
                Menu_slno: MenuNames?.Menu_slno,
                Menu_name: MenuNames?.Menu_name,
                Menu_status: Number(MenuNames?.Menu_status),
                module_name: MenuNames?.module_name,
            }
            const response = await axiosApi.patch('/MenuNameMaster/editMenuName', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['GetMenuNames'])
                succesNofity(message)
                setMenuNames({
                    Menu_slno: 0,
                    Menu_name: '',
                    module_name: '',
                    Menu_status: 0
                });
            }
            else {
                warningNofity(message)
            }
        }
    }, [MenuNames, queryClient, editData])

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    const EditBtn = useCallback((item) => {
        setEditData(1)
        setMenuNames({
            Menu_slno: item?.bis_menu_slno,
            Menu_name: item?.bis_menu_name,
            module_name: item?.bis_menu_module,
            Menu_status: parseInt(item?.bis_menu_status)
        });
    }, [])

    return (
        <DefaultPageLayout label="Menu Name Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'Menu_name', value: e.target.value } })}
                        values={Menu_name}
                        placeholder="Name of Menu"
                        labelName='Name of Menu'
                        type="text"
                    />
                    <CustomSelectWithLabel
                        labelName='Module Names'
                        dataCollection={getmodulelist}
                        values={Number(module_name)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'module_name', value: val } })}
                        placeholder={"Select Module Names"}
                    />

                    <CustomSelectWithLabel
                        labelName='Module Status'
                        dataCollection={userStatus}
                        values={Number(Menu_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'Menu_status', value: val } })}
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
                    <MenuNameList tableHeaderCol={['Action', 'Slno', 'Menu Nme', 'Module ', 'Status']} >
                        {
                            fetchMenus?.map((item, idx) => (
                                <tr key={idx}>
                                    <td ><Edit onClick={() => EditBtn(item)} style={{
                                        color: "rgba(var(--color-pink))",
                                        ":hover": {
                                            color: "grey",
                                        }, p: 0.5
                                    }} /></td>
                                    <td>{idx + 1}</td>
                                    <td>{item?.bis_menu_name?.toUpperCase()}</td>
                                    <td>{getmodulelist.find(module => module.value === item?.bis_menu_slno)?.label || 'Unknown Module'}</td>
                                    <td>{Number(item?.bis_menu_status) === 1 ? "Active" : Number(item?.bis_menu_status) === 2 ? "Inactive" : "Suspented"}</td>
                                </tr>
                            ))
                        }
                    </MenuNameList>
                </Suspense> : null}
        </DefaultPageLayout >
    )
}

export default memo(MenuNameMaster)

