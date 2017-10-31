export declare const API_REQUEST = "API_REQUEST";
export declare const TYPE: {
    success: string;
    failure: string;
};
export interface Action {
    type: string;
    payload: any;
    additional: any;
    error: boolean;
}
export default function apiMiddleware(): (next: (action: Action) => any) => (action: any) => Promise<any>;
