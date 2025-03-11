import React, { memo } from 'react'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { baseColor } from '../Constant/Constant';

const CustomSelect = ({ data, placeholder, onChangeSelect, value, icons }) => {
    return (
        <Select
            // defaultValue={0}
            value={value}
            size='sm'
            startDecorator={icons}
            slotProps={{
                listbox: {
                    sx: {
                        backgroundColor: 'rgba(var(--list-bg-color))',
                        borderColor: 'rgba(var(--list-border-color))',
                        '& .MuiOption-root': {
                            color: "rgba(var(--list-font-color))",
                        },
                        '& .MuiOption-root:hover': {
                            backgroundColor: 'rgba(var(--list-hover-bg-color))',
                            color: 'rgba(var(--list-hover-font-color))',
                        },
                        '& .MuiOption-highlighted': {
                            color: 'rgba(var(--list-hover-font-color))',
                        },
                    },
                },
            }}
            sx={{
                transition: 'none',
                width: '100%',
                boxShadow: 'none',
                borderWidth: '2.8px',
                '&.MuiSelect-root': {
                    "--Select-focusedHighlight": 'none',
                    "--Select-focusedThickness": '1.1px',
                    "--Select-boxShadow": 'none',
                },
                borderRadius: '6px',
                backgroundColor: 'rgba(var(--input-bg-color))',
                borderColor: 'rgba(var(--input-border-color))',
                color: 'rgba(var(--input-font-color))',
                ':hover': {
                    transition: 'none',
                    backgroundColor: 'rgba(var(--input-hover-bg-color))',
                    borderColor: 'rgba(var(--input-hover-border-color))',
                    color: 'rgba(var(--input-hover-font-color))',
                    '.iconColor': {
                        color: 'rgba(var(--icon-green))',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'rgba(var(--icon-green))',
                    }
                },
                '& .MuiSvgIcon-root': {
                    color: 'rgba(var(--icon-primary))',
                },

            }}
            onChange={onChangeSelect}
        >
            <Option value={0} >{placeholder}</Option>
            {
                data?.map((val, ind) => (<Option key={ind} value={val.value}>{val.label}</Option>))
            }
        </Select>
    )
}

export default memo(CustomSelect)