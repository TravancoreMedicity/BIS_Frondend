import { Box, Divider, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'

const Qtn_linkedItems = () => {

    const [category, setCategory] = useState('');

    const categories = ["Pharmacy", "Consumables", "Biomedical", "General", "Dental"];

    const handleCategoryClick = useCallback((category) => {
        setCategory(category);
    }, []);

    return (
        <Fragment>
            <Box sx={{ minHeight: "10vh", p: 2 }}>
                <Typography sx={{ textAlign: "left", fontWeight: 600, fontSize: "15px", mt: 2, color: '#507687' }}>
                    QUOTATION LINKED ITEMS
                </Typography>

                <Box sx={{ display: "flex", justifyContent: 'center', gap: 2, mt: 1, flexWrap: "wrap", }}>
                    {/* Total Items Box */}
                    <Box sx={{ height: 150, bgcolor: "white", flex: 1, minWidth: 250, p: 2, borderRadius: 2, boxShadow: 2, border: 1, borderColor: "#A2B9A7" }}>
                        <Typography variant="h6" sx={{ textAlign: 'center', color: "#4C585B" }}>Total Items</Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 200,
                                    border: 1,
                                    borderColor: "#A5BFCC",
                                    py: 1.5,
                                    borderRadius: 15,
                                    px: 4,
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography sx={{ color: "#507687", textAlign: "center", fontSize: "24px", fontWeight: 'bold' }}>
                                    5000
                                </Typography>
                            </Box>
                        </Box>
                    </Box>


                    {/* Category Summary Box */}
                    <Box sx={{ height: 150, bgcolor: "white", flex: 3, minWidth: 200, p: 2, borderRadius: 2, boxShadow: 2, border: 1, borderColor: "#A2B9A7" }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 1
                        }}>
                            {categories?.map((label, index) => (
                                <Fragment key={label}>
                                    <Typography
                                        sx={{
                                            color: "#4C585B",
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "green",
                                                textDecoration: "underline"
                                            }
                                        }}
                                        onClick={() => handleCategoryClick(label)}
                                    >
                                        {label}
                                    </Typography>
                                    {index < categories.length - 1 && (
                                        <Divider orientation="vertical" />
                                    )}
                                </Fragment>
                            ))}
                        </Box>
                    </Box>
                </Box>
                {category !== '' ?
                    <Box>{category}</Box> : null}
            </Box>

        </Fragment>
    )
}

export default memo(Qtn_linkedItems) 
