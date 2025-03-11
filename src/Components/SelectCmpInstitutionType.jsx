import { useQuery } from '@tanstack/react-query'
import React, { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getSelectInstitutionTypeList } from '../api/commonAPI'

const SelectCmpInstitutionType = ({ handleChange, value, label }) => {
    const { isLoading, data, error } = useQuery({
        queryKey: ['selectInstiteType'],
        queryFn: getSelectInstitutionTypeList,
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

export default memo(SelectCmpInstitutionType)