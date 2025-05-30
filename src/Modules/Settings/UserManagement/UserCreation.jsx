// @ts-nocheck
import React, { lazy, Suspense } from 'react'
import { memo } from 'react'
import DefaultPageLayout from '../../../Components/DefaultPageLayout'
import CustomInputWithLabel from '../../../Components/CustomInputWithLabel'
import { IconButton, Radio, RadioGroup, Tooltip } from '@mui/joy'
import { errorNofity, isValidMobileNumber, isValidPassword, sanitizeInput, succesNofity, validateEmail, warningNofity } from '../../../Constant/Constant'
import MasterPageLayout from '../../../Components/MasterPageLayout'
import CustomSelectWithLabel from '../../../Components/CustomSelectWithLabel'
import { useNavigate } from 'react-router-dom'
import { passwordValidity, signInLimit, userStatus } from '../../../Constant/Data'
import { useState } from 'react'
import { useCallback } from 'react'
import axiosApi from '../../../Axios/Axios'
import CloseIcon from '@mui/icons-material/Close';
import QueueIcon from '@mui/icons-material/Queue';
import SearchIcon from '@mui/icons-material/Search';
import CustomeCheckBox from '../../../Components/CustomeCheckBox'
import { Box } from '@mui/material'
import { addDays, format } from 'date-fns'
import CustomBackDropWithOutState from '../../../Components/CustomBackDropWithOutState'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllUsers, userTypes } from '../../../api/commonAPI'
import { Edit } from 'iconoir-react'

const UserList = lazy(() => import('../../../Components/CustomTable'));

const UserCreation = () => {
    const navigation = useNavigate()
    const queryClient = useQueryClient()
    const [userManagemt, setUserManagemt] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        login_Type: 0,
        password_Validity: 0,
        user_Status: 0,
        signIn_Limit: 0,
        setOndayLogin: "N",
        loginMethod: 1,
        printerUsability: "N",
        user_slno: 0,
        signInLimit: 0
    })
    const [viewtable, setViewTable] = useState(0)
    const [editData, setEditData] = useState(0)
    const loggedUser = atob(JSON.parse(localStorage.getItem("app_auth"))?.authNo)

    const { data: AllUserList } = useQuery({
        queryKey: ["userList"],
        queryFn: getAllUsers,
        staleTime: Infinity,
    });
    const { data: userType } = useQuery({
        queryKey: ["userTypeList"],
        queryFn: userTypes,
        staleTime: Infinity,
    });

    const { name, mobile, email, password, login_Type, password_Validity, user_Status, signIn_Limit, setOndayLogin, loginMethod, printerUsability } = userManagemt;

    const handleChange = (e) => {
        setUserManagemt({ ...userManagemt, [e.target.name]: sanitizeInput(e.target.value) })
    }

    const handleSubmitUserManagment = useCallback(async (e) => {
        e.preventDefault();
        const requestData = {
            name: userManagemt.name.trim(),
            mobile: userManagemt.mobile.trim(),
            email: userManagemt.email.trim(),
            login_Type: Number(userManagemt.login_Type),
            password: userManagemt.password,
            password_Validity: Number(userManagemt.password_Validity),
            user_Status: Number(userManagemt.user_Status),
            signIn_Limit_per_day: Number(userManagemt.signIn_Limit),
            setOndayLogin: userManagemt.setOndayLogin,
            loginMethod: Number(userManagemt.loginMethod),
            printerUsability: userManagemt.printerUsability,
        };

        try {
            let response;
            if (editData === 0) {
                // console.log("insert");
                if (userManagemt.name.trim() === '') {
                    warningNofity('Name Of the User cannot be empty');
                    return;
                }

                if (userManagemt.mobile.trim() === '' || !isValidMobileNumber(Number(userManagemt.mobile))) {
                    warningNofity('Mobile Number must be 10 digits');
                    return;
                }

                if (userManagemt.email.trim() === '' || !validateEmail(userManagemt.email)) {
                    warningNofity('A valid email address is required');
                    return;
                }

                if (userManagemt.password.trim() === '' || !isValidPassword(userManagemt.password)) {
                    warningNofity('Password must meet complexity requirements');
                    return;
                }

                // Create new user
                requestData.created_by = Number(loggedUser);
                requestData.lastPasswordChangeDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
                requestData.password_validity_expiry_date = format(addDays(new Date(), Number(userManagemt.password_Validity)), 'yyyy-MM-dd HH:mm:ss');
                // console.log("insert", requestData);

                response = await axiosApi.post('/user/insertUser', requestData);
            } else {
                // console.log("edit");


                const patchdata = {
                    name: userManagemt.name.trim(),
                    mobile: userManagemt.mobile.trim(),
                    email: userManagemt.email.trim(),
                    login_Type: Number(userManagemt.login_Type),
                    password: userManagemt.password,
                    password_Validity: Number(userManagemt.password_Validity),
                    user_Status: Number(userManagemt.user_Status),
                    signIn_Limit: Number(userManagemt.signInLimit),
                    setOndayLogin: userManagemt.setOndayLogin,
                    loginMethod: Number(userManagemt.loginMethod),
                    printerUsability: userManagemt.printerUsability,
                    user_slno: userManagemt.user_slno,
                    edit_user: Number(loggedUser),
                    edit_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
                };
                // console.log("patchdata", patchdata);

                response = await axiosApi.patch(`/user/editUser`, patchdata);
            }
            const { success, message } = response.data;
            // console.log("response.data", response.data);

            if (success === 1) {
                queryClient.invalidateQueries(['userList'])
                succesNofity(message);
                setUserManagemt({
                    name: '',
                    mobile: '',
                    email: '',
                    password: '',
                    login_Type: 0,
                    password_Validity: 0,
                    user_Status: 0,
                    signIn_Limit: 0,
                    setOndayLogin: "N",
                    loginMethod: 1,
                    printerUsability: "N",
                    user_slno: 0,
                    signInLimit: 0
                });
                setEditData(0);
            } else {
                warningNofity(message);
            }
        } catch (error) {
            errorNofity('Error occurred while processing the request.');
        }
    }, [userManagemt, editData, loggedUser, queryClient]);


    const viewuserList = useCallback(() => {
        setViewTable(1)
    }, [])

    const EditBtn = useCallback((item) => {
        setEditData(1);
        setUserManagemt({
            user_slno: item.user_slno || 0,
            name: item.name || "",
            mobile: item.mobile || "",
            email: item.email || "",
            password: item.password || "",
            login_Type: item.login_type || 0,
            password_Validity: item.password_validity || 0,
            user_Status: item.user_status || 0,
            signIn_Limit: item.sign_in_per_day_limit || 0,
            setOndayLogin: item.is_limited_user === "N" ? "N" : "Y",
            loginMethod: item.login_method_allowed || 1,
            printerUsability: item.printer_access === "N" ? "N" : "Y",
            signInLimit: item.signInLimit
        });
    }, []);

    return (
        <DefaultPageLayout label="User Management" >
            <MasterPageLayout>
                <Box className="flex flex-col gap-1" >
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
                        values={name}
                        placeholder="Name of User"
                        sx={{}}
                        labelName='Name of User'
                        type="text"
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'mobile', value: e.target.value } })}
                        values={mobile}
                        placeholder="Mobile Number"
                        sx={{}}
                        labelName='Mobile Number'
                        type="number"
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'email', value: e.target.value } })}
                        values={email}
                        placeholder="Email - name@example.com"
                        sx={{}}
                        labelName='Email'
                        type='email'
                    />
                    <CustomInputWithLabel
                        handleInputChange={(e) => handleChange({ target: { name: 'password', value: e.target.value } })}
                        values={password}
                        placeholder="*************"
                        sx={{}}
                        labelName='Password'
                        type='password'
                    />
                    <CustomSelectWithLabel
                        labelName='Maximum Password Age Limit'
                        dataCollection={passwordValidity}
                        values={Number(password_Validity)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'password_Validity', value: val } })}
                        placeholder={"Select Maximum Password Age Limit"}
                    />
                    <CustomSelectWithLabel
                        labelName='Number Of Sign In Per Days Limit'
                        dataCollection={signInLimit}
                        values={Number(signIn_Limit)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'signIn_Limit', value: val } })}
                        placeholder={"Select Number Of Sign In Per Days Limit"}
                    />

                    <CustomSelectWithLabel
                        labelName='Login User Type'
                        dataCollection={userType}
                        values={Number(login_Type)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'login_Type', value: val } })}
                        placeholder={"Login User Type"}
                    />
                    <CustomSelectWithLabel
                        labelName='User Status'
                        dataCollection={userStatus}
                        values={Number(user_Status)}
                        handleChangeSelect={(e, val) => handleChange({ target: { name: 'user_Status', value: val } })}
                        placeholder={"Select User Status"}
                    />
                    <Box className="flex flex-row gap-2" >
                        <CustomeCheckBox
                            values={printerUsability === "N" ? false : true}
                            color={'danger'}
                            lable={'Printer Usability'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'printerUsability', value: e.target.checked ? "Y" : "N" }
                            })}
                        />

                        <CustomeCheckBox
                            values={setOndayLogin === "N" ? false : true}
                            color={'danger'}
                            lable={'Limited to 24 hour login'}
                            handleChangeChecked={(e) => handleChange({
                                target: { name: 'setOndayLogin', value: e.target.checked ? "Y" : "N" }
                            })}
                        />
                        <RadioGroup
                            name="radio-buttons-group" orientation='horizontal'
                            sx={{
                                flexGrow: 1,
                                justifyContent: 'space-evenly',
                                alignItems: 'center'
                            }}
                            value={loginMethod}
                            onChange={(e) => handleChange({ target: { name: 'loginMethod', value: e.target.value } })}
                        >
                            <Radio value={1} label="Both" color="primary" />
                            <Radio value={2} label="OTP" color="neutral" />
                            <Radio value={3} label="User" color="danger" />
                        </RadioGroup>
                    </Box>

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
            {viewtable === 1 ? <Suspense fallback={<CustomBackDropWithOutState message={'Loading...'} />} >
                <UserList tableHeaderCol={['Action', 'Slno', 'Name', 'Mobile', 'Email', 'LogIn Type', 'Validity', 'SigIn Limit', 'One Day Log', 'SignIn Per Day', 'Log Method', 'Printer', 'Status']} >
                    {
                        AllUserList?.map((item, idx) => (
                            <tr key={idx}>
                                <td ><Edit onClick={() => EditBtn(item)} style={{
                                    color: "rgba(var(--color-pink))",
                                    ":hover": {
                                        color: "grey",
                                        // border: "rgba(var(--color-pink))",
                                    }, p: 0.5
                                }} /></td>
                                <td>{idx + 1}</td>
                                <td>{item?.name?.toUpperCase()}</td>
                                <td>{item?.mobile}</td>
                                <td sx={{ width: "100%" }}>{item?.email}</td>
                                <td>{item?.login_type === 1 ? "Admin" : "Super Admit"}</td>
                                <td>{item?.password_validity}</td>
                                <td>{item?.sign_in_per_day_limit}</td>
                                <td>{item?.is_limited_user}</td>
                                <td>{item?.sign_in_per_day_count}</td>
                                <td>{item?.login_method_allowed}</td>
                                <td>{item?.printer_access === null || item?.printer_access === "N" ? "Denied" : "Accessible"}</td>
                                <td>{item?.user_status === 1 ? "Active" : item?.user_status === 2 ? "Inactive" : "Suspented"}</td>
                            </tr>
                        ))
                    }
                </UserList>
            </Suspense> : null}
        </DefaultPageLayout >
    )
}

export default memo(UserCreation)
