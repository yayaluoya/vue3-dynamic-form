var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEvent } from '../../BaseEvent';
import { instanceTool } from '../../instanceTool';
/**
 * 全局事件
 * 只实现了几个常用事件
 */
var GlobalE = /** @class */ (function (_super) {
    __extends(GlobalE, _super);
    function GlobalE() {
        var _this = _super.call(this) || this;
        //
        window.addEventListener('beforeunload', function (e) {
            _this.emit('beforeunload', e);
        });
        window.addEventListener('load', function (e) {
            _this.emit('load', e);
        });
        window.addEventListener('message', function (e) {
            _this.emit('message', e);
        });
        window.addEventListener('resize', function (e) {
            _this.emit('resize', e);
        });
        window.addEventListener('blur', function (e) {
            _this.emit('blur', e);
        });
        window.addEventListener('focus', function (e) {
            _this.emit('focus', e);
        });
        window.addEventListener('hashchange', function (e) {
            _this.emit('hashchange', e);
        });
        window.addEventListener('storage', function (e) {
            _this.emit('storage', e);
        });
        return _this;
    }
    GlobalE = __decorate([
        instanceTool(),
        __metadata("design:paramtypes", [])
    ], GlobalE);
    return GlobalE;
}(BaseEvent));
export { GlobalE };
