"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlantsAsync = getPlantsAsync;
exports.getFilteredPlantsAsync = getFilteredPlantsAsync;
const GoogleAuth_1 = require("./GoogleAuth");
const google_spreadsheet_1 = require("google-spreadsheet");
function getPlantsAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        let plants = [];
        try {
            let i = 1;
            const token = yield (0, GoogleAuth_1.createTokenAsync)();
            const doc = new google_spreadsheet_1.GoogleSpreadsheet("1lr0Js5rcaaetcg6lEX37Yvf7F3NtTN2wfUm35AusReo", token);
            yield doc.loadInfo();
            const sheet = doc.sheetsByTitle["Plants"];
            yield sheet.loadCells();
            while (i < sheet.rowCount) {
                plants.push({
                    PlantName: sheet.getCell(i, 0).value,
                    LatinName: sheet.getCell(i, 1).value,
                    PlantType: sheet.getCell(i, 2).value,
                    Exposure: sheet.getCell(i, 3).value,
                    Soil: sheet.getCell(i, 4).value,
                    Moisture: sheet.getCell(i, 5).value,
                    ContainerTolerance: sheet.getCell(i, 6).value,
                    Attracts: (((_a = sheet.getCell(i, 7).value) === null || _a === void 0 ? void 0 : _a.toString().includes(",")) ?
                        (_b = sheet.getCell(i, 7).value) === null || _b === void 0 ? void 0 : _b.toString().split(", ") :
                        (_c = sheet.getCell(i, 7).value) === null || _c === void 0 ? void 0 : _c.toString()),
                    Summary: sheet.getCell(i, 8).value,
                    Tags: (((_d = sheet.getCell(i, 9).value) === null || _d === void 0 ? void 0 : _d.toString().includes(",")) ?
                        (_e = sheet.getCell(i, 9).value) === null || _e === void 0 ? void 0 : _e.toString().split(", ") :
                        (_f = sheet.getCell(i, 9).value) === null || _f === void 0 ? void 0 : _f.toString()),
                });
                i++;
            }
        }
        catch (error) {
            console.log(error);
            plants = [];
        }
        finally {
            return plants;
        }
    });
}
function getFilteredPlantsAsync(creteria) {
    return __awaiter(this, void 0, void 0, function* () {
        let plants = yield getPlantsAsync();
        console.log(creteria);
        let filteredPlants = plants.filter(item => {
            var _a, _b, _c, _d, _e;
            return ((_a = creteria.PlantType) === null || _a === void 0 ? void 0 : _a.includes(item.PlantType))
                &&
                    ((_b = creteria.Exposure) === null || _b === void 0 ? void 0 : _b.includes(item.Exposure)) &&
                ((_c = creteria.Soil) === null || _c === void 0 ? void 0 : _c.includes(item.Soil)) &&
                ((_d = creteria.Moisture) === null || _d === void 0 ? void 0 : _d.includes(item.Moisture)) &&
                ((_e = creteria.ContainerTolerance) === null || _e === void 0 ? void 0 : _e.includes(item.ContainerTolerance)) &&
                arrayEntryInText(creteria.Attracts, item.Attracts.toString(), ", ");
        });
        return filteredPlants;
        return plants;
    });
}
function arrayEntryInText(array, text, seperator) {
    let result = false;
    const arrEntries = text.split(seperator);
    array === null || array === void 0 ? void 0 : array.every(element => {
        if (arrEntries.includes(element)) {
            result = true;
            return false;
        }
    });
    return result;
}
