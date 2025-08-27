import { useState, useCallback, useEffect } from "react";
import {
    format, startOfMonth, subMonths, startOfWeek, subWeeks, addDays, endOfMonth
} from "date-fns";

export const UseDateRangeFun = () => {
    const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [dayCount, setDayCount] = useState(2);

    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    const startOfLastWeek = subWeeks(startOfThisWeek, 1);
    const endOfLastWeek = addDays(startOfLastWeek, 6);

    const handlePeriodChange = useCallback((period) => {
        setDayCount(period);
        const now = new Date();

        const periodHandlers = {
            2: () => {
                setFromDate(format(startOfLastWeek, "yyyy-MM-dd"));
                setToDate(format(endOfLastWeek, "yyyy-MM-dd"));
            },
            3: () => {
                setFromDate(format(startOfMonth(now), "yyyy-MM-dd"));
                setToDate(format(now, "yyyy-MM-dd"));
            },
            4: () => {
                const sixMonthsAgo = subMonths(now, 5);
                setFromDate(format(startOfMonth(sixMonthsAgo), "yyyy-MM-dd"));
                setToDate(format(now, "yyyy-MM-dd"));
            },
            5: () => {
                const yearStart = new Date(now.getFullYear(), 0, 1);
                setFromDate(format(yearStart, "yyyy-MM-dd"));
                setToDate(format(now, "yyyy-MM-dd"));
            }
        };

        periodHandlers[period]?.();
    }, [startOfLastWeek, endOfLastWeek]);

    return { fromDate, toDate, dayCount, setFromDate, setToDate, setDayCount, handlePeriodChange };
};

