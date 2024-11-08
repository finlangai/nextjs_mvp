// sampleData.ts
export interface StockDataPoint {
    date: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }
  
  export const sampleStockData: StockDataPoint[] = [
    {
      date: 1696118400000, // 2023-10-01
      open: 1150.50,
      high: 1160.75,
      low: 1145.25,
      close: 1155.00,
      volume: 2150000
    },
    {
      date: 1696204800000, // 2023-10-02
      open: 1155.00,
      high: 1165.50,
      low: 1152.25,
      close: 1162.75,
      volume: 2250000
    },
    {
      date: 1696291200000, // 2023-10-03
      open: 1162.75,
      high: 1170.25,
      low: 1160.00,
      close: 1168.50,
      volume: 2300000
    },
    {
      date: 1696377600000, // 2023-10-04
      open: 1168.50,
      high: 1175.00,
      low: 1165.25,
      close: 1172.75,
      volume: 2400000
    },
    {
      date: 1696464000000, // 2023-10-05
      open: 1172.75,
      high: 1180.50,
      low: 1170.00,
      close: 1175.25,
      volume: 2500000
    },
    {
      date: 1696550400000, // 2023-10-06
      open: 1175.25,
      high: 1178.00,
      low: 1165.50,
      close: 1168.00,
      volume: 2350000
    },
    {
      date: 1696636800000, // 2023-10-07
      open: 1168.00,
      high: 1172.50,
      low: 1160.75,
      close: 1165.25,
      volume: 2100000
    },
    {
      date: 1696723200000, // 2023-10-08
      open: 1165.25,
      high: 1170.00,
      low: 1158.50,
      close: 1162.00,
      volume: 2000000
    },
    {
      date: 1696809600000, // 2023-10-09
      open: 1162.00,
      high: 1168.75,
      low: 1155.00,
      close: 1158.50,
      volume: 2200000
    },
    {
      date: 1696896000000, // 2023-10-10
      open: 1158.50,
      high: 1165.00,
      low: 1150.25,
      close: 1153.75,
      volume: 2450000
    },
    {
      date: 1696982400000, // 2023-10-11
      open: 1153.75,
      high: 1160.50,
      low: 1148.00,
      close: 1157.25,
      volume: 2600000
    },
    {
      date: 1697068800000, // 2023-10-12
      open: 1157.25,
      high: 1165.75,
      low: 1155.50,
      close: 1163.00,
      volume: 2300000
    },
    {
      date: 1697155200000, // 2023-10-13
      open: 1163.00,
      high: 1170.25,
      low: 1160.50,
      close: 1168.75,
      volume: 2400000
    },
    {
      date: 1697241600000, // 2023-10-14
      open: 1168.75,
      high: 1175.50,
      low: 1165.25,
      close: 1172.00,
      volume: 2500000
    },
    {
      date: 1697328000000, // 2023-10-15
      open: 1172.00,
      high: 1180.00,
      low: 1170.50,
      close: 1177.25,
      volume: 2700000
    },
    {
      date: 1697414400000, // 2023-10-16
      open: 1177.25,
      high: 1185.75,
      low: 1175.00,
      close: 1182.50,
      volume: 2800000
    },
    {
      date: 1697500800000, // 2023-10-17
      open: 1182.50,
      high: 1190.25,
      low: 1180.00,
      close: 1187.75,
      volume: 3000000
    },
    {
      date: 1697587200000, // 2023-10-18
      open: 1187.75,
      high: 1195.50,
      low: 1185.25,
      close: 1192.00,
      volume: 3200000
    },
    {
      date: 1697673600000, // 2023-10-19
      open: 1192.00,
      high: 1198.75,
      low: 1185.50,
      close: 1188.25,
      volume: 3100000
    },
    {
      date: 1697760000000, // 2023-10-20
      open: 1188.25,
      high: 1192.00,
      low: 1180.75,
      close: 1183.50,
      volume: 2900000
    },
    {
      date: 1697846400000, // 2023-10-21
      open: 1183.50,
      high: 1188.25,
      low: 1175.00,
      close: 1178.75,
      volume: 2700000
    },
    {
      date: 1697932800000, // 2023-10-22
      open: 1178.75,
      high: 1185.50,
      low: 1172.25,
      close: 1180.00,
      volume: 2600000
    },
    {
      date: 1698019200000, // 2023-10-23
      open: 1180.00,
      high: 1187.75,
      low: 1177.50,
      close: 1185.25,
      volume: 2800000
    },
    {
      date: 1698105600000, // 2023-10-24
      open: 1185.25,
      high: 1192.00,
      low: 1182.75,
      close: 1190.50,
      volume: 3000000
    },
    {
      date: 1698192000000, // 2023-10-25
      open: 1190.50,
      high: 1198.25,
      low: 1188.00,
      close: 1195.75,
      volume: 3200000
    },
    {
      date: 1698278400000, // 2023-10-26
      open: 1195.75,
      high: 1205.50,
      low: 1193.25,
      close: 1202.00,
      volume: 3400000
    },
    {
      date: 1698364800000, // 2023-10-27
      open: 1202.00,
      high: 1210.75,
      low: 1200.50,
      close: 1208.25,
      volume: 3600000
    },
    {
      date: 1698451200000, // 2023-10-28
      open: 1208.25,
      high: 1215.00,
      low: 1205.75,
      close: 1212.50,
      volume: 3500000
    },
    {
      date: 1698537600000, // 2023-10-29
      open: 1212.50,
      high: 1220.25,
      low: 1210.00,
      close: 1217.75,
      volume: 3700000
    },
    {
      date: 1698624000000, // 2023-10-30
      open: 1217.75,
      high: 1225.50,
      low: 1215.25,
      close: 1222.00,
      volume: 3800000
    }
  ];
  
  // Helper function để tạo dữ liệu ngẫu nhiên
  export const generateRandomStockData = (days: number): StockDataPoint[] => {
    const data: StockDataPoint[] = [];
    let basePrice = 1000 + Math.random() * 200;
    const baseVolume = 2000000;
    const startDate = new Date().setHours(0, 0, 0, 0) - (days * 24 * 60 * 60 * 1000);
  
    for (let i = 0; i < days; i++) {
      const volatility = 0.02;
      const change = basePrice * volatility * (Math.random() - 0.5);
      const open = basePrice;
      const close = basePrice + change;
      const high = Math.max(open, close) + basePrice * volatility * Math.random();
      const low = Math.min(open, close) - basePrice * volatility * Math.random();
      const volumeChange = Math.random() * 0.4 - 0.2; // -20% to +20%
      const volume = Math.round(baseVolume * (1 + volumeChange));
  
      data.push({
        date: startDate + i * 24 * 60 * 60 * 1000,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: volume
      });
  
      basePrice = close;
    }
  
    return data;
  };