export const barOptions = {
    responsive: true,
    // maintainAspectRatio: false, // enable if needed
    plugins: {
        legend: {
            position: "top",
        },
        datalabels: {
            anchor: "center",
            align: "top",
            color: "rgba(var(--font-light))",
            font: {
                size: 12,
                family: "'Roboto', sans-serif",
            },
            rotation: -90,
            formatter: (value) => value,
        },
    },
    scales: {
        x: {
            stacked: false,
            ticks: {
                maxRotation: 0,
                minRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10,
            },
        },
        y: {
            beginAtZero: true,
        },
    },
};
// lineOptions.js (or inside your component file)
export const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
        line: {
            tension: 0.3, // smooth curves
        },
    },
    plugins: {
        legend: {
            position: "top",
        },
        tooltip: {
            mode: "index",
            intersect: false,
        },

    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

export const toPolarChartData = (datasets) => {
    return {
        labels: datasets.map((d) => d.label), // take each dataset label
        datasets: [
            {
                data: datasets.map((d) => d.data[0] ?? 0), // pick first value (or sum if multiple)
                backgroundColor: datasets.map((d) => d.backgroundColor),
                borderColor: datasets.map((d) => d.borderColor),
                borderWidth: 1,
            },
        ],
    };
};

export const ensureNumber = (num) => {
    const parsed = Number(num);
    return isNaN(parsed) ? 0 : parsed;
};