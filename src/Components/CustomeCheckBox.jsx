import React, { memo } from 'react'
import Checkbox from '@mui/joy/Checkbox'
import Close from '@mui/icons-material/Close';
import { useState } from 'react';
import { useEffect } from 'react';

const CustomeCheckBox = ({
    lable,
    size,
    color,
    values, // 1 for true and 0 for false
    variant,
    handleChangeChecked
}) => {
    return (
        <Checkbox
            label={lable || 'Checkbox'}
            variant={variant || 'outlined'}
            size={size || 'md'}
            color={color || 'primary'}
            uncheckedIcon={<Close />}
            sx={{
                flexGrow: 1,
                color: 'rgba(0,0,0,0.8)',
                bgcolor: 'rgba(var(--input-bg-color))',
                fontFamily: 'var(--font-varient)',
                border: '1px solid rgba(var(--border-primary))',
                borderRadius: '6px',
                p: 0.6,
                fontSize: '0.955rem'
            }}
            checked={Boolean(values)}
            onChange={handleChangeChecked}
        />
    )
}

export default memo(CustomeCheckBox)