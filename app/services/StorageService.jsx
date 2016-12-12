"use strict";
var StorageService = (function () {
    function StorageService(storage) {
        if (storage === void 0) { storage = sessionStorage; }
        this.storage = storage;
    }
    StorageService.prototype.get = function (key) {
        var value = this.storage.getItem(key);
        return typeof value === 'string' ? JSON.parse(value) : undefined;
    };
    StorageService.prototype.set = function (key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    };
    StorageService.prototype.has = function (key) {
        return !!this.get(key);
    };
    StorageService.prototype.remove = function (key) {
        this.storage.removeItem(key);
    };
    return StorageService;
}());
exports.StorageService = StorageService;
function storageService() {
    return new StorageService();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = storageService;
