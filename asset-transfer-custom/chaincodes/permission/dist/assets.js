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
exports.Permission = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let Permission = class Permission {
};
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Permission.prototype, "ID", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Permission.prototype, "P_ID", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", Array)
], Permission.prototype, "R_ID", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Permission.prototype, "D_ID", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Permission.prototype, "Timestamp", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Permission.prototype, "StatusOfRequest", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Permission.prototype, "Organization", void 0);
__decorate([
    fabric_contract_api_1.Property(),
    __metadata("design:type", String)
], Permission.prototype, "RequestedTime", void 0);
Permission = __decorate([
    fabric_contract_api_1.Object()
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=assets.js.map