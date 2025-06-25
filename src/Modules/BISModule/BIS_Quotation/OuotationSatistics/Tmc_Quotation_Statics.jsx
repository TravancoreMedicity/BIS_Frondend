import { Box, Button, ButtonGroup, Card, CardContent, Chip, Divider, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { format, startOfMonth, startOfYear, subMonths } from 'date-fns'
import { getTmcActiveItems, getTmcCTotalQtn, getTmcFinalizedQtn, getTmcLinkedItems } from '../../../../api/commonAPI'
import { useQuery } from '@tanstack/react-query';
import CommonHeader from '../../BIS_CommoCode/CommonHeader'

const Tmc_Quotation_Statics = () => {

    const [open, SetOpen] = useState(false);
    // const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    // const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    // const [category, setCategory] = useState('');

    const { data: ActiveItems } = useQuery({
        queryKey: ["qtnActiveItems"],
        queryFn: () => getTmcActiveItems(),
    })
    //linked item wise
    const { data: LinkedItems } = useQuery({
        queryKey: ["qtnLinkedItems"],
        queryFn: () => getTmcLinkedItems(),
    })

    const { data: totalQtn } = useQuery({
        queryKey: ["getTotalQtn"],
        queryFn: () => getTmcCTotalQtn(),
    })

    const { data: FinalizedQtn } = useQuery({
        queryKey: ["getFinalizedQtn"],
        queryFn: () => getTmcFinalizedQtn(),
    })


    // { ST_CODE: '0124', ITEM_COUNT: 10642 }
    // { ST_CODE: '0116', ITEM_COUNT: 8610 }
    // { ST_CODE: '0038', ITEM_COUNT: 3189 }
    // { ST_CODE: '0036', ITEM_COUNT: 6541 }
    // { ST_CODE: 'C004', ITEM_COUNT: 1586 }

    //  Sales           - 0124 ( Central Store Pharmacy)
    //  Consumables     - 0116 ( Consumable Store )
    //  Biomedical      - 0038 (Biomedical Store) 
    //  General Store   - 0036 (General Store)
    //  Dental          - C004 (CRS Dental)


    const ShowDetails = useCallback(() => {
        SetOpen(true);
    }, []);

    //active itmes
    const categoryMap = {
        'C001': 'CRS (common)',
        'C002': 'CRS (sales)',
        'C003': 'CRS - TSSH',
        'C004': 'CRS dental',
        '0037': 'Project Store'
    };

    const { categories: activeCategories, totalCount: activeTotal } = useMemo(() => {
        const itemMap = {};
        let total = 0;

        // Only include ST_CODEs that exist in categoryMap
        (ActiveItems || []).map(item => {
            if (categoryMap[item.ST_CODE]) {
                itemMap[item.ST_CODE] = item.ITEM_COUNT;
                total += item.ITEM_COUNT;
            }
        });

        // Ensure all categories from categoryMap are present in the UI
        const categories = Object.entries(categoryMap).map(([ST_CODE, name]) => ({
            name,
            count: itemMap[ST_CODE] || 0
        }));

        return { categories, totalCount: total };
    }, [ActiveItems]);


    // For Linked Items
    const { categories: linkedCategories, totalCount: linkedTotal } = useMemo(() => {
        const itemMap = {};
        let total = 0;
        // Build map only for items that match categoryMap keys
        (LinkedItems || []).map(item => {
            if (categoryMap[item.su_code]) {
                itemMap[item.su_code] = item.item_count;
                total += item.item_count;
            }
        });
        // Ensure all categories from categoryMap are returned
        const categories = Object.entries(categoryMap).map(([su_code, name]) => ({
            name,
            count: itemMap[su_code] || 0
        }));
        return { categories, totalCount: total };
    }, [LinkedItems]);

    const CategoryCard = ({ title, total, categories }) => (
        <Card sx={{ flex: 1, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', background: '#fefefe', p: 2 }}>
            <CardContent>
                <Typography variant="overline" sx={{ fontWeight: 500, fontSize: 13, letterSpacing: 1, color: "#27548A" }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
                    <Typography variant="h2" sx={{ fontWeight: 600, fontSize: 20, color: 'primary.main', mr: 1 }}>
                        {total}
                    </Typography>
                    <Typography>Total</Typography>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                    {categories.map((category, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 0.2,
                                mt: index === 0 ? 0.5 : 0,
                                borderRadius: 2,
                                backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5'
                            }}
                        >
                            <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }}>
                                {category.name}
                            </Box>
                            <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                <Chip variant='soft' sx={{ width: 100 }}>
                                    {category.count}
                                </Chip>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );


    // fetching data from ellider
    const computeCategoryCounts = (totalQtn = [], FinalizedQtn = []) => {
        const categoryCounts = {};

        // Step 1: Initialize all categories with 0 count
        Object.values(categoryMap).map(category => {
            categoryCounts[category] = { total: 0, finalized: 0 };
        });

        // Step 2: Count total quotations per category
        totalQtn?.map(qtn => {
            const category = categoryMap[qtn.SU_CODE];
            if (category) {
                categoryCounts[category].total += 1;
            }
        });

        // Step 3: Count finalized quotations per category
        FinalizedQtn?.map(qtn => {
            const category = categoryMap[qtn.su_code];
            if (category) {
                categoryCounts[category].finalized += 1;
            }
        });
        return Object.entries(categoryCounts).map(([category, counts]) => ({
            category,
            finalized: counts.finalized,
            notFinalized: Math.max(0, counts.total - counts.finalized)
        }));
    };

    const categoryList = computeCategoryCounts(totalQtn, FinalizedQtn);
    const totalCount = totalQtn?.filter(qtn => categoryMap[qtn.SU_CODE])?.length || 0;

    const [selectedRange, setSelectedRange] = useState(1); // 1 = This Month

    // ✅ Filter items based on selected date range
    const filteredItems = useMemo(() => {
        const today = new Date();
        let fromDate;
        switch (selectedRange) {
            case 1:
                fromDate = format(startOfMonth(today), "yyyy-MM-dd");
                break;
            case 2:
                fromDate = format(subMonths(today, 6), "yyyy-MM-dd");
                break;
            case 3:
                fromDate = format(startOfYear(today), "yyyy-MM-dd");
                break;
            default:
                fromDate = format(startOfMonth(today), "yyyy-MM-dd");
        }
        return (LinkedItems || []).filter(item => {
            if (!item.update_date) return false;

            const itemDate = format(new Date(item.update_date), "yyyy-MM-dd");
            return itemDate >= fromDate;
        });
    }, [LinkedItems, selectedRange]);

    // ✅ Categorize and sum item counts
    const categorizedCounts = useMemo(() => {
        const counts = {
            ...Object.values(categoryMap).reduce((acc, name) => {
                acc[name] = 0;
                return acc;
            }, {}),
        };
        filteredItems.forEach(item => {
            const category = categoryMap[item.su_code];
            if (category) {
                counts[category] += item.item_count || 0;
            }
        });
        return counts;
    }, [filteredItems]);

    // ✅ Total item count across all categories
    const totalItemCount = useMemo(() => {
        return Object.values(categorizedCounts).reduce((sum, val) => sum + val, 0);
    }, [categorizedCounts]);


    const supplierDetails = [
        { name: "ABC Traders", count: 1000, FirstCommitDate: '2025-02-26' },
        { name: "Medi Agencies", count: 900, FirstCommitDate: '2025-03-02' },
        { name: "XY Agencies", count: 800, FirstCommitDate: '2025-04-15' },
        { name: "A1 Traders", count: 700, FirstCommitDate: '2025-02-11' },
        { name: "Green Method", count: 600, FirstCommitDate: '2025-05-09' },
        { name: "MR Agencies", count: 500, FirstCommitDate: '2025-04-17' },
        { name: "KK Agencies", count: 400, FirstCommitDate: '2025-06-21' },
        { name: "Amal Traders", count: 600, FirstCommitDate: '2025-01-10' },
        { name: "Rohith Agencies", count: 500, FirstCommitDate: '2025-03-08' },
        { name: "HT Agencies", count: 400, FirstCommitDate: '2024-11-11' },
    ]

    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [supplierRange, setSupplierRange] = useState(1);

    const getFilteredSuppliers = useCallback((type) => {
        const today = new Date();
        let fromDate;
        switch (type) {
            case 1: // This Month
                fromDate = startOfMonth(today);
                break;
            case 2: // Last 6 Months
                fromDate = subMonths(today, 6);
                break;
            case 3: // This Year
                fromDate = new Date(today.getFullYear(), 0, 1);
                break;
            default:
                fromDate = startOfMonth(today);
        }
        const formattedFrom = format(fromDate, 'yyyy-MM-dd');
        const formattedTo = format(today, 'yyyy-MM-dd');

        const filtered = supplierDetails.filter(supplier => {
            if (!supplier.FirstCommitDate) return false;
            const date = format(new Date(supplier.FirstCommitDate), 'yyyy-MM-dd');
            return date >= formattedFrom && date <= formattedTo;
        });
        setSupplierRange(type);
        setFilteredSuppliers(filtered);
    }, [])

    useEffect(() => {
        getFilteredSuppliers(1); // default to "This Month"
    }, []);

    const [selectedQuotationRange, setSelectedQuotationRange] = useState(1);
    const [filteredQtns, setFilteredQtns] = useState([]);

    const handleNewQuotation = useCallback((type) => {
        const today = new Date();
        let fromDate;

        switch (type) {
            case 1: fromDate = startOfMonth(today); break;
            case 2: fromDate = subMonths(today, 6); break;
            case 3: fromDate = new Date(today.getFullYear(), 0, 1); break;
            default: fromDate = startOfMonth(today);
        }

        const fromStr = format(fromDate, 'yyyy-MM-dd');
        const toStr = format(today, 'yyyy-MM-dd');

        const filtered = (FinalizedQtn || []).filter(qtn => {
            const dateStr = format(new Date(qtn.qtn_date), 'yyyy-MM-dd');
            return dateStr >= fromStr && dateStr <= toStr;
        });

        setSelectedQuotationRange(type);
        setFilteredQtns(filtered);
    }, [FinalizedQtn]);

    useEffect(() => {
        handleNewQuotation(1);
    }, [handleNewQuotation]);

    const categorizedQuotationCounts = useMemo(() => {
        const counts = {};

        Object.values(categoryMap).forEach(cat => {
            counts[cat] = 0;
        });

        filteredQtns.forEach(qtn => {
            const category = categoryMap[qtn.su_code] || "Others";
            counts[category] += 1;
        });

        return counts;
    }, [filteredQtns]);

    return (
        <Fragment>
            {/* {open === true ? <QuotationDetails open={open} SetOpen={SetOpen} />
                : */}
            <Box sx={{ p: 2, bgcolor: "white" }}>
                <CommonHeader />
                {/* Quotation Details starts here  */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <CategoryCard title="ACTIVE ITEMS" total={activeTotal} categories={activeCategories} />
                    <CategoryCard title="ITEMS (QUOTATION LINKED)" total={linkedTotal} categories={linkedCategories} />
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#27548A"
                                }}
                            >
                                TOTAL QUOTATION
                            </Typography>

                            <Box sx={{ display: 'flex', mt: 1, px: 1, fontSize: 13, fontWeight: 500 }}>
                                <Box sx={{ flex: 1, display: 'flex' }}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 20,
                                            color: 'primary.main',
                                            mr: 1
                                        }}
                                    >
                                        {totalCount}
                                    </Typography>
                                    <Typography sx={{ pt: .5 }}>Total</Typography>
                                </Box>

                                <Box sx={{ width: 80, textAlign: 'right', pt: 1 }}>Finalized</Box>
                                <Box sx={{ width: 100, textAlign: 'right', pl: 1, pt: 1 }}>Not Finalized</Box>
                            </Box>

                            <Divider />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, px: 1 }}>
                                {categoryList.map((item, index) => (
                                    <Box
                                        key={item.category}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 0.2,
                                            mt: index === 0 ? 0.5 : 0,
                                            borderRadius: 2,
                                            backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5'
                                        }}
                                    >
                                        {/* Category Name */}
                                        <Box sx={{ flex: 1, fontSize: 13, color: '#27548A' }}>
                                            {item.category}
                                        </Box>

                                        {/* Finalized Count */}
                                        <Box sx={{ fontWeight: 500, width: 80, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Chip
                                                variant="soft"
                                                sx={{
                                                    cursor: 'pointer',
                                                    '&:hover': { color: 'green', textDecoration: 'underline' }
                                                }}
                                                onClick={() => ShowDetails(item.category, 'finalized')}
                                            >
                                                {item.finalized}
                                            </Chip>
                                        </Box>

                                        {/* Not Finalized Count */}
                                        <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Chip variant="soft" sx={{ width: 100 }}>
                                                {item.notFinalized}
                                            </Chip>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: '#27548A'
                                }}
                            >
                                NEW ITEMS (BY CATEGORY)
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, justifyContent: 'space-between' }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    {totalItemCount}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <ButtonGroup variant="outlined" sx={{ borderRadius: 5 }}>
                                        {['This Month', 'Last 6 months', 'This Year'].map((label, index) => (
                                            <Button
                                                key={label}
                                                size="sm"
                                                onClick={() => setSelectedRange(index + 1)}
                                                sx={{
                                                    fontSize: 11,
                                                    textTransform: 'none',
                                                    px: 1.5,
                                                    color: '#2a5265',
                                                    borderColor: '#cbd5e0',
                                                    '&:hover': {
                                                        backgroundColor: '#edf2f7',
                                                        color: '#d53f8c'
                                                    }
                                                }}
                                            >
                                                {label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </Box>
                            </Box>

                            <Divider />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                                {Object.entries(categorizedCounts).map(([category, count], index) => (
                                    <Box
                                        key={category}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 0.5,
                                            borderRadius: 2,
                                            backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5'
                                        }}
                                    >
                                        <Box sx={{ flex: 1, fontSize: 13, color: '#27548A' }}>{category}</Box>
                                        <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Chip variant="soft" sx={{ width: 100 }}>
                                                {count}
                                            </Chip>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{ fontSize: 18, fontWeight: 600, color: "#4158A6", mt: 3 }}>
                    Supplier Wise Quotation Overview
                </Box>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#4158A6"
                                }}
                            >
                                TOTAL SUPPLIERS
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    {supplierDetails?.length}
                                </Typography>
                                <Typography>Total</Typography>
                            </Box>

                            <Divider />
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: "space-between", background: "#F4F3F3", p: 0.5 }}>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>PARTY</Typography></Box>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>ITEMS</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', height: 200, flexDirection: 'column', gap: 0.5, mt: 1, overflow: "auto" }}>

                                {supplierDetails.map((category, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 0.2,
                                            mt: index === 0 ? 0.5 : 0,
                                            borderRadius: 2,
                                            backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5'
                                        }}
                                    >
                                        <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }}>
                                            {category.name}
                                        </Box>
                                        <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Chip variant='soft' sx={{ width: 100 }}>
                                                {category.count}
                                            </Chip>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#4158A6"
                                }}
                            >
                                NEW SUPPLIERS
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, justifyContent: "space-between" }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    {filteredSuppliers.length}
                                </Typography>

                                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                    <ButtonGroup variant="outlined" sx={{ borderRadius: 5 }}>
                                        {["This Month", "Last 6 months", "This Year"].map((label, index) => (
                                            <Button
                                                key={label}
                                                size="sm"
                                                onClick={() => getFilteredSuppliers(index + 1)}
                                                sx={{
                                                    fontSize: 11,
                                                    textTransform: "none",
                                                    px: 1.5,
                                                    color: "#2a5265",
                                                    borderColor: "#cbd5e0",
                                                    "&:hover": {
                                                        backgroundColor: "#edf2f7",
                                                        color: "#d53f8c",
                                                    },
                                                }}
                                            >
                                                {label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </Box>
                            </Box>

                            <Divider />
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: "space-between", background: "#F4F3F3", p: 0.5 }}>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>PARTY</Typography></Box>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>ITEMS</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', height: 200, flexDirection: 'column', gap: 0.5, mt: 1, overflow: "auto" }}>
                                {filteredSuppliers.map((category, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 0.2,
                                            mt: index === 0 ? 0.5 : 0,
                                            borderRadius: 2,
                                            backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5'
                                        }}
                                    >
                                        <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }}>
                                            {category.name}
                                        </Box>
                                        <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Chip variant='soft' sx={{ width: 100 }}>
                                                {category.count}
                                            </Chip>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#4158A6"
                                }}
                            >
                                STORE WISE QUOTATION COUNT
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    4325
                                </Typography>
                                <Typography sx={{}}>Total</Typography>
                            </Box>

                            <Divider sx={{}} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        mt: .5,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Sales
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            36
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >

                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Consumable/Surgical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            695
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Biomedical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            123
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        General
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            4258
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Dental
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            1478
                                        </Chip>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#4158A6"
                                }}
                            >
                                NEW QUOTATION
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, justifyContent: "space-between" }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    {filteredQtns.length}
                                </Typography>

                                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                    <ButtonGroup variant="outlined" sx={{ borderRadius: 5 }}>
                                        {["This Month", "Last 6 months", "This Year"].map((label, index) => (
                                            <Button
                                                key={label}
                                                size="sm"
                                                onClick={() => handleNewQuotation(index + 1)}
                                                sx={{
                                                    fontSize: 11,
                                                    textTransform: "none",
                                                    px: 1.5,
                                                    color: "#2a5265",
                                                    borderColor: "#cbd5e0",
                                                    "&:hover": {
                                                        backgroundColor: "#edf2f7",
                                                        color: "#d53f8c",
                                                    },
                                                }}
                                            >
                                                {label}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </Box>
                            </Box>

                            <Divider />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
                                {Object.entries(categorizedQuotationCounts).map(([category, count], index) => (
                                    <Box
                                        key={category}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 0.5,
                                            borderRadius: 2,
                                            backgroundColor: index % 2 === 0 ? '#fafafa' : '#f5f5f5'
                                        }}
                                    >
                                        <Box sx={{ flex: 1, fontSize: 13, color: '#27548A' }}>{category}</Box>
                                        <Box sx={{ fontWeight: 500, fontSize: 12 }}>
                                            {count}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </Card>


                </Box>
                {/* Quotation Details ends here  */}

                {/* Store wise Quotation starts here  */}

                <Box sx={{ fontSize: 18, fontWeight: 600, color: "#4158A6", mt: 3 }}>
                    Store Wise Quotation
                </Box>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#27548A"
                                }}
                            >
                                Most Quotation Suppliers (item Wise)
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    4325
                                </Typography>
                                <Typography sx={{}}>Total</Typography>
                            </Box>

                            <Divider sx={{}} />
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: "space-between", background: "#F4F3F3", p: 0.5 }}>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>PARTY</Typography></Box>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>ITEMS</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        mt: .5,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Sales
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            36
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >

                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Consumable/Surgical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            695
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Biomedical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            123
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        General
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            4258
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Dental
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            1478
                                        </Chip>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#27548A"
                                }}
                            >
                                Most Quotation Suppliers (Margin Wise)
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    4325
                                </Typography>
                                <Typography sx={{}}>Total</Typography>
                            </Box>

                            <Divider sx={{}} />
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: "space-between", background: "#F4F3F3", p: 0.5 }}>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>PARTY</Typography></Box>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>ITEMS</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        mt: .5,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Sales
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            36
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >

                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Consumable/Surgical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            695
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Biomedical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            123
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        General
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            4258
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Dental
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            1478
                                        </Chip>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            background: '#fefefe',
                            p: 2
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 13,
                                    letterSpacing: 1,
                                    color: "#27548A"
                                }}
                            >
                                MANUFACTURE WISE QUOTATIONS/ SUPPLIERS
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1, }}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: 'primary.main',
                                        mr: 1
                                    }}
                                >
                                    4325
                                </Typography>
                                <Typography sx={{}}>Total</Typography>
                            </Box>

                            <Divider sx={{}} />
                            <Box sx={{ display: 'flex', gap: 0.5, justifyContent: "space-between", background: "#F4F3F3", p: 0.5 }}>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>PARTY</Typography></Box>
                                <Box><Typography sx={{ fontSize: 14, color: "#4158A6", fontStyle: "bold" }}>ITEMS</Typography></Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        mt: .5,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Sales
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            36
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >

                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Consumable/Surgical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            695
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Biomedical
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            123
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#f5f5f5'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        General
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            4258
                                        </Chip>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        p: .2,
                                        borderRadius: 2,
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <Box sx={{ flex: 1, fontSize: 13, color: "#27548A" }} >
                                        Dental
                                    </Box>
                                    <Box sx={{ fontWeight: 500, width: 100, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Chip variant='soft' sx={{ width: 100 }}>
                                            1478
                                        </Chip>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                {/* Quotation Details ends here  */}
            </Box>
            {/* } */}
        </Fragment>
    );
}

export default memo(Tmc_Quotation_Statics);

