import React, { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import { Box, IconButton, Tooltip } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { infoNofity, sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant';
import axiosApi from '../../../Axios/Axios';
import { useQuery } from '@tanstack/react-query';
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel';
import { PlusCircleSolid, PlusCircle } from "iconoir-react";
import { getModules, userTypes } from '../../../api/commonAPI';

const UserGroupRights = () => {

    const UserGroupList = lazy(() => import('../../../Components/CustomTable'));

    const navigation = useNavigate()

    const [viewtable, setViewTable] = useState(0)
    const [tableData, setTableData] = useState([])
    const [UserGroupRights, setUserGroupRights] = useState({
        user_type_slno: 0,
        user_type: 0,
        module_name: 0,
        user_type_status: 0
    })

    const { user_type, module_name } = UserGroupRights

    const { data: userType } = useQuery({
        queryKey: ["userTypeList"],
        queryFn: userTypes,
        staleTime: Infinity,
    });

    // console.log("userType", userType);

    const { data: getmodulelist } = useQuery({
        queryKey: ["modulelist"],
        queryFn: getModules,
        staleTime: Infinity,
    });

    const handleChange = (e) => {
        setUserGroupRights({ ...UserGroupRights, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    const postData = useMemo(() => {
        return {
            user_group_slno: parseInt(user_type),
            module_slno: parseInt(module_name)
        }
    }, [user_type, module_name])
    // console.log("postData", postData);


    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (user_type === 0 && module_name === 0) {
            infoNofity("Select Group Name & Module Name")
        } else {
            const result = await axiosApi.post('/UserGroupRightMaster', postData)
            const { success, data } = result.data

            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
                warningNofity("Menus Not Available")
            }
        }
    }, [postData, user_type, module_name])

    const groupRightUpdateDetl = useCallback(async (val) => {
        const { bis_group_rights_slno, bis_menu_view } = val;
        const postData = {
            group_rights_slno: bis_group_rights_slno,
            menu_view: bis_menu_view === 0 ? 1 : 0,
            user_group_slno: user_type,
            module_slno: module_name
        }
        const result = await axiosApi.patch('/UserGroupRightMaster', postData)
        const { success, message, data } = result.data
        if (success === 1) {
            succesNofity(message)
            setTableData(data)
        } else {
            setTableData([])
            warningNofity(message)
        }
    }, [user_type, module_name])

    return (
        <DefaultPageLayout label="User Group Rights" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >

                    <CustomSelectWithLabel
                        labelName='Login User Type'
                        dataCollection={userType}
                        values={Number(user_type)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_type', value: val } })}
                        placeholder={"Login User Type"}
                    />
                    <CustomSelectWithLabel
                        labelName='module Names'
                        dataCollection={getmodulelist}
                        values={Number(module_name)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'module_name', value: val } })}
                        placeholder={"Select Module Names"}
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
            {tableData?.length !== 0 || viewtable === 1 ? (
                <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />}>
                    <UserGroupList tableHeaderCol={['Slno', 'Menus', 'Action']}>
                        {tableData?.map((val, ndx) => {
                            return (
                                <tr key={ndx + 1}>
                                    <td>{val.bis_group_rights_slno}</td>
                                    <td>{val.bis_menu_name?.toUpperCase()}</td>
                                    <td>
                                        {val.bis_menu_view === 0 ? (
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
                    </UserGroupList>
                </Suspense>
            ) : null}

        </DefaultPageLayout >
    )
}

export default memo(UserGroupRights) 
