import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getSelectCustodianDepartmentData } from '../api/commonAPI'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'

const SelectCmpCustodianMaster = ({ handleChange, value, label }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['selectCustodianMasterData'],
        queryFn: getSelectCustodianDepartmentData,
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

export default SelectCmpCustodianMaster