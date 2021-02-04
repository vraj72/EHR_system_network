"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugarReports = exports.ECGReports = exports.BloodReports = exports.PatientReports = exports.PatientPersonalDetails = exports.Patient = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let Patient = class Patient {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Patient.prototype, "ID", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Patient.prototype, "PublicKey", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", PatientPersonalDetails)
], Patient.prototype, "PersonalDetails", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", PatientReports)
], Patient.prototype, "Reports", void 0);
Patient = __decorate([
    fabric_contract_api_1.Object()
], Patient);
exports.Patient = Patient;
let PatientPersonalDetails = class PatientPersonalDetails {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PatientPersonalDetails.prototype, "Username", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PatientPersonalDetails.prototype, "Name", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PatientPersonalDetails.prototype, "Email", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PatientPersonalDetails.prototype, "DOB", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PatientPersonalDetails.prototype, "Gender", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], PatientPersonalDetails.prototype, "Mobile", void 0);
PatientPersonalDetails = __decorate([
    fabric_contract_api_1.Object()
], PatientPersonalDetails);
exports.PatientPersonalDetails = PatientPersonalDetails;
let PatientReports = class PatientReports {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], PatientReports.prototype, "BloodReports", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], PatientReports.prototype, "SugarReports", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], PatientReports.prototype, "ECGReports", void 0);
PatientReports = __decorate([
    fabric_contract_api_1.Object()
], PatientReports);
exports.PatientReports = PatientReports;
class BloodReports {
}
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], BloodReports.prototype, "ReportFormat", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], BloodReports.prototype, "Content", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], BloodReports.prototype, "IssuedBy", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], BloodReports.prototype, "GeneratedTime", void 0);
exports.BloodReports = BloodReports;
class ECGReports {
}
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ECGReports.prototype, "ReportFormat", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ECGReports.prototype, "Content", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ECGReports.prototype, "IssuedBy", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], ECGReports.prototype, "GeneratedTime", void 0);
exports.ECGReports = ECGReports;
class SugarReports {
}
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SugarReports.prototype, "ReportFormat", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SugarReports.prototype, "Content", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SugarReports.prototype, "IssuedBy", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], SugarReports.prototype, "GeneratedTime", void 0);
exports.SugarReports = SugarReports;
//# sourceMappingURL=assets.js.map