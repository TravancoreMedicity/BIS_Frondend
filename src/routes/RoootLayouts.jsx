// @ts-nocheck
import React, { useCallback, useState, memo, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import {
  errorNofity,
  isValidOTPMobileNumber,
  sanitizeInput,
  succesNofity,
  warningNofity,
} from "../Constant/Constant";

// @ts-ignore
import OtpInput from 'react-otp-input';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axiosApi from "../Axios/Axios";
import { ToastContainer } from "react-toastify";
import { getTime } from "date-fns";
import CustomBackDrop from "../Components/CustomBackDrop";

import useAuth from "../hooks/useAuth";
import { socket } from "../ws/socket";

import { User, KeyBack } from 'iconoir-react'
import Logo from "../assets/images/logo.png"




const RoootLayouts = () => {
  // import functions
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  // state mangement
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [OTP, setOTP] = useState(0);
  const [onclickGenerateOTPbtn, setonclickGenerateOTPbtn] = useState(false);
  const [loginwithUserCred, setloginwithUserCred] = useState(false);

  useEffect(() => {
    const message = localStorage.getItem("message");
    if (message) {
      warningNofity(message);
      localStorage.removeItem("app_auth");
      localStorage.removeItem("message");
    }
  }, [])

  // GENERATE OTP FUNCTION
  const generateOtp = useCallback(() => {
    // console.log(mobileNumber);
    if (mobileNumber === "") {
      warningNofity("Mobile Number cannot be empty");
      return;
    }

    if (!isValidOTPMobileNumber(mobileNumber)) {
      //validity checking for 12 digit mobile number
      warningNofity("Invalid Mobile Number");
      return;
    }
    setLoading(true);
    const sanitizedMobileNumber = sanitizeInput(mobileNumber);
    // console.log("sanitizedMobileNumber", sanitizedMobileNumber);

    axiosApi.get("/generateOTP/" + sanitizedMobileNumber).then((res) => {
      const { message, success } = res.data;
      // console.log("success", success);

      if (success === 0) {
        errorNofity(message);
      } else if (success === 1) {
        warningNofity(message);
        setLoading(false);
      } else if (success === 2) {
        succesNofity(message);
        setonclickGenerateOTPbtn(true);
        setLoading(false);
      } else {
        errorNofity(message);
        setLoading(false);
      }
    });
  }, [mobileNumber]);

  // VERIFY OTP FUNCTION
  const verifyOTPFunction = useCallback(() => {
    try {
      const sanitizedOTP = sanitizeInput(OTP);
      const mobNumber = sanitizeInput(mobileNumber);

      const slicedMobileNMumber = mobNumber.slice(2);

      const postDataToVerifyOTP = {
        otp: sanitizedOTP,
        mobile: slicedMobileNMumber,
        method: 2 // otp method
      };

      // after verify OTP page redirected to dashboard

      axiosApi.post("/user/verifyOTP", postDataToVerifyOTP, { withCredentials: true })
        .then((res) => {
          const { message, success, userInfo } = res.data;

          // after verify OTP page redirected to dashboard
          if (success === 0) {
            errorNofity(message); // database error
          } else if (success === 1) {
            warningNofity(message); // incorrected OTP
          } else if (success === 2) {
            succesNofity(message); // OTP Verified
            const { user_slno, name, login_type, tokenValidity } = JSON.parse(userInfo);
            const authData = {
              authNo: btoa(user_slno),
              authName: btoa(name),
              authType: btoa(login_type),
              authTimeStamp: getTime(new Date(tokenValidity)),
            };
            // console.log(authData, 'ygvgyv');

            setAuth((prev) => {
              return {
                ...prev,
                accessToken: authData.authToken,
                userInfo: authData,
              };
            });
            // socket.emit("login", { user_slno });  // EMIT THE USER LOGIN EVENT TO SOCKET
            localStorage.setItem("app_auth", JSON.stringify(authData));
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
              navigate("/Home/Dashboard", { replace: true });
            }, 2000);
          } else {
            errorNofity(message);
          }
        });
    } catch (error) {
      errorNofity(error);
    }
  }, [OTP, mobileNumber]);

  // RESEND OTP FUNCTION
  const resendOTPFunction = useCallback(() => {
    setonclickGenerateOTPbtn(false);
  }, []);

  // LOGIN FUNCTION WITH USER CREDENTIALS
  const loginwithCredentials = useCallback(() => {
    setloginwithUserCred(true);
  }, []);

  // return function for regerate OTP form

  const handleReturnToOTPLoginPage = useCallback(() => {
    setloginwithUserCred(false);
  }, []);

  const [top, setTop] = useState(85);
  const handleChange = () => {
    setTop((prev) => prev === 85 ? 15 : 85);
  }


  /*****USER BASED AUTHENTICATION*******/
  const [userState, setUserState] = useState({
    userName: "",
    passWord: ""
  });

  const handleChangeUser = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: sanitizeInput(e.target.value)
    })
  }

  const handleLoginButton = useCallback(async () => {

    navigate("/Home/Dashboard", { replace: true });

    // try {

    //   const postData = {
    //     userName: userState.userName,
    //     passWord: userState.passWord,
    //     method: 3 // user credentials auth method
    //   }

    //   const result = await axiosApi.post("/user/checkUserCres", postData, { withCredentials: true })
    //   console.log(result.data)

    //   const { message, success, userInfo } = result.data;

    //   if (success === 0) {
    //     errorNofity(message); // database error
    //   } else if (success === 1) {
    //     warningNofity(message); // incorrected OTP
    //   } else if (success === 2) {
    //     succesNofity(message); // OTP Verified
    //     const { user_slno, name, login_type, tokenValidity } = JSON.parse(userInfo);
    //     const authData = {
    //       authNo: btoa(user_slno),
    //       authName: btoa(name),
    //       authType: btoa(login_type),
    //       authTimeStamp: getTime(new Date(tokenValidity)),
    //     };

    //     setAuth((prev) => {
    //       return {
    //         ...prev,
    //         accessToken: authData.authToken,
    //         userInfo: authData,
    //       };
    //     });
    //     socket.emit("login", { user_slno });  // EMIT THE USER LOGIN EVENT TO SOCKET
    //     localStorage.setItem("app_auth", JSON.stringify(authData));
    //     setOpen(true);
    //     setTimeout(() => {
    //       setOpen(false);
    //       navigate("/Home/Dashboard", { replace: true });
    //     }, 2000);
    //   } else {
    //     errorNofity(message);
    //   }


    // } catch (error) {
    //   console.log(error)
    // }

  }, [userState])

  return (
    <Box className="flex flex-col justify-center items-center w-full h-screen "
      sx={{ backgroundColor: 'rgba(253, 253, 253)' }}
    >
      <ToastContainer />
      <CustomBackDrop setOpen={setOpen} open={open} />
      {/* <ScreenCheck /> */}
      <Box
        sx={{
          position: "relative",
          minHeight: '55%',
          maxWidth: "470px",
          width: "100%",
          borderRadius: '30px',
          overflow: 'hidden',
          outline: 'none',
          bgcolor: 'rgba(0,125,196,0.6)',
          boxShadow: "0 -5px 10px rgba(0, 0, 0, 0.1)",
          border: '1px solid rgba(0,125,196,1)',
        }}
      >
        <Box
          sx={{
            minHeight: '100%',
            maxWidth: "470px",
            width: "100%",
            bgcolor: 'rgba(0,125,196,0.6)',
            borderRadius: '30px 30px 30px 30px',
            boxShadow: "0 -5px 10px rgba(0, 0, 0, 0.1)",
            overflow: 'hidden',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Box className="h-20 p-4 flex justify-center items-center text-white">
            <button onClick={handleChange}
              style={{
                fontFamily: 'var(--font-varient)',
                color: 'white',
                fontWeight: 600
              }}
            >sign in with otp</button>
          </Box>
          {onclickGenerateOTPbtn ? (
            // {/* OTP Verification form start here */}
            <Box className="flex flex-1 flex-col ">
              <Box className="flex justify-center items-end" >
                <Box component={'img'} src={Logo} width={'68px'} height={'105px'} className="flex ml-[-35px]" />
                <Box className="flex float-start pb-2" sx={{ color: 'white', fontFamily: 'var(--font-varient)', fontSize: '1.2rem', fontWeight: 600 }} >Travancore Medicity</Box>
              </Box>
              <Typography
                level="body-sm"
                className="text-green-900"
                sx={{
                  color: "rgba(255,255,255, 0.8)",
                  textAlign: "center",
                  pb: 1,
                }}
              >
                Verify your Phone number
              </Typography>
              <OtpInput
                value={OTP}
                onChange={setOTP}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                containerStyle="flex items-center justify-center gap-2"
                inputStyle="!mr-0 py-[0.4rem] !w-[2.4rem] rounded-lg outline-1 outline-[#53b6e7] text-[#001C30] text-xl"
              />
              <Box className="flex pt-1 justify-center mt-4">
                <Button
                  onClick={verifyOTPFunction}
                  size="md"
                  variant="outlined"
                  // color="neutral"
                  className="w-[17.5rem] h-10"
                  sx={{
                    color: "white",
                    borderColor: "#53b6e7",
                    borderRadius: 12,
                    "&:hover": {
                      color: "#fff",
                      borderColor: "#53b6e7",
                      backgroundColor: "#53b6e7",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  Verify OTP
                </Button>
              </Box>
              <Box>
                {/* RESEND OTP FUNCTION HERE */}
              </Box>
            </Box>
          ) : (
            // {/* OTP verification form end here */}
            <Box className="flex flex-1 flex-col p-4 items-center ">
              <Box className="flex justify-center items-end" >
                <Box component={'img'} src={Logo} width={'68px'} height={'105px'} className="flex ml-[-35px]" />
                <Box className="flex float-start pb-2" sx={{ color: 'white', fontFamily: 'var(--font-varient)', fontSize: '1.2rem', fontWeight: 600 }} >Travancore Medicity</Box>
              </Box>
              <Box className="flex items-center flex-col  ">
                <Typography
                  level="body-md"
                  fontFamily="Roboto"
                  sx={{ color: "white", fontFamily: 'var(--font-varient)' }}
                >
                  Enter your user credentials
                </Typography>
                <Box>
                  <PhoneInput
                    country={"in"}
                    onlyCountries={["in"]}
                    autoFormat={true}
                    disableDropdown={true}
                    inputStyle={{
                      height: 50,
                      width: 300,
                      border: "1px solid rgba(0,125,196,1)",
                      borderRadius: 10,
                      opacity: 1,
                    }}
                    buttonStyle={{
                      borderRadius: 10,
                      height: 50,
                      opacity: 0.8,
                      overflow: "hidden",
                      border: "1px solid rgba(0,125,196,1)",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    value={mobileNumber}
                    onChange={(phone) => setMobileNumber(phone)}
                  />
                </Box>
                <Box
                  className="flex mt-2 border drop-shadow-lg justify-center items-center"
                  sx={{
                    width: 300,
                    height: 50,
                    borderRadius: 10,
                    cursor: "pointer",
                    color: "rgba(0,125,196,1)",
                    backgroundColor: "#fff",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                  }}
                  onClick={generateOtp}
                >
                  Generate OTP
                </Box>
              </Box>
              {loading && (
                <>
                  <Box className="flex justify-center items-center mt-1">
                    <CircularProgress
                      sx={{
                        color: "rgba(216,75,154,1)",
                        paddingX: "0.8rem",
                        "--CircularProgress-size": "18px",
                        "--CircularProgress-trackThickness": "1px",
                        "--CircularProgress-progressThickness": "2px",
                      }}
                    />
                    <div className="text-center font-semibold text-sm " style={{ color: "rgba(255,255,255,0.8)" }}>
                      validating login credential
                    </div>
                  </Box>
                </>
              )}
            </Box>
          )}
        </Box>
        {/* USER CREDENTIALS BASED LOGIN MODAL */}
        {/* <Box
          sx={{
            top: `${top}%`,
            position: 'absolute',
            minHeight: '85%',
            maxWidth: "470px",
            width: "100%",
            bgcolor: 'rgba(255,255,255)',
            borderRadius: '30px 30px',
            transition: 'top 0.5s ease-in-out',
            boxShadow: "0 -5px 10px rgba(0, 0, 0, 0.1)",
            overflow: 'hidden',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <Box
            className="h-20 p-4 flex justify-center items-center text-white"
          >
            <button onClick={handleChange}
              style={{
                backgroundColor: 'white',
                fontFamily: 'var(--font-varient)',
                color: 'rgba(0,125,196,1)',
                fontWeight: 600
              }}
            >sign in with credentials</button>
          </Box>
          <Box className="flex justify-center items-end" >
            <Box component={'img'} src={Logo} width={'68px'} height={'105px'} className="flex ml-[-35px]" />
            <Box className="flex float-start pb-2" sx={{ color: 'rgba(0,125,196,1)', fontFamily: 'var(--font-varient)', fontSize: '1.2rem', fontWeight: 600 }} >Travancore Medicity</Box>
          </Box>
          <Box
            className="flex flex-1 flex-col gap-1 px-14 "
            sx={{ width: "100%", }}
          >
            <Box className="flex justify-center flex-col">
              <Typography
                sx={{
                  color: 'rgba(0,125,196,0.6)',
                  fontFamily: "var(--font-varient)",
                  fontSize: 12,
                  fontWeight: 600,
                  pl: 0,
                }}
              >
                User Name
              </Typography>
              <Input
                fullWidth
                startDecorator={<User color="rgba(216,75,154,1)" />}
                type="text"
                name="userName"
                value={userState.username}
                onChange={handleChangeUser}
                placeholder="enter your username"
                variant="outlined"
                sx={{
                  fontFamily: "var(--font-varient)",
                  border: "1px solid rgba(0,125,196,0.6)",
                  "&::before": {
                    border: "0.5px solid rgba(216,75,154,0.6)",
                    transform: "scaleX(0)",
                    left: "2.5px",
                    right: "2.5px",
                    bottom: 0,
                    top: "unset",
                    transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                    borderRadius: 0,
                    borderBottomLeftRadius: "64px 20px",
                    borderBottomRightRadius: "64px 20px",
                  },
                  "&:focus-within::before": {
                    transform: "scaleX(1)",
                  },
                }}
              />
            </Box>
            <Box className="flex flex-col justify-center ">
              <Typography
                sx={{
                  color: 'rgba(0,125,196,0.6)',
                  fontFamily: "var(--font-varient)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Password
              </Typography>
              <Input
                type="password"
                startDecorator={<KeyBack color="rgba(216,75,154,1)" />}
                fullWidth
                name="passWord"
                value={userState.passWord}
                onChange={handleChangeUser}
                placeholder="enter your password"
                sx={{
                  border: "1px solid rgba(0,125,196,0.6)",
                  "&::before": {
                    border: "0.5px solid rgba(216,75,154,0.6)",
                    transform: "scaleX(0)",
                    left: "2.5px",
                    right: "2.5px",
                    bottom: 0,
                    top: "unset",
                    transition:
                      "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
                    borderRadius: 0,
                    borderBottomLeftRadius: "64px 20px",
                    borderBottomRightRadius: "64px 20px",
                  },
                  "&:focus-within::before": {
                    transform: "scaleX(1)",
                  },
                }}
              />
            </Box>
            <Box className="flex flex-col">
              <Box
                className="flex border rounded-[5px] py-2 my-1 items-center justify-center"
                sx={{
                  backgroundColor: 'rgba(0,125,196,0.6)',
                  cursor: "pointer",
                  border: "1px solid rgba(0,125,196,0.6)",
                }}
                onClick={handleLoginButton}
              >
                <Typography
                  level="body-md"
                  fontWeight={600}
                  sx={{
                    color: "white",
                    fontFamily: "var(--font-varient)",
                    textAlign: "center",
                  }}
                >
                  Login
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Box >
  );
};
export default memo(RoootLayouts);
