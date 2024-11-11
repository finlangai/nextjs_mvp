// Hàm kiểm tra xem một ngày có phải là ngày cuối tuần không
const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 là Chủ nhật, 6 là thứ 7
};

// Hàm lấy ngày giao dịch gần nhất trước ngày hiện tại
const getLastTradingDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    
    // Lùi lại cho đến khi tìm được ngày giao dịch (không phải cuối tuần)
    do {
        result.setDate(result.getDate() - 1);
    } while (isWeekend(result));
    
    return result;
};

export const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000);

export const getStartOfPreviousDay = () => {
    const today = new Date();
    const lastTradingDay = getLastTradingDay(today);
    lastTradingDay.setHours(0, 0, 0, 0);
    return Math.floor(lastTradingDay.getTime() / 1000);
};

export const getEndOfPreviousDay = () => {
    const today = new Date();
    const lastTradingDay = getLastTradingDay(today);
    lastTradingDay.setHours(23, 59, 59, 999);
    return Math.floor(lastTradingDay.getTime() / 1000);
};

export const getStartOfYear = () => {
    const date = new Date();
    date.setMonth(0);    // Đặt tháng về tháng 1
    date.setDate(1);     // Đặt ngày về ngày 1
    date.setHours(0, 0, 0, 0);
    return Math.floor(date.getTime() / 1000);
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
            start: getStartOfYear(),
            end: now,
            limit: 365
        },
    ];
};