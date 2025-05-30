import { Box } from '@mui/joy'
import React, { memo } from 'react'
import { Skeleton } from '@mui/material';
import newicon from '../../../assets/logo.png'

const LoginlogoHeader = () => {
    return (
        <>
            <Box
                className="flex items-center justify-start w-40 h-40 border-1 rounded-full"
                sx={{
                    filter: `drop-shadow(5px 5px 20px rgba(224, 171, 196, 0.61))`,
                }}
            >
                <Box
                    sx={{
                        width: { xs: 120, sm: 120 },
                        height: { xs: 120, sm: 120 },
                    }}
                >
                    {
                        newicon ?
                            <img
                                src={newicon}
                                alt=""
                                width={'100%'}
                                height={'100%'}
                            />
                            :
                            <Skeleton
                                variant="circular"
                                width={80}
                                height={80}
                                sx={{
                                    background: 'linear-gradient(45deg,rgba(123, 31, 162, 0.59),rgba(194, 24, 92, 0.6),rgba(25, 118, 210, 0.62))'
                                }}
                            />
                    }

                </Box>
            </Box>
        </>
    )
}

export default memo(LoginlogoHeader)

