import { IconButton, Input } from '@mui/joy'
import React, { memo } from 'react'
import { baseColor, customInputHeight } from '../Constant/Constant'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import RefreshIcon from '@mui/icons-material/Refresh';
import { PageEdit } from 'iconoir-react'

const CustomInput = ({
    placeholder,
    sx,
    value,
    onChange,
}) => {
    return (
        <Input
            startDecorator={<PageEdit width={25} height={25} color='rgba(var(--icon-primary))' className='iconColor' style={{ transition: 'none' }} />}
            // endDecorator={<IconButton variant='soft' ><RefreshIcon sx={{ color: baseColor.primarylight, }} /></IconButton>}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            size='sm'
            variant='outlined'
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
                ...sx,
            }}
        />

    )
}

export default memo(CustomInput)