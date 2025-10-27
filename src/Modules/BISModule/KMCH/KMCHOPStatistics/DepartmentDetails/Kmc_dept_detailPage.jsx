import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, ButtonGroup, Input, Typography } from '@mui/joy';
import { useParams } from 'react-router-dom';
import DefaultPageLayout from '../../../../../Components/DefaultPageLayout';

// Department Components
import DepartmentalStatistics from './DepartmentalStatistics';
import DeptBillingStatistics from './DeptBillingStatistics';
import DeptPharmaBill from './DeptPharmaBill';
import DeptLabBilling from './DeptLabBilling';
import DeptRadiologyBilling from '../DeptRadiologyBilling';
import DeptYearWiseOpCount from './DeptYearWiseOpCount';
import DeptNewPatientCount from './DeptNewPatientCount';
import DeptIPTopPerformer from './DeptIPTopPerformer';
import DeptOPTopPerformer from './DeptOPTopPerformer';
import DeptNewPatientDetail from './DeptNewPatientDetail';
import DeptConversionRatio from './DeptConversionRatio';
import { addDays, eachDayOfInterval, eachMonthOfInterval, endOfMonth, format, parseISO, startOfMonth, startOfWeek, subMonths, subWeeks } from 'date-fns';
import GroupIcon from '@mui/icons-material/Group';

const docList = [
    { drCode: 1, drName: "Dr. Amal", consultDate: "2025-04-20", totalIP: 8, TotalOP: 18 },
    { drCode: 1, drName: "Dr. Amal", consultDate: "2025-05-22", totalIP: 10, TotalOP: 22 },
    { drCode: 1, drName: "Dr. Amal", consultDate: "2025-06-24", totalIP: 9, TotalOP: 20 },
    { drCode: 1, drName: "Dr. Amal", consultDate: "2025-07-26", totalIP: 11, TotalOP: 25 },
    { drCode: 1, drName: "Dr. Amal", consultDate: "2025-08-08", totalIP: 7, TotalOP: 15 },

    { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-04-21", totalIP: 12, TotalOP: 23 },
    { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-05-23", totalIP: 14, TotalOP: 28 },
    { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-06-25", totalIP: 13, TotalOP: 26 },
    { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-07-27", totalIP: 10, TotalOP: 20 },
    { drCode: 2, drName: "Dr. Rohith", consultDate: "2025-08-09", totalIP: 9, TotalOP: 19 },

    { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-04-20", totalIP: 6, TotalOP: 14 },
    { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-05-22", totalIP: 8, TotalOP: 16 },
    { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-06-24", totalIP: 7, TotalOP: 15 },
    { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-07-26", totalIP: 6, TotalOP: 13 },
    { drCode: 3, drName: "Dr. Ajiminsha", consultDate: "2025-08-07", totalIP: 9, TotalOP: 17 },

    { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-04-21", totalIP: 10, TotalOP: 22 },
    { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-05-23", totalIP: 11, TotalOP: 21 },
    { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-06-25", totalIP: 12, TotalOP: 24 },
    { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-07-27", totalIP: 9, TotalOP: 18 },
    { drCode: 4, drName: "Dr. Jomol", consultDate: "2025-08-05", totalIP: 8, TotalOP: 17 },

    { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-04-20", totalIP: 7, TotalOP: 16 },
    { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-05-22", totalIP: 8, TotalOP: 19 },
    { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-06-24", totalIP: 6, TotalOP: 14 },
    { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-07-26", totalIP: 9, TotalOP: 20 },
    { drCode: 5, drName: "Dr. Elsy", consultDate: "2025-08-02", totalIP: 7, TotalOP: 18 },

    { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-04-21", totalIP: 13, TotalOP: 26 },
    { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-05-23", totalIP: 10, TotalOP: 21 },
    { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-06-25", totalIP: 12, TotalOP: 24 },
    { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-07-27", totalIP: 9, TotalOP: 19 },
    { drCode: 6, drName: "Dr. Farhan", consultDate: "2025-08-03", totalIP: 11, TotalOP: 22 },

    { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-04-20", totalIP: 5, TotalOP: 13 },
    { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-05-22", totalIP: 6, TotalOP: 14 },
    { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-06-24", totalIP: 7, TotalOP: 15 },
    { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-07-26", totalIP: 8, TotalOP: 17 },
    { drCode: 7, drName: "Dr. Geetha", consultDate: "2025-08-01", totalIP: 6, TotalOP: 12 },

    { drCode: 8, drName: "Dr. Hari", consultDate: "2025-04-21", totalIP: 9, TotalOP: 20 },
    { drCode: 8, drName: "Dr. Hari", consultDate: "2025-05-23", totalIP: 10, TotalOP: 22 },
    { drCode: 8, drName: "Dr. Hari", consultDate: "2025-06-25", totalIP: 11, TotalOP: 23 },
    { drCode: 8, drName: "Dr. Hari", consultDate: "2025-07-27", totalIP: 8, TotalOP: 18 },
    { drCode: 8, drName: "Dr. Hari", consultDate: "2025-08-02", totalIP: 10, TotalOP: 21 },

    { drCode: 9, drName: "Dr. Indu", consultDate: "2025-04-20", totalIP: 10, TotalOP: 21 },
    { drCode: 9, drName: "Dr. Indu", consultDate: "2025-05-22", totalIP: 9, TotalOP: 19 },
    { drCode: 9, drName: "Dr. Indu", consultDate: "2025-06-24", totalIP: 8, TotalOP: 17 },
    { drCode: 9, drName: "Dr. Indu", consultDate: "2025-07-26", totalIP: 10, TotalOP: 20 },
    { drCode: 9, drName: "Dr. Indu", consultDate: "2025-08-07", totalIP: 9, TotalOP: 18 },

    { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-04-21", totalIP: 12, TotalOP: 26 },
    { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-05-23", totalIP: 11, TotalOP: 24 },
    { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-06-15", totalIP: 10, TotalOP: 22 },
    { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-07-27", totalIP: 13, TotalOP: 27 },
    { drCode: 10, drName: "Dr. Jacob", consultDate: "2025-08-05", totalIP: 11, TotalOP: 23 }
];

const Kmc_dept_detailPage = () => {

    const { deptId, deptName } = useParams();

    const today = new Date();
    const firstDayOfMonth = startOfMonth(today);

    const [fromDate, setFromDate] = useState(format(firstDayOfMonth, 'yyyy-MM-dd')); // 1st of current month
    const [toDate, setToDate] = useState(format(today, 'yyyy-MM-dd')); // today's date

    // const [fromDate, setFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    // const [toDate, setToDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [dayCount, setDayCount] = useState(2);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [rawChartData, setRawChartData] = useState({ labels: [], datasets: [] });


    const doctors = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );
    const startDate = useMemo(() => new Date('2025-01-01'), []);
    const endDate = useMemo(() => new Date(), []);

    const doctorOPStats = useMemo(() => {
        return doctors.flatMap((doctorName) =>
            eachDayOfInterval({ start: startDate, end: endDate }).map((day) => ({
                doctorName,
                date: format(day, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [doctors, startDate, endDate]);

    useEffect(() => {
        const labels = [];
        const revisitData = [];
        const registrationData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
            const formatted = format(date, 'yyyy-MM-dd');
            labels.push(formatted);

            const dailyStats = doctorOPStats.filter(item => item.date === formatted);
            revisitData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRevisit, 0));
            registrationData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRegistration, 0));
        });

        setRawChartData({
            labels,
            datasets: [
                { label: 'Total Revisit', data: revisitData, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                { label: 'Total Registration', data: registrationData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
            ]
        });
    }, [doctorOPStats, startDate, endDate, setRawChartData]);


    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const filterDataByDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = new Date(label);
                                if (labelDate >= monthStart && labelDate <= monthEnd) {
                                    return sum + (dataset.data[index] || 0);
                                }
                                return sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }

                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = new Date(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) => format(new Date(labels[index]), 'dd EEE')),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }

            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(new Date(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dayCount]
    );

    const handlePeriodChange = useCallback(
        (period) => {
            setDayCount(period);
            const now = new Date();

            const periodHandlers = {
                2: () => {
                    setFromDate(format(startOfLastWeek, 'yyyy-MM-dd'));
                    setToDate(format(endOfLastWeek, 'yyyy-MM-dd'));
                },
                3: () => {
                    setFromDate(format(startOfMonth(now), 'yyyy-MM-dd'));
                    setToDate(format(now, 'yyyy-MM-dd'));
                },
                4: () => {
                    const sixMonthsAgo = subMonths(now, 5);
                    const start = startOfMonth(sixMonthsAgo);
                    setFromDate(format(start, 'yyyy-MM-dd'));
                    setToDate(format(now, 'yyyy-MM-dd'));
                },
                5: () => {
                    const yearStart = new Date(now.getFullYear(), 0, 1);
                    setFromDate(format(yearStart, 'yyyy-MM-dd'));
                    setToDate(format(now, 'yyyy-MM-dd'));
                },
            };

            periodHandlers[period]?.();
        },
        [startOfLastWeek, endOfLastWeek]
    );

    useEffect(() => {
        if (fromDate && toDate && rawChartData.labels.length) {
            const start = new Date(fromDate);
            const end = new Date(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            setChartData(filterDataByDateRange(rawChartData.labels, rawChartData, range));
        }
    }, [fromDate, toDate, rawChartData, filterDataByDateRange]);





    //*********************** */ user for showing total billing ***********************************************


    const [tBillingchartData, settBillingChartData] = useState({ labels: [], datasets: [] });
    const [rawtBillingChartData, setRawtBillingChartData] = useState({ labels: [], datasets: [] });
    // const [tBillingDayCount, settBillingDayCount] = useState(1);
    // const [tBillfromDate, settBillFromDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    // const [tBilltoDate, settBillToDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const billdata = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );

    // Generate fake doctor OP data
    const billStatus = useMemo(() => {
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        return billdata.flatMap((doctorName) =>
            allDates.map((date) => ({
                doctorName,
                date: format(date, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [billdata, startDate, endDate]);

    useEffect(() => {
        const labels = [];
        const billingData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).forEach(date => {
            const formatted = format(date, 'yyyy-MM-dd');
            labels.push(formatted);

            const dailyStats = billStatus.filter(item => item.date === formatted);
            billingData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRegistration, 0));
        });

        setRawtBillingChartData({
            labels,
            datasets: [
                { label: 'Total Billing', data: billingData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
            ]
        });
    }, [billStatus, startDate, endDate, setRawtBillingChartData]);

    // Filter by date range
    const FilterDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = parseISO(label);
                                return labelDate >= monthStart && labelDate <= monthEnd
                                    ? sum + (dataset.data[index] || 0)
                                    : sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }
                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = parseISO(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) =>
                        format(parseISO(labels[index]), 'dd EEE')
                    ),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }
            // Non-range filtering
            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(parseISO(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dayCount]
    );

    // Apply filtering when date range changes
    useEffect(() => {
        if (fromDate && toDate && rawtBillingChartData.labels?.length) {
            const start = parseISO(fromDate);
            const end = parseISO(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            settBillingChartData(FilterDateRange(rawtBillingChartData.labels, rawtBillingChartData, range));
        }
    }, [fromDate, toDate, rawtBillingChartData, FilterDateRange, settBillingChartData]);


    //*********************** */ user for showing lab billing ***********************************************

    const [labBillingchartData, setlabBillingChartData] = useState({ labels: [], datasets: [] });
    const [rawlabBillingChartData, setRawlabBillingChartData] = useState({ labels: [], datasets: [] });

    const labdata = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );

    // Generate fake doctor OP data
    const labStatus = useMemo(() => {
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        return labdata.flatMap((doctorName) =>
            allDates.map((date) => ({
                doctorName,
                date: format(date, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [labdata, startDate, endDate]);

    useEffect(() => {
        const labels = [];
        const revisitData = [];
        const registrationData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
            const formatted = format(date, 'yyyy-MM-dd');
            labels.push(formatted);

            const dailyStats = labStatus.filter(item => item.date === formatted);
            revisitData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRevisit, 0));
            registrationData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRegistration, 0));
        });

        setRawlabBillingChartData({
            labels,
            datasets: [
                { label: 'Total Request', data: revisitData, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                { label: 'Total Billed', data: registrationData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
            ]
        });
    }, [doctorOPStats, startDate, endDate, setRawlabBillingChartData]);

    // Filter by date range
    const FilterlabDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = parseISO(label);
                                return labelDate >= monthStart && labelDate <= monthEnd
                                    ? sum + (dataset.data[index] || 0)
                                    : sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }
                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = parseISO(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) =>
                        format(parseISO(labels[index]), 'dd EEE')
                    ),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }
            // Non-range filtering
            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(parseISO(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dayCount]
    );

    // Apply filtering when date range changes
    useEffect(() => {
        if (fromDate && toDate && rawlabBillingChartData.labels?.length) {
            const start = parseISO(fromDate);
            const end = parseISO(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            setlabBillingChartData(FilterlabDateRange(rawlabBillingChartData.labels, rawlabBillingChartData, range));
        }
    }, [fromDate, toDate, rawlabBillingChartData, FilterlabDateRange, setlabBillingChartData]);


    //************************************** */ Pharmacy billing **********************************************

    const [pharmchartData, setpharmChartData] = useState({ labels: [], datasets: [] });
    const [rawpharmChartData, setRawpharmChartData] = useState({ labels: [], datasets: [] });

    const pharmdata = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );

    // Generate fake doctor OP data
    const pharmStatus = useMemo(() => {
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        return pharmdata.flatMap((doctorName) =>
            allDates.map((date) => ({
                doctorName,
                date: format(date, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [pharmdata, startDate, endDate]);

    useEffect(() => {
        const labels = [];
        const revisitData = [];
        const registrationData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
            const formatted = format(date, 'yyyy-MM-dd');
            labels.push(formatted);

            const dailyStats = pharmStatus.filter(item => item.date === formatted);
            revisitData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRevisit, 0));
            registrationData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRegistration, 0));
        });

        setRawpharmChartData({
            labels,
            datasets: [
                { label: 'Total Request', data: revisitData, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                { label: 'Total Billed', data: registrationData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
            ]
        });
    }, [pharmStatus, startDate, endDate, setRawpharmChartData]);

    // Filter by date range
    const FilterpharmDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = parseISO(label);
                                return labelDate >= monthStart && labelDate <= monthEnd
                                    ? sum + (dataset.data[index] || 0)
                                    : sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }
                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = parseISO(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) =>
                        format(parseISO(labels[index]), 'dd EEE')
                    ),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }
            // Non-range filtering
            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(parseISO(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dayCount]
    );

    // Apply filtering when date range changes
    useEffect(() => {
        if (fromDate && toDate && rawpharmChartData.labels?.length) {
            const start = parseISO(fromDate);
            const end = parseISO(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            setpharmChartData(FilterpharmDateRange(rawpharmChartData.labels, rawpharmChartData, range));
        }
    }, [fromDate, toDate, rawpharmChartData, FilterpharmDateRange, setpharmChartData]);


    // ***************************************** Radiology Billing *************************************************

    const [radiochartData, setradioChartData] = useState({ labels: [], datasets: [] });
    const [rawradioChartData, setRawradioChartData] = useState({ labels: [], datasets: [] });

    const radiodata = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );

    // Generate fake doctor OP data
    const radioStatus = useMemo(() => {
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        return radiodata.flatMap((doctorName) =>
            allDates.map((date) => ({
                doctorName,
                date: format(date, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [radiodata, startDate, endDate]);

    useEffect(() => {
        const labels = [];
        const revisitData = [];
        const registrationData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
            const formatted = format(date, 'yyyy-MM-dd');
            labels.push(formatted);

            const dailyStats = radioStatus.filter(item => item.date === formatted);
            revisitData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRevisit, 0));
            registrationData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRegistration, 0));
        });

        setRawradioChartData({
            labels,
            datasets: [
                { label: 'Total Request', data: revisitData, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                { label: 'Total Billed', data: registrationData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
            ]
        });
    }, [radioStatus, startDate, endDate, setRawradioChartData]);

    // Filter by date range
    const FilterradioDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = parseISO(label);
                                return labelDate >= monthStart && labelDate <= monthEnd
                                    ? sum + (dataset.data[index] || 0)
                                    : sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }
                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = parseISO(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) =>
                        format(parseISO(labels[index]), 'dd EEE')
                    ),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }
            // Non-range filtering
            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(parseISO(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dayCount]
    );

    // Apply filtering when date range changes
    useEffect(() => {
        if (fromDate && toDate && rawradioChartData.labels?.length) {
            const start = parseISO(fromDate);
            const end = parseISO(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            setradioChartData(FilterradioDateRange(rawradioChartData.labels, rawradioChartData, range));
        }
    }, [fromDate, toDate, rawradioChartData, FilterradioDateRange, setradioChartData]);


    // ************************************************* Top Performer IP *********************************************************


    const [ipTopchartData, setipTopChartData] = useState({ labels: [], datasets: [] });


    useEffect(() => {
        if (!docList || docList.length === 0 || !fromDate || !toDate) return;

        // ✅ Parse selected range
        const start = parseISO(fromDate);
        const end = parseISO(toDate);

        // ✅ Filter doctor list by selected date range
        const filteredDocList = docList.filter((entry) => {
            const entryDate = parseISO(entry.consultDate);
            return entryDate >= start && entryDate <= end;
        });

        if (filteredDocList.length === 0) {
            setipTopChartData({ labels: [], datasets: [] });
            return;
        }

        // 🔹 Group by doctor
        const groupedData = filteredDocList.reduce((acc, entry) => {
            if (!acc[entry.drName]) {
                acc[entry.drName] = { totalIP: 0, totalOP: 0 };
            }
            acc[entry.drName].totalIP += entry.totalIP;
            acc[entry.drName].totalOP += entry.TotalOP;
            return acc;
        }, {});

        // 🔹 Sort doctors by totalIP (largest → smallest)
        const sorted = Object.entries(groupedData).sort(
            (a, b) => b[1].totalIP - a[1].totalIP
        );

        // 🔹 Extract labels + values
        const labels = sorted.map(([drName]) => drName);
        const totalIP = sorted.map(([_, values]) => values.totalIP);

        // 🔹 Update chart data
        setipTopChartData({
            labels,
            datasets: [
                {
                    label: "Total IP",
                    data: totalIP,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
            ],
        });
    }, [docList, fromDate, toDate]);

    // ************************************************ TOP Performer OP ********************************************

    const [opTopchartData, setopTopChartData] = useState({ labels: [], datasets: [] });


    useEffect(() => {
        if (!docList || docList.length === 0 || !fromDate || !toDate) return;

        // ✅ Parse selected range
        const start = parseISO(fromDate);
        const end = parseISO(toDate);

        // ✅ Filter doctor list by selected date range
        const filteredDocList = docList.filter((entry) => {
            const entryDate = parseISO(entry.consultDate);
            return entryDate >= start && entryDate <= end;
        });

        if (filteredDocList.length === 0) {
            setopTopChartData({ labels: [], datasets: [] });
            return;
        }

        // 🔹 Group by doctor
        const groupedData = filteredDocList.reduce((acc, entry) => {
            if (!acc[entry.drName]) {
                acc[entry.drName] = { totalIP: 0, totalOP: 0 };
            }
            acc[entry.drName].totalIP += entry.totalIP;
            acc[entry.drName].totalOP += entry.TotalOP;
            return acc;
        }, {});

        // 🔹 Sort doctors by totalIP (largest → smallest)
        const sorted = Object.entries(groupedData).sort(
            (a, b) => b[1].totalOP - a[1].totalOP
        );

        // 🔹 Extract labels + values
        const labels = sorted.map(([drName]) => drName);
        const totalOP = sorted.map(([_, values]) => values.totalOP);

        // 🔹 Update chart data
        setopTopChartData({
            labels,
            datasets: [
                {
                    label: "Total OP",
                    data: totalOP,
                    backgroundColor: "rgba(169, 75, 192, 0.6)",
                },
            ],
        });
    }, [docList, fromDate, toDate]);

    // ***************************************************** New Patient Overview ******************************************************

    const [NPchartData, setNPChartData] = useState({ labels: [], datasets: [] });
    const [rawNPChartData, setRawNPChartData] = useState({ labels: [], datasets: [] });

    const NPdata = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );

    // Generate fake doctor OP data
    const NPStatus = useMemo(() => {
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        return NPdata.flatMap((doctorName) =>
            allDates.map((date) => ({
                doctorName,
                date: format(date, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [NPdata, startDate, endDate]);

    useEffect(() => {
        const labels = [];
        const revisitData = [];
        const registrationData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
            const formatted = format(date, 'yyyy-MM-dd');
            labels.push(formatted);

            const dailyStats = NPStatus.filter(item => item.date === formatted);
            revisitData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRevisit, 0));
            registrationData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRegistration, 0));
        });

        setRawNPChartData({
            labels,
            datasets: [
                { label: 'Total Visit', data: revisitData, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
                { label: 'Total IP', data: registrationData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
            ]
        });
    }, [doctorOPStats, startDate, endDate, setRawNPChartData]);

    // Filter by date range
    const FilterNPDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = parseISO(label);
                                return labelDate >= monthStart && labelDate <= monthEnd
                                    ? sum + (dataset.data[index] || 0)
                                    : sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }
                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = parseISO(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) =>
                        format(parseISO(labels[index]), 'dd EEE')
                    ),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }
            // Non-range filtering
            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(parseISO(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dayCount]
    );

    // Apply filtering when date range changes
    useEffect(() => {
        if (fromDate && toDate && rawNPChartData.labels?.length) {
            const start = parseISO(fromDate);
            const end = parseISO(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            setNPChartData(FilterNPDateRange(rawNPChartData.labels, rawNPChartData, range));
        }
    }, [fromDate, toDate, rawNPChartData, FilterNPDateRange, setNPChartData]);




    // ***************************************************** IP Conversion Ratio ******************************************************

    const [ipRatiochartData, seipRatioChartData] = useState({ labels: [], datasets: [] });
    const [rawipRatioChartData, setRawipRatioChartData] = useState({ labels: [], datasets: [] });

    const ipRatiodata = useMemo(
        () => Array.from({ length: 21 }, (_, i) => `Dr. ${String.fromCharCode(65 + i)}. Lastname`),
        []
    );

    // Generate fake doctor OP data
    const ipRatioStatus = useMemo(() => {
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        return ipRatiodata.flatMap((doctorName) =>
            allDates.map((date) => ({
                doctorName,
                date: format(date, 'yyyy-MM-dd'),
                totalRevisit: Math.floor(Math.random() * 20) + 5,
                totalRegistration: Math.floor(Math.random() * 40) + 10,
            }))
        );
    }, [ipRatiodata, startDate, endDate]);

    useEffect(() => {
        const labels = [];
        const revisitData = [];
        const registrationData = [];

        eachDayOfInterval({ start: startDate, end: endDate }).map(date => {
            const formatted = format(date, 'yyyy-MM-dd');
            labels.push(formatted);

            const dailyStats = ipRatioStatus.filter(item => item.date === formatted);
            revisitData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRevisit, 0));
            registrationData.push(dailyStats.reduce((acc, cur) => acc + cur.totalRegistration, 0));
        });

        setRawipRatioChartData({
            labels,
            datasets: [

                { label: 'Total Visit', data: registrationData, borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.5)' },
                { label: 'Total IP', data: revisitData, borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
            ]
        });
    }, [doctorOPStats, startDate, endDate, setRawipRatioChartData]);

    // Filter by date range
    const FilteripRatioDateRange = useCallback(
        (labels, data, dateRange) => {
            if (!labels.length || !data.datasets.length) return { labels: [], datasets: [] };

            if (dateRange.isRange) {
                const { rangeStart, rangeEnd } = dateRange;

                if (dayCount === 4 || dayCount === 5) {
                    const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
                    const monthLabels = months.map((month) => format(month, 'MMM yyyy'));

                    const monthlySums = data.datasets.map((dataset) =>
                        months.map((month) => {
                            const monthStart = startOfMonth(month);
                            const monthEnd = endOfMonth(month);
                            return labels.reduce((sum, label, index) => {
                                const labelDate = parseISO(label);
                                return labelDate >= monthStart && labelDate <= monthEnd
                                    ? sum + (dataset.data[index] || 0)
                                    : sum;
                            }, 0);
                        })
                    );

                    return {
                        labels: monthLabels,
                        datasets: data.datasets.map((dataset, i) => ({
                            ...dataset,
                            data: monthlySums[i],
                        })),
                    };
                }
                const filteredIndices = labels
                    .map((label, index) => {
                        const labelDate = parseISO(label);
                        return labelDate >= rangeStart && labelDate <= rangeEnd ? index : null;
                    })
                    .filter((index) => index !== null);

                return {
                    labels: filteredIndices.map((index) =>
                        format(parseISO(labels[index]), 'dd EEE')
                    ),
                    datasets: data.datasets.map((dataset) => ({
                        ...dataset,
                        data: filteredIndices.map((index) => dataset.data[index]),
                    })),
                };
            }
            // Non-range filtering
            const filteredIndices = labels
                .map((label, index) => (dateRange.includes(label) ? index : null))
                .filter((index) => index !== null);

            return {
                labels: filteredIndices.map((index) => format(parseISO(labels[index]), 'dd EEE')),
                datasets: data.datasets.map((dataset) => ({
                    ...dataset,
                    data: filteredIndices.map((index) => dataset.data[index]),
                })),
            };
        },
        [dayCount]
    );

    // Apply filtering when date range changes
    useEffect(() => {
        if (fromDate && toDate && rawipRatioChartData.labels?.length) {
            const start = parseISO(fromDate);
            const end = parseISO(toDate);
            const range = { rangeStart: start, rangeEnd: end, isRange: true };
            seipRatioChartData(FilteripRatioDateRange(rawipRatioChartData.labels, rawipRatioChartData, range));
        }
    }, [fromDate, toDate, rawipRatioChartData, FilteripRatioDateRange, seipRatioChartData]);

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#fdf6f9', p: { xs: 1, md: 2 } }}>
            <DefaultPageLayout label={decodeURIComponent(deptName)}>

                {/* HEADER SECTION */}
                <Box sx={{ textAlign: "center", mb: 3, p: { xs: 1.5, md: 3 } }}>
                    <Box
                        sx={{
                            p: 2.5,
                            borderRadius: "16px",
                            background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        }}
                    >
                        {/* Title */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1.5 }}>
                            <Typography
                                sx={{
                                    color: "#1a202c",
                                    fontSize: 22,
                                    // fontWeight: "bold",
                                    letterSpacing: "0.5px",
                                    // borderBottom: "3px solid #3182ce",
                                    pb: 0.5,
                                }}
                            >
                                Departmental OP Statistics
                            </Typography>
                        </Box>

                        {/* Doctor Count */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    px: 2,
                                    py: 0.8,
                                    borderRadius: "50px",
                                    fontWeight: "bold",
                                    fontSize: 14,
                                    background: "linear-gradient(90deg, #63b3ed, #4299e1)",
                                    color: "#fff",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                }}
                            >
                                <GroupIcon fontSize="small" /> 25 Doctors
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                {/*common Date field */}
                <Box>
                    <Box sx={{ display: "flex", justifyContent: "end", px: 2, p: 1 }}>

                        {/* <Box sx={{ flexWrap: "wrap", mt: 0.5, flex: 1 }}> */}
                        <ButtonGroup aria-label="date range selector" sx={{
                            '--ButtonGroup-radius': '30px', display: "flex",
                            flexWrap: { sm: "wrap", xl: 'nowrap' }, p: 0, size: "sm"
                        }}>
                            {['Last Week', 'This Month', 'Last 6 months', 'This Year', 'Custom'].map((label, index) => (
                                <Button key={label} onClick={() => handlePeriodChange(index + 2)}>
                                    {index === 4 ? (
                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                            <Input
                                                type="date"
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                                size='xs'
                                                sx={{ p: 0.5, color: 'grey' }}
                                            />
                                            <Input
                                                type="date"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                                size='xs'
                                                sx={{ p: 0.5, color: 'grey' }}
                                                slotProps={{ input: { min: fromDate } }}
                                            />
                                        </Box>
                                    ) : (
                                        <Typography sx={{
                                            fontSize: 11,
                                            color: "rgba(var(--input-font-color))",
                                            '&:hover': {
                                                color: 'rgba(var(--font-black))',
                                                backgroundColor: 'transparent',
                                            }
                                        }}>{label}</Typography>
                                    )}
                                </Button>
                            ))}
                        </ButtonGroup>
                        {/* </Box> */}
                    </Box>
                </Box>

                {/* CONTENT SECTIONS */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1, sm: 2 } }}>
                    {/* Statistics */}
                    <Box sx={{ mt: 1, flex: "1 1 100%", display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <DepartmentalStatistics chartData={chartData} setChartData={setChartData} rawChartData={rawChartData} setRawChartData={setRawChartData} />
                    </Box>
                    {/* Billing */}
                    <Box sx={{ mt: 1, display: "flex", gap: 1, width: '100%', flexWrap: "wrap" }}>
                        <DeptBillingStatistics sx={{ flex: 1 }} chartData={tBillingchartData} setChartData={settBillingChartData} rawChartData={rawtBillingChartData} setRawChartData={setRawtBillingChartData}
                        />
                        <DeptLabBilling sx={{ flex: 1 }} chartData={labBillingchartData} setChartData={setlabBillingChartData} rawChartData={rawlabBillingChartData} setRawChartData={setRawlabBillingChartData} />
                    </Box>
                    {/* Pharma & Radiology */}
                    <Box sx={{ mt: 1, display: "flex", gap: 1, width: '100%', flexWrap: "wrap" }}>
                        <DeptPharmaBill chartData={pharmchartData} setChartData={setpharmChartData} rawChartData={rawpharmChartData} setRawChartData={setRawpharmChartData} />
                        <DeptRadiologyBilling chartData={radiochartData} setChartData={setradioChartData} rawChartData={rawradioChartData} setRawChartData={setRawradioChartData} />
                    </Box>
                    {/* Yearly & New Patient Count */}
                    <Box sx={{ mt: 1, display: "flex", gap: 1, width: '100%', flexWrap: "wrap" }}>
                        <DeptYearWiseOpCount />
                        <DeptNewPatientCount />
                    </Box>
                    {/* Top Performers */}
                    <Box sx={{ mt: 1, display: "flex", gap: 1, flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                        <DeptIPTopPerformer docList={docList} chartData={ipTopchartData} setChartData={setipTopChartData}
                        />
                    </Box>
                    <Box sx={{ mt: 1, display: "flex", gap: 1, flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                        <DeptOPTopPerformer docList={docList} chartData={opTopchartData} setChartData={setopTopChartData} />
                    </Box>
                    {/* Detailed Reports */}
                    <Box sx={{ mt: 1, display: "flex", gap: 1, flexDirection: 'column', width: '100%' }}>
                        <DeptNewPatientDetail chartData={NPchartData} setChartData={setNPChartData} rawChartData={rawNPChartData} setRawChartData={setRawNPChartData} />
                    </Box>
                    <Box sx={{ mt: 1, display: "flex", gap: 1, flexDirection: 'column', width: '100%' }}>
                        <DeptConversionRatio chartData={ipRatiochartData} setChartData={seipRatioChartData} rawChartData={rawipRatioChartData} setRawChartData={setRawipRatioChartData} />
                    </Box>
                </Box>
            </DefaultPageLayout>
        </Box>
    );
};

export default memo(Kmc_dept_detailPage);
