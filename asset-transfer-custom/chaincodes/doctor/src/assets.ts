import { Object,Property } from "fabric-contract-api";

@Object()
export class Doctor{
    @Property()
    public ID:string
    @Property()
    public Name:string
    @Property()
    public Password:string
    @Property()
    public OrganizationName:string

}
    
