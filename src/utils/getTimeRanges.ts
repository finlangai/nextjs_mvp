export const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);

export const getStartOfPreviousDay = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);  // Lùi lại một ngày
    date.setHours(0, 0, 0, 0);         // Đặt thời gian về 0 giờ (đầu ngày)
    return Math.floor(date.getTime() / 1000);
};

export const getEndOfPreviousDay = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);  // Lùi lại một ngày
    date.setHours(23, 59, 59, 999);    // Đặt thời gian về 23:59:59 (cuối ngày)
    return Math.floor(date.getTime() / 1000);
};

// Hàm để lấy timestamp của đầu năm hiện tại (ngày 1/1 của năm hiện tại)
export const getStartOfYear = () => {
    const date = new Date();
    date.setMonth(0);    // Đặt tháng về tháng 1 (tháng 0 là tháng 1)
    date.setDate(1);     // Đặt ngày về ngày 1
    date.setHours(0, 0, 0, 0);  // Đặt thời gian về 0 giờ
    return Math.floor(date.getTime() / 1000);  // Trả về timestamp Unix
};

export const getTimeRanges = () => {
    const now = getCurrentUnixTimestamp();
    const oneDay = 24 * 60 * 60;
    return [
        {
        label: '1D',
        interval: '1m',
        start: getStartOfPreviousDay(), 
        end: getEndOfPreviousDay(),
        limit: 400
        },
        {
        label: '1M',
        interval: '1D',
        start: now - (30 * oneDay),
        end: now,
        limit: 31
        },
        {
        label: '3M',
        interval: '1D',
        start: now - (90 * oneDay),
        end: now,
        limit: 90
        },
        {
        label: '5Y',
        interval: '1D',
        start: (() => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 5);
            date.setHours(0, 0, 0, 0);
            return Math.floor(date.getTime() / 1000);
        })(),
        end: now,
        limit: 365 * 5
        },
        {
        label: 'YTD',
        interval: '1D',
        start: getStartOfYear(),   // Bắt đầu từ ngày 1/1 năm hiện tại
        end: now,
        limit: 365                 // Kết thúc tại thời điểm hiện tại
        },
    ];
};