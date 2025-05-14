module.exports = {
    formatDuration: (seconds) => {
        const units = [
            { label: "year", seconds: 31536000 },  // 365 days
            { label: "month", seconds: 2592000 },  // Approx 30 days
            { label: "week", seconds: 604800 },    // 7 days
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 },
            { label: "second", seconds: 1 }
        ];

        let parts = [];

        for (const unit of units) {
            const count = Math.floor(seconds / unit.seconds);
            if (count > 0) {
                parts.push(`${count} ${unit.label}${count > 1 ? "s" : ""}`);
                seconds %= unit.seconds;
            }
        }

        return parts.length ? parts.join(", ").replace(/,([^,]*)$/, " and$1") : "0 seconds";
    }
};
