export interface ApiResponse<T> extends IApiResponse {
    result: T;
}

export interface IApiResponse {
    error: string;
    status: number;
}
