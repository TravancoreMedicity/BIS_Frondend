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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllModules } from '../../../api/commonAPI';
import { Edit } from 'iconoir-react'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState';

const ModuleNameMaster = () => {

    const queryClient = useQueryClient()

    const ModuleList = lazy(() => import('../../../Components/CustomTable'));

    const navigation = useNavigate()

    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

    const [viewtable, setViewTable] = useState(0)
    const [editData, setEditData] = useState(0)
    const [moduleDetails, setmoduleDetails] = useState({
        module_slno: 0,
        module_name: '',
        module_status: 0
    })
    const { module_name, module_status } = moduleDetails

    const { data: AllmoduleNameList } = useQuery({
        queryKey: ["AllmoduleList"],
        queryFn: getAllModules,
        staleTime: Infinity,
    });

    const handleChange = (e) => {
        setmoduleDetails({ ...moduleDetails, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        if (editData === 0) {
            if (moduleDetails.module_name === '') {
                warningNofity('Name Of the Module cannot be empty');
                return;
            }
            const postdata = {
                module_name: moduleDetails?.module_name,
                module_status: moduleDetails?.module_status
            }
            const response = await axiosApi.post('/ModuleNameMaster/insertModuleName', postdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['AllmoduleList'])
                succesNofity(message)
                setmoduleDetails({
                    module_slno: 0,
                    module_name: '',
                    module_status: 0
                });
            }
            else {
                warningNofity(message)
            }
        }
        else {
            const patchdata = {
                module_slno: moduleDetails?.module_slno,
                module_name: moduleDetails?.module_name,
                module_status: moduleDetails?.module_status

            }
            const response = await axiosApi.patch('/ModuleNameMaster/editModuleName', patchdata)
            const { message, success } = response.data;
            if (success === 1) {
                queryClient.invalidateQueries(['AllmoduleList'])
                succesNofity(message)
                setmoduleDetails({
                    module_slno: 0,
                    module_name: '',
                    module_status: 0
                });
            }
            else {
                warningNofity(message)
            }
        }
    }, [moduleDetails, editData, queryClient, loggedUser])

    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    const EditBtn = useCallback((item) => {
        setEditData(1);
        setmoduleDetails({
            module_slno: item?.bis_module_slno,
            module_name: item?.bis_module_name,
            module_status: item?.bis_module_status
        });
    }, [setEditData, setmoduleDetails]);

    return (
        <DefaultPageLayout label="Module Name Master" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'module_name', value: e.target.value } })}
                        values={module_name}
                        placeholder="Enter Module Name"
                        labelName='Module Name'
                        type="text"
                    />
                    <CustomSelectWithLabel
                        labelName='Module Status'
                        dataCollection={userStatus}
                        values={Number(module_status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'module_status', value: val } })}
                        placeholder={"Module Status"}
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
                    <ModuleList tableHeaderCol={['Action', 'Slno', 'Module Name', 'Status']} >
                        {
                            AllmoduleNameList?.map((item, idx) => (
                                <tr key={idx}>
                                    <td ><Edit onClick={() => EditBtn(item)} style={{
                                        color: "rgba(var(--color-pink))",
                                        ":hover": {
                                            color: "grey",
                                        }, p: 0.5
                                    }} /></td>
                                    <td>{idx + 1}</td>
                                    <td>{item?.bis_module_name?.toUpperCase()}</td>
                                    <td>{item?.bis_module_status === 1 ? "Active" : item?.bis_module_status === 2 ? "Inactive" : "Suspented"}</td>
                                </tr>
                            ))
                        }
                    </ModuleList>
                </Suspense> : null}
        </DefaultPageLayout >
    )
}

export default memo(ModuleNameMaster)

