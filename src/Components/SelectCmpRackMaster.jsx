import React from 'react'

import CustomSelectWithLabel from './CustomSelectWithLabel'
import { errorNofity } from '../Constant/Constant'
import { getRackMasterData } from '../api/commonAPI'
import { memo } from 'react'
import { useQuery } from '@tanstack/react-query'

const SelectCmpRackMaster = ({ handleChange, value, label }) => {
    const { isLoading, data, error } = useQuery({
        queryKey: ['selectRackMasterData'],
        queryFn: getRackMasterData,
        staleTime: Infinity
    })
    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={data}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectCmpRackMaster) 