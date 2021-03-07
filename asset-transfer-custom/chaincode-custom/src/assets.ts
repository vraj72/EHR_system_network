import {Object,Property} from 'fabric-contract-api'
type gender = 'Male' | 'Female' | 'Others'
type reportFormat = 'Text' | 'Image'
@Object()
export class Patient {
    @Property()
    public ID:string
    @Property()
    public PublicKey?:string
    @Property()
    public PersonalDetails:PatientPersonalDetails
    @Property()
    public Reports?:PatientReports
}
@Object()
export class PatientPersonalDetails{
    @Property()
    public Username:string
    @Property()
    public Name:string
    @Property()
    @Property()
    public DOB:string
    @Property()
    public Gender:gender
    @Property()
    public Mobile:string
    @Property()
    public Address:string
}
@Object()
export class PatientReports{
    @Property()
    public BloodReports?:BloodReports[]
    @Property()
    public SugarReports?:SugarReports[]
    @Property()
    public ECGReports?:ECGReports[]

}

export class BloodReports{
    @Property()
    public ReportID:string
    @Property()
    public ReportFormat:reportFormat
    @Property()
    public Content:string
    @Property()
    public IssuedBy:string
    @Property()
    public GeneratedTime:string
}
export class ECGReports{
    @Property()
    public ReportID:string
    @Property()
    public ReportFormat:reportFormat
    @Property()
    public Content:string
    @Property()
    public IssuedBy:string
    @Property()
    public GeneratedTime:string
}

export class SugarReports{
    @Property()
    public ReportID:string
    @Property()
    public ReportFormat:reportFormat
    @Property()
    public Content:string
    @Property()
    public IssuedBy:string
    @Property()
    public GeneratedTime:string
}