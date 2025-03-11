import { Box, Sheet, Table } from '@mui/joy'
import React, { memo } from 'react'

const CustomTable = ({
    tableHeaderCol,
    children
}) => {
    return (
        <Sheet sx={{
            mx: 10,
            mt: 5,
            minHeight: 300,
            maxHeight: 400,
            overflow: 'auto',
            backgroundColor: 'rgba(var(--bg-card))',
            fontFamily: 'var(--font-varient)',
            color: 'rgba(var(--font-primary-white))'
        }} >
            <Table
                aria-label="basic table"
                borderAxis="x"
                size="sm"
                stickyHeader
                // stripe="even"
                sx={{
                    backgroundColor: 'rgba(var(--bg-card))',
                    fontFamily: 'var(--font-varient)',
                    color: 'rgba(var(--font-primary-white))'
                }}
            >
                <thead>
                    <tr>
                        {tableHeaderCol?.map(val => <th key={val}
                            style={{
                                backgroundColor: 'rgba(var(--bg-common))',
                                fontFamily: 'var(--font-varient)',
                                color: 'rgba(var(--font-primary-white))',
                                borderTopWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: 'rgba(var(--border-primary))'
                            }}
                        >{val}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </Table>
        </Sheet>
    )
}

export default memo(CustomTable) 