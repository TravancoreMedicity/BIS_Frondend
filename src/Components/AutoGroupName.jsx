// @ts-nocheck
import { Autocomplete, Box, Skeleton } from '@mui/joy'
import React, { memo } from 'react'
import { getSelectGroupList } from '../api/commonAPI';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useEffect } from 'react';

const AutoGroupName = ({ getInputValue, reset }) => {
    const { isLoading, data, error } = useQuery({
        queryKey: ['selectGroupMast'],
        queryFn: getSelectGroupList,
        staleTime: Infinity
    })

    const [value, setValue] = useState({ value: 0, label: 'Select Group' });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setValue(null);
    }, [reset]);


    return (
        <Box>
            {
                isLoading === true || error
                    ? <Skeleton animation="wave" variant='rectangular'
                        sx={{ height: '45px', borderRadius: '23px', bgcolor: 'rgba(var(--list-hover-bg-color))' }} />
                    : <Autocomplete
                        size='md'
                        placeholder="Select Group"
                        options={[{ value: 0, label: 'Select Group' }, ...data] || []}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) => option.value === value.value}
                        onChange={(event, newValue) => {
                            if (newValue === null) {
                                setValue({ value: 0, label: '' })
                            } else {
                                setValue(newValue);
                                getInputValue({ target: { name: 'group', value: newValue.value } });
                            }
                        }}
                        value={value}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        slotProps={{
                            listbox: {
                                sx: {
                                    fontFamily: 'var(--font-varient)',
                                    fontSize: '0.850rem',
                                    fontWeight: '500',
                                    backgroundColor: 'rgba(var(--list-bg-color))',
                                    borderColor: 'rgba(var(--list-border-color))',
                                    '& .MuiAutocomplete-option': {
                                        color: "rgba(var(--list-font-color))",
                                    },
                                    '& .MuiAutocomplete-option:hover': {
                                        backgroundColor: 'rgba(var(--list-hover-bg-color))',
                                        color: 'rgba(var(--list-hover-font-color))',
                                        fontFamily: 'var(--font-varient)',
                                        fontSize: '0.850rem',
                                        fontWeight: '600',
                                    },
                                    '& .MuiOption-highlighted': {
                                        color: 'rgba(var(--list-hover-font-color))',
                                    },
                                },
                            },
                        }}
                        sx={{
                            minWidth: 300,
                            fontFamily: 'var(--font-varient)',
                            fontSize: '0.850rem',
                            fontWeight: '600',
                            "--Input-minHeight": "20px",
                            "--Input-radius": "6px",
                            "--Input-gap": "14px",
                            "--Input-paddingInline": "16px",
                            "--Input-decoratorChildHeight": "35px",
                            borderWidth: '2.8px',
                            "&.MuiAutocomplete-root": {
                                "--Input-focusedHighlight": 'none',
                                backgroundColor: 'rgba(var(--input-bg-color))',
                                borderColor: 'rgba(var(--input-border-color))',
                                color: 'rgba(var(--input-font-color),0.8)',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'rgba(var(--input-font-color))',
                            },
                            '&:hover': {
                                // '--Input-focusedHighlight': 'darkgreen',
                                backgroundColor: 'rgba(var(--input-hover-bg-color))',
                                borderColor: 'rgba(var(--input-hover-border-color))',
                                color: 'rgba(var(--input-hover-font-color))',
                                '.MuiSvgIcon-root': {
                                    color: 'rgba(var(--input-hover-font-color))',
                                }
                            },
                        }}
                    />
            }
        </Box>
    )
}

export default memo(AutoGroupName)