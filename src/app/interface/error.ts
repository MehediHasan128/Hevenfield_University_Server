export type TErrorSources = {
    path: string | null;
    message: string;
}


export type TGenericErrorResponce = {
    statusCode: number;
    message: string;
    errorSource: TErrorSources;
}