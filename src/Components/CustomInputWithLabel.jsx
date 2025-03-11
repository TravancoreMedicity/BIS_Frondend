import React from 'react'
import { memo } from 'react'
import { Box, IconButton, Input, Typography } from '@mui/joy'
import { baseColor, customInputHeight } from '../Constant/Constant'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import RefreshIcon from '@mui/icons-material/Refresh';
import { PageEdit } from 'iconoir-react'

const CustomInputWithLabel = ({
    placeholder,
    labelName,
    sx,
    type,
    values,
    handleInputChange
}) => {
    return (
        <Box className="flex flex-1 flex-col" >
            <Typography sx={{
                fontWeight: 600,
                opacity: 0.9,
                pl: 0.2,
                fontFamily: 'var(--font-varient)',
                color: 'rgba(var(--font-primary-white))'
            }}
                fontSize='0.7rem' >{labelName}</Typography>
            <Input
                startDecorator={<PageEdit color='rgba(var(--icon-primary))' className='iconColor' />}
                endDecorator={
                    <RefreshIcon sx={{ color: 'rgba(var(--icon-primary))', }} className='iconColor' />
                }
                placeholder={placeholder}
                size='sm'
                value={values}
                onChange={handleInputChange}
                variant='outlined'
                type={type}
                sx={{
                    fontFamily: 'var(--font-varient)',
                    fontSize: '0.950rem',
                    fontWeight: '500',
                    backgroundColor: 'rgba(var(--input-bg-color))',
                    borderColor: 'rgba(var(--input-border-color))',
                    color: 'rgba(var(--input-font-color))',
                    borderWidth: '2.8px',
                    borderRadius: '6px',
                    "&.MuiInput-root": {
                        "--Input-focusedHighlight": 'none',
                        "--Input-focusedShadow": 'none',
                    },
                    ':hover': {
                        backgroundColor: 'rgba(var(--input-hover-bg-color))',
                        borderColor: 'rgba(var(--input-hover-border-color))',
                        color: 'rgba(var(--input-hover-font-color))',
                        '.iconColor': {
                            color: 'rgba(var(--icon-green))',
                        }
                    },
                    transition: 'none',
                    // ...customInputHeight,
                    // ...sx,
                }}
            />
        </Box>
    )
}

export default memo(CustomInputWithLabel) 