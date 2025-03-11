import React from 'react'
import { memo } from 'react'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getSeelctSubCategoryList } from '../api/commonAPI'
import { useQuery } from '@tanstack/react-query'
import { errorNofity } from '../Constant/Constant'

const SelectSubCategoryMater = ({ handleChange, value, label, catSlno }) => {

    const { isLoading, data, error } = useQuery({
        queryKey: ['selectSubCategory'],
        queryFn: getSeelctSubCategoryList
    })
    if (error) return errorNofity('An error has occurred: ' + error)

    return (
        <CustomSelectWithLabel
            labelName={label || 'List'}
            dataCollection={data?.filter((item) => item.catSlno === catSlno)}
            values={Number(value)}
            handleChangeSelect={handleChange}
            placeholder={isLoading ? "Loading..." : "Select here ..."}
        />
    )
}

export default memo(SelectSubCategoryMater)