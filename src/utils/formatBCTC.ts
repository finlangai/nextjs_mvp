import { FinancialStatement, FinancialStatementWithChildren } from '@/src/interfaces/FinancialStatement';

export const formatBCTC = (data: FinancialStatement[]): FinancialStatementWithChildren[] => {
    // Hàm đệ quy để xây dựng cấu trúc lồng nhau
    const buildHierarchy = (items: FinancialStatement[], parentId: number): FinancialStatementWithChildren[] => {
        return items
        .filter(item => item.parent_id === parentId)
        .map(item => ({
            ...item,
            children: buildHierarchy(items, item.id) // Gọi đệ quy để tìm cấp con của đối tượng hiện tại
        }));
    };

    // Tìm tất cả các đối tượng có level 1 (parent === -1)
    return buildHierarchy(data, -1);
};