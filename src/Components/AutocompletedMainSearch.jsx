// @ts-nocheck
import React, { memo, useState } from 'react'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/joy';
import search from '../assets/SEO.gif'
import { baseColor } from '../Constant/Constant';

const AutocompletedMainSearch = () => {
    const options = ['Option 1', 'Option 2'];

    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');

    return (
        <Box className="flex flex-1 justify-center">
            {/* <FormLabel>Controllable</FormLabel> */}
            <Autocomplete
                startDecorator={<img src={search} alt='search' className="flex w-10 h-10" />}
                placeholder="Controllable"
                size='lg'
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                autoHighlight={false}
                options={options}
                // sx={{ width: 300 }}
                sx={{
                    boxShadow: 0,
                    width: "50%",
                    "--Input-minHeight": "62px",
                    "--Input-radius": "45px",
                    "--Input-gap": "13px",
                    "--Input-paddingInline": "26px",
                    "--Input-decoratorChildHeight": "44px",
                    "--Chip-minHeight": "35px",
                    "--Chip-radius": "0px",
                    "--Icon-fontSize": "26px",
                    '&.MuiAutocomplete-root': {
                        "--Input-focusedHighlight": baseColor.secondary,
                        "--Input-boxShadow": 'none',
                        // borderColor: 'red',
                        // backgroundColor: 'red',
                        // outlineColor: 'red',

                    },
                }}
            />
        </Box>
    )
}

export default memo(AutocompletedMainSearch)