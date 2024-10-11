export function convertUnixToDate(unixTime: number) {
    if (!unixTime) {
        return;
    }
    const date = new Date(unixTime); // Chuyển đổi Unix timestamp sang đối tượng Date
    const day = ('0' + date.getDate()).slice(-2); // Lấy ngày và thêm số 0 nếu cần
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Lấy tháng và thêm số 0 nếu cần
    const year = date.getFullYear().toString().slice(-2); // Lấy hai chữ số cuối của năm
  
    return `${day}/${month}/${year}`;
}
  