import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { memo } from 'react'
import { errorNofity } from '../Constant/Constant'
import CustomSelectWithLabel from './CustomSelectWithLabel'
import { getSelectCourseTypeList } from '../api/commonAPI'

const SelectCmpCourseType = ({ handleChange, value, label }) => {

  const { isLoading, data, error } = useQuery({
    queryKey: ['selectCourseType'],
    queryFn: getSelectCourseTypeList,
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

export default memo(SelectCmpCourseType)