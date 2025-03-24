import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import { Box, IconButton, Tooltip, Typography } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import { json, useNavigate } from 'react-router-dom';
import { sanitizeInput, succesNofity, warningNofity } from '../../../Constant/Constant';
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { userStatus } from '../../../Constant/Data';
import axiosApi from '../../../Axios/Axios';
import { getModuleMast, getModules, userTypes } from '../../../api/commonAPI'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CustomCheckBoxWithLabel from '../../../Components/CustomCheckBoxWithLabel';
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';
import { Edit } from 'iconoir-react'

const ModuleGroupMaster = () => {
    const queryClient = useQueryClient()

    const ModuleMasterList = lazy(() => import('../../../Components/CustomTable'));

    const navigation = useNavigate()

    const [viewtable, setViewTable] = useState(0)
    const [editData, setEditData] = useState(0)
    const [moduleGrpDetails, setModuleGrpDetails] = useState({
        module_grp_slno: 0,
        module_grp_status: 0,
        user_type: 0
    })

    const { module_grp_status, user_type } = moduleGrpDetails

    const { data: moduleNameList } = useQuery({
        queryKey: ["moduleList"],
        queryFn: getModules,
        staleTime: Infinity,
    });

    const { data: moduleMastList } = useQuery({
        queryKey: ["moduleMast"],
        queryFn: getModuleMast,
        staleTime: Infinity,
    });

    const { data: userType } = useQuery({
        queryKey: ["userTypeList"],
        queryFn: userTypes,
        staleTime: Infinity,
    });

    const [selectedModules, setSelectedModules] = useState({});

    const handleDocumentState = (event) => {
        const { name, value } = event.target;
        setSelectedModules((prevState) => ({
            ...prevState,
            [name]: value === false ? 0 : 1, // Update the module's checked state
        }));
    };


    const handleChange = (e) => {
        setModuleGrpDetails({ ...moduleGrpDetails, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (editData === 0) {
            if (moduleGrpDetails.user_type?.length === 0) {
                warningNofity('Name Of the Module cannot be empty');
                return;
            }
            const postdata = {
                module_user_type: Number(moduleGrpDetails?.user_type),
                module_grp_status: Number(moduleGrpDetails?.module_grp_status),
                module_slno: selectedModules
            }
            const response = await axiosApi.post('/ModuleGroupMaster/insertModuleGroup', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['moduleMast'])
                succesNofity(message)
                setModuleGrpDetails({
                    module_grp_slno: 0,
                    user_type: 0,
                    module_grp_status: 0
                });
                setSelectedModules({})
            }
            else {
                warningNofity(message)
            }
        }
        else {
            if (moduleGrpDetails.user_type?.length === 0) {
                warningNofity('Name Of the Module cannot be empty');
                return;
            }
            const patchdata = {
                module_grp_slno: moduleGrpDetails?.module_grp_slno,
                module_user_type: Number(moduleGrpDetails?.user_type),
                module_grp_status: Number(moduleGrpDetails?.module_grp_status),
                module_slno: selectedModules
            }
            const response = await axiosApi.patch('/ModuleGroupMaster/editModuleGroup', patchdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['moduleMast'])
                succesNofity(message)
                setModuleGrpDetails({
                    module_grp_slno: 0,
                    user_type: 0,
                    module_grp_status: 0,
                });
                setSelectedModules({})
            }
            else {
                warningNofity(message)
            }
        }
    }, [moduleGrpDetails, editData, queryClient, selectedModules])

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    const EditBtn = useCallback((item) => {
        // console.log("item", item);
        const newobject = JSON.parse(item.bis_module_slno);
        setEditData(1);
        setModuleGrpDetails({
            module_grp_slno: item.bis_mgro_slno,
            user_type: item.bis_module_user_type,
            module_grp_status: item.bis_module_grp_status
        });
        setSelectedModules(newobject || {});
    }, []);


    return (
        <DefaultPageLayout label="Module Group Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomSelectWithLabel
                        labelName='User Type'
                        dataCollection={userType}
                        values={Number(user_type)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_type', value: val } })}
                        placeholder={"User Type"}
                    />

                    <Box> <Typography sx={{ fontSize: 15 }}>Module Names</Typography>
                        <Box className="flex flex-1 items-center justify-between py-[0.199rem] px-2 ">
                            {moduleNameList?.map((val, index) => (
                                <CustomCheckBoxWithLabel
                                    key={index}
                                    label={val.label}
                                    checkBoxValue={selectedModules[val.label] || false}
                                    handleCheckBoxValue={(e) =>
                                        handleDocumentState({ target: { name: val.label, value: e.target.checked } })
                                    }
                                />
                            ))}
                        </Box>
                    </Box>

                    <CustomSelectWithLabel
                        labelName='Module Group Status'
                        dataCollection={userStatus}
                        values={Number(module_grp_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'module_grp_status', value: val } })}
                        placeholder={"Module Group Status"}
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
                    <ModuleMasterList tableHeaderCol={['Action', 'Slno', 'Module Group User', 'Sub Type Status']} >
                        {
                            moduleMastList?.map((item, idx) => (
                                <tr key={idx}>
                                    <td ><Edit onClick={() => EditBtn(item)} style={{
                                        color: "rgba(var(--color-pink))",
                                        ":hover": {
                                            color: "grey",
                                        }, p: 0.5
                                    }} /></td>
                                    <td>{idx + 1}</td>
                                    <td>{userType.find(type => type.value === item?.bis_module_user_type)?.label || 'Unknown User'}</td>
                                    <td>{item?.bis_module_grp_status === 1 ? "Active" : item?.bis_module_grp_status === 2 ? "Inactive" : "Suspented"}</td>
                                </tr>
                            ))
                        }
                    </ModuleMasterList>
                </Suspense> : null}
        </DefaultPageLayout >
    )
}
export default memo(ModuleGroupMaster) 
