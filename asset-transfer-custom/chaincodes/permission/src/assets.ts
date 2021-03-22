import {Object,Property} from 'fabric-contract-api'

type status_request = "Allowed" | "Denied" | "Expired"
type status_permission = "Active" | "Expired"
@Object()
export class Permission{
    @Property()
    public ID:string
    @Property()
    public P_ID:string 
    @Property()
    public R_ID:string[]
    @Property()
    public D_ID:string
    @Property()
    public Timestamp:string
    @Property()
    public StatusOfRequest:status_request
    @Property()
    public Organization:string
    @Property()
    public RequestedTime:string
}