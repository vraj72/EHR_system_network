declare type gender = 'Male' | 'Female' | 'Others';
declare type reportFormat = 'Text' | 'Image';
export declare class Patient {
    ID: string;
    PublicKey?: string;
    PersonalDetails: PatientPersonalDetails;
    Reports?: PatientReports;
}
export declare class PatientPersonalDetails {
    Username: string;
    Name: string;
    DOB: string;
    Gender: gender;
    Mobile: string;
    Address: string;
}
export declare class PatientReports {
    BloodReports?: BloodReports[];
    SugarReports?: SugarReports[];
    ECGReports?: ECGReports[];
}
export declare class BloodReports {
    ReportID: string;
    ReportFormat: reportFormat;
    Content: string;
    IssuedBy: string;
    GeneratedTime: string;
}
export declare class ECGReports {
    ReportID: string;
    ReportFormat: reportFormat;
    Content: string;
    IssuedBy: string;
    GeneratedTime: string;
}
export declare class SugarReports {
    ReportID: string;
    ReportFormat: reportFormat;
    Content: string;
    IssuedBy: string;
    GeneratedTime: string;
}
export {};
