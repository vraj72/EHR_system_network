declare type status_request = "Allowed" | "Denied" | "Expired";
export declare class Permission {
    ID: string;
    P_ID: string;
    R_ID: string[];
    D_ID: string;
    Timestamp: string;
    StatusOfRequest: status_request;
    Organization: string;
    RequestedTime: string;
}
export {};
