export interface TokenData {
    token: string;
    expires: number;
    issued: number;
    capability: string;
    clientId: string;
}

export interface DataNotifications {
    id: string,
    title: string,
    content: string,
    thumbnail: string,
    createdAt: string,
    isReaded: boolean
}