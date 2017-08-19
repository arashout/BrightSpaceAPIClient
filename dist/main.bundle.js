webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"section\">\r\n    <div class=\"container\">\r\n        <app-status-bar></app-status-bar>\r\n        <app-command-bar></app-command-bar>\r\n        <app-message-bar></app-message-bar>\r\n    </div>\r\n    <div>\r\n        <app-datatable-container></app-datatable-container>\r\n    </div>\r\n</section>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_brightspace_api_service__ = __webpack_require__("../../../../../src/app/shared/brightspace-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_session_service__ = __webpack_require__("../../../../../src/app/shared/session.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(brightspaceService, sessionService) {
        this.brightspaceService = brightspaceService;
        this.sessionService = sessionService;
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.brightspaceService.refreshSession();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_brightspace_api_service__["a" /* BrightspaceAPIService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_brightspace_api_service__["a" /* BrightspaceAPIService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_session_service__["a" /* SessionService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__command_bar_command_bar_component__ = __webpack_require__("../../../../../src/app/command-bar/command-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__status_bar_status_bar_component__ = __webpack_require__("../../../../../src/app/status-bar/status-bar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_brightspace_api_service__ = __webpack_require__("../../../../../src/app/shared/brightspace-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_session_service__ = __webpack_require__("../../../../../src/app/shared/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_message_service__ = __webpack_require__("../../../../../src/app/shared/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__datatable_container_datatable_datatable_component__ = __webpack_require__("../../../../../src/app/datatable-container/datatable/datatable.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__datatable_container_datatable_container_component__ = __webpack_require__("../../../../../src/app/datatable-container/datatable-container.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__message_bar_message_bar_component__ = __webpack_require__("../../../../../src/app/message-bar/message-bar.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__command_bar_command_bar_component__["a" /* CommandBarComponent */],
            __WEBPACK_IMPORTED_MODULE_6__status_bar_status_bar_component__["a" /* StatusBarComponent */],
            __WEBPACK_IMPORTED_MODULE_10__datatable_container_datatable_datatable_component__["a" /* DatatableComponent */],
            __WEBPACK_IMPORTED_MODULE_11__datatable_container_datatable_container_component__["a" /* DatatableContainerComponent */],
            __WEBPACK_IMPORTED_MODULE_12__message_bar_message_bar_component__["a" /* MessageBarComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_10__datatable_container_datatable_datatable_component__["a" /* DatatableComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_7__shared_brightspace_api_service__["a" /* BrightspaceAPIService */], __WEBPACK_IMPORTED_MODULE_8__shared_session_service__["a" /* SessionService */], __WEBPACK_IMPORTED_MODULE_9__shared_message_service__["c" /* MessageService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/command-bar/command-bar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "input {\r\n    width: 100%;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/command-bar/command-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"field\">\n    <label class=\"label\">Base Path</label>\n    <div class=\"control\">\n      <input class=\"input\" type=\"text\" (keyup.enter)=\"onEnter($event)\" [(ngModel)]=\"basePathValue\">\n    </div>\n  </div>\n<div class=\"field\">\n  <label class=\"label\">API Command</label>\n  <div class=\"control\">\n    <input class=\"input\" type=\"text\" (keyup.enter)=\"onEnter($event)\" [(ngModel)]=\"apiCommandValue\">\n  </div>\n</div>\n<div class=\"field\">\n  <label class=\"label\">Query Parameters</label>\n  <div class=\"control\">\n    <textarea class=\"textarea\" type=\"text\" (keyup.enter)=\"onEnter($event)\" [(ngModel)]=\"queryParameterValue\"></textarea>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/command-bar/command-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommandBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_brightspace_api_service__ = __webpack_require__("../../../../../src/app/shared/brightspace-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_message_service__ = __webpack_require__("../../../../../src/app/shared/message.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_util__ = __webpack_require__("../../../../../src/app/shared/util.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CommandBarComponent = (function () {
    function CommandBarComponent(brightspaceService, messageService) {
        this.brightspaceService = brightspaceService;
        this.messageService = messageService;
        // Initialize input values that are two-way data bound
        this.basePathValue = '/d2l/api/lp/1.13/';
        this.apiCommandValue = 'users/';
        this.queryParameterValue = "{}";
    }
    CommandBarComponent.prototype.onEnter = function (event) {
        // Validate queryParameterValue to ensure it is valid JSON
        if (Object(__WEBPACK_IMPORTED_MODULE_3__shared_util__["a" /* isValidJSON */])(this.queryParameterValue)) {
            this.brightspaceService.getAPIResults(this.basePathValue, this.apiCommandValue, JSON.parse(this.queryParameterValue));
        }
        else {
            this.messageService.messageUpdated.emit(new __WEBPACK_IMPORTED_MODULE_2__shared_message_service__["a" /* Message */]("Query parameters not valid JSON", "Double check that the query parameters textarea contains valid JSON", 100, 'Remember that all keys and values must be wrapped in double quotations e.g. {"Bookmark":"100"}', __WEBPACK_IMPORTED_MODULE_2__shared_message_service__["b" /* MessageEnum */].IS_DANGER));
        }
    };
    return CommandBarComponent;
}());
CommandBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-command-bar',
        template: __webpack_require__("../../../../../src/app/command-bar/command-bar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/command-bar/command-bar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_brightspace_api_service__["a" /* BrightspaceAPIService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_brightspace_api_service__["a" /* BrightspaceAPIService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_message_service__["c" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_message_service__["c" /* MessageService */]) === "function" && _b || Object])
], CommandBarComponent);

var _a, _b;
//# sourceMappingURL=command-bar.component.js.map

/***/ }),

/***/ "../../../../../src/app/datatable-container/datatable-container.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/datatable-container/datatable-container.component.html":
/***/ (function(module, exports) {

module.exports = "<div #datatableContainer></div>"

/***/ }),

/***/ "../../../../../src/app/datatable-container/datatable-container.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatatableContainerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_session_service__ = __webpack_require__("../../../../../src/app/shared/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_brightspace_api_service__ = __webpack_require__("../../../../../src/app/shared/brightspace-api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__datatable_datatable_component__ = __webpack_require__("../../../../../src/app/datatable-container/datatable/datatable.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DatatableContainerComponent = (function () {
    function DatatableContainerComponent(sessionService, brightspaceAPIService, resolver) {
        this.sessionService = sessionService;
        this.brightspaceAPIService = brightspaceAPIService;
        this.resolver = resolver;
    }
    DatatableContainerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        var datatableFactory = this.resolver.resolveComponentFactory(__WEBPACK_IMPORTED_MODULE_3__datatable_datatable_component__["a" /* DatatableComponent */]);
        this.brightspaceAPIService.retrievedAPIResults.subscribe(function (rs) {
            _this.container.remove();
            var datatableRef = _this.container.createComponent(datatableFactory);
            datatableRef.instance.populateTable(_this.createColumns(rs), _this.createDataSet(rs));
        });
    };
    DatatableContainerComponent.prototype.createDataSet = function (rs) {
        var _this = this;
        // Converts a result set to a DataSet which is the format that Angular-DataTable likes
        var dataSet = [];
        var resultArray = rs.Items;
        resultArray.forEach(function (resultItem) {
            var arr = _this.convertResultToArray(resultItem);
            dataSet.push(arr);
        });
        return dataSet;
    };
    DatatableContainerComponent.prototype.createColumns = function (rs) {
        return Object.keys(rs.Items[0]);
    };
    DatatableContainerComponent.prototype.convertResultToArray = function (resultItem) {
        return Object.keys(resultItem).map(function (val) {
            if (typeof resultItem[val] === 'object') {
                return JSON.stringify((resultItem[val]));
            }
            else {
                return resultItem[val];
            }
        });
    };
    return DatatableContainerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('datatableContainer', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewContainerRef */] }),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewContainerRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewContainerRef */]) === "function" && _a || Object)
], DatatableContainerComponent.prototype, "container", void 0);
DatatableContainerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-datatable-container',
        template: __webpack_require__("../../../../../src/app/datatable-container/datatable-container.component.html"),
        styles: [__webpack_require__("../../../../../src/app/datatable-container/datatable-container.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_session_service__["a" /* SessionService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_brightspace_api_service__["a" /* BrightspaceAPIService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_brightspace_api_service__["a" /* BrightspaceAPIService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* ComponentFactoryResolver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* ComponentFactoryResolver */]) === "function" && _d || Object])
], DatatableContainerComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=datatable-container.component.js.map

/***/ }),

/***/ "../../../../../src/app/datatable-container/datatable/datatable.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isRendered\">\r\n    <table id=\"datatable\" class=\"row-border hover\">\r\n        <thead>\r\n            <tr>\r\n                <th *ngFor=\"let header of columnHeaders\">{{header}}</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr *ngFor=\"let row of rows\">\r\n                <td *ngFor=\"let column of row\">{{ column }}</td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/datatable-container/datatable/datatable.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatatableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DatatableComponent = (function () {
    function DatatableComponent() {
        this.isRendered = false;
        // Need a delay to initializing data table before the columns in the table are set
        this.RENDER_DELAY = 100;
    }
    DatatableComponent.prototype.populateTable = function (columns, dataset) {
        this.columnHeaders = columns;
        this.rows = dataset;
        this.isRendered = true;
        setTimeout(function () {
            var table = $("#datatable").DataTable({
                autoWidth: true,
                pageLength: dataset.length,
                dom: 'Bfrtip',
                buttons: ["excel"]
            });
        }, this.RENDER_DELAY);
    };
    return DatatableComponent;
}());
DatatableComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-datatable',
        template: __webpack_require__("../../../../../src/app/datatable-container/datatable/datatable.component.html")
    })
], DatatableComponent);

//# sourceMappingURL=datatable.component.js.map

/***/ }),

/***/ "../../../../../src/app/message-bar/message-bar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/message-bar/message-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<article class=\"message {{message.modifier}}\" *ngIf=\"isDisplayed\">\n  <div class=\"message-header\">\n    <p>{{message.header}}</p>\n  </div>\n  <div class=\"message-body\">\n    <p>{{message.body}}</p>\n    <p *ngIf=\"message.additionalInfo !== ''\">Additional Info: {{message.additionalInfo}}</p>\n  </div>\n</article>"

/***/ }),

/***/ "../../../../../src/app/message-bar/message-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_message_service__ = __webpack_require__("../../../../../src/app/shared/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessageBarComponent = (function () {
    function MessageBarComponent(messageService) {
        this.messageService = messageService;
        this.message = new __WEBPACK_IMPORTED_MODULE_1__shared_message_service__["a" /* Message */]();
        this.isDisplayed = false;
        // This is a handle for clearing the setTimeout 
        // Which is necessary if a new message is to be displayed before another has been cleared
        this.timeoutHandle = null;
    }
    MessageBarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.messageService.messageUpdated.subscribe(function (message) {
            if (_this.timeoutHandle !== null) {
                clearTimeout(_this.timeoutHandle);
            }
            _this.message = message;
            _this.isDisplayed = true;
            // Remove notification after displayTime seconds
            _this.timeoutHandle = setTimeout(function () {
                _this.isDisplayed = false;
                _this.timeoutHandle = null;
            }, _this.message.displayTime * 1000);
        });
    };
    return MessageBarComponent;
}());
MessageBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-message-bar',
        template: __webpack_require__("../../../../../src/app/message-bar/message-bar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/message-bar/message-bar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_message_service__["c" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_message_service__["c" /* MessageService */]) === "function" && _a || Object])
], MessageBarComponent);

var _a;
//# sourceMappingURL=message-bar.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/brightspace-api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrightspaceAPIService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__session_service__ = __webpack_require__("../../../../../src/app/shared/session.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__message_service__ = __webpack_require__("../../../../../src/app/shared/message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BrightspaceAPIService = (function () {
    function BrightspaceAPIService(http, sessionService, messageService) {
        this.http = http;
        this.sessionService = sessionService;
        this.messageService = messageService;
        this.retrievedAPIResults = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    BrightspaceAPIService.prototype.getAPIResultsPromise = function (basePath, apiCommand, queryParameters) {
        // Guard against making a request with expired token
        if (!this.sessionService.isSessionExpired()) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            return this.http.post(document.URL + "api", {
                apiEndpoint: basePath + apiCommand,
                queryParameters: queryParameters
            }, { headers: headers }).toPromise();
        }
        else {
            this.messageService.messageUpdated.emit(new __WEBPACK_IMPORTED_MODULE_4__message_service__["a" /* Message */]("Token was expired!", "Wait until your token is refreshed.\nThen try again.", 10, "", __WEBPACK_IMPORTED_MODULE_4__message_service__["b" /* MessageEnum */].IS_WARNING));
            this.refreshSession();
        }
    };
    BrightspaceAPIService.prototype.getAPIResults = function (basePath, apiCommand, queryParameters) {
        var _this = this;
        this.getAPIResultsPromise(basePath, apiCommand, queryParameters).then(function (response) {
            var responseObject = response.json();
            var rs;
            // If there is only one result, it doesn't have properties of ResultSet...
            // So we add it for consistency
            if (responseObject['Items'] === undefined) {
                rs = {
                    "Items": [responseObject],
                    "PagingInfo": { "HasMoreItems": false }
                };
            }
            else {
                rs = responseObject;
            }
            _this.messageService.messageUpdated.emit(new __WEBPACK_IMPORTED_MODULE_4__message_service__["a" /* Message */]("Results Info:", JSON.stringify(rs.PagingInfo), 100));
            _this.retrievedAPIResults.emit(rs);
        }).catch(function (reason) {
            var message = new __WEBPACK_IMPORTED_MODULE_4__message_service__["a" /* Message */]("Error: HTTP GET request failed due to:", "", 100, reason.toString(), __WEBPACK_IMPORTED_MODULE_4__message_service__["b" /* MessageEnum */].IS_DANGER);
            switch (reason.status) {
                case 400: {
                    message.body = "Invalid search parameters";
                    break;
                }
                case 403: {
                    message.body = "Lack of permissions";
                    break;
                }
                case 404: {
                    message.body = "Resource not found";
                    break;
                }
            }
            _this.messageService.messageUpdated.emit(message);
        });
    };
    BrightspaceAPIService.prototype.refreshSession = function () {
        var _this = this;
        this.getRefreshedSessionObservable().subscribe(function (response) {
            var sessionResponse = response.json();
            _this.messageService.messageUpdated.emit(new __WEBPACK_IMPORTED_MODULE_4__message_service__["a" /* Message */]("Session refreshed", "Automatically refreshed your session", 10, "", __WEBPACK_IMPORTED_MODULE_4__message_service__["b" /* MessageEnum */].IS_SUCCESS));
            _this.sessionService.setSessionFromSessionResponse(sessionResponse);
        }, function (error) {
            console.log(error);
            _this.messageService.messageUpdated.emit(new __WEBPACK_IMPORTED_MODULE_4__message_service__["a" /* Message */]("Error: Trying to refresh session", error["_body"], // Typescript is hiding this property from me...
            100, error.toString(), __WEBPACK_IMPORTED_MODULE_4__message_service__["b" /* MessageEnum */].IS_DANGER));
        });
    };
    BrightspaceAPIService.prototype.getRefreshedSessionObservable = function () { return this.http.get(document.URL + "refresh"); };
    return BrightspaceAPIService;
}());
BrightspaceAPIService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__session_service__["a" /* SessionService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__message_service__["c" /* MessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__message_service__["c" /* MessageService */]) === "function" && _c || Object])
], BrightspaceAPIService);

var _a, _b, _c;
//# sourceMappingURL=brightspace-api.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/message.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MessageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MessageEnum; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MessageService = (function () {
    function MessageService() {
        this.messageUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    return MessageService;
}());
MessageService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], MessageService);

var Message = (function () {
    function Message(header, body, displayTime, additionalInfo, modifier) {
        if (header === void 0) { header = ""; }
        if (body === void 0) { body = ""; }
        if (displayTime === void 0) { displayTime = 1; }
        if (additionalInfo === void 0) { additionalInfo = ""; }
        if (modifier === void 0) { modifier = MessageEnum.IS_INFO; }
        this.header = header;
        this.body = body;
        this.displayTime = displayTime;
        this.additionalInfo = additionalInfo;
        this.modifier = modifier;
    }
    return Message;
}());

;
var MessageEnum = Object({
    IS_INFO: "is-info",
    IS_DANGER: "is-danger",
    IS_SUCCESS: "is-success",
    IS_WARNING: "is-warning",
});
//# sourceMappingURL=message.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/session.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SessionService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session__ = __webpack_require__("../../../../../src/app/shared/session.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SessionService = (function () {
    function SessionService() {
        this.sessionUpdated = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.session = new __WEBPACK_IMPORTED_MODULE_1__session__["a" /* Session */]();
    }
    SessionService.prototype.isSessionExpired = function () {
        return this.session.isExpired;
    };
    SessionService.prototype.getSessionExpiration = function () {
        return this.session.expiration;
    };
    SessionService.prototype.setSessionFromSessionResponse = function (sessionResponse) {
        var _this = this;
        this.session.expiration = new Date(sessionResponse.expiration);
        var currentTime = new Date();
        // Update whether the session should be expired or not
        var timeDifference = this.session.expiration.valueOf() - currentTime.valueOf();
        this.session.isExpired = timeDifference < 0;
        if (!this.session.isExpired) {
            // Emit Event so StatusBar can update
            this.sessionUpdated.emit();
            // Update the value of isExpired once the timer ends!
            setTimeout(function () {
                _this.session.isExpired = true;
            }, timeDifference);
        }
    };
    return SessionService;
}());
SessionService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SessionService);

//# sourceMappingURL=session.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/session.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Session; });
var Session = (function () {
    function Session() {
        this.isExpired = false;
        this.expiration = new Date();
    }
    return Session;
}());

//# sourceMappingURL=session.js.map

/***/ }),

/***/ "../../../../../src/app/shared/timer.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Timer; });
var Timer = (function () {
    /**
     * Count down timer class
     * @param fn Callback function called on every tick with the difference between
     * now and endDate as a parameter
     * @param endDate
     */
    function Timer(fn, endDate) {
        this.tickInterval = 1000;
        // Update the count down every 1 second
        var ticker = setInterval(function () {
            // Get todays date and time
            var now = new Date();
            // Find the distance between now an the count down date
            var difference = endDate.valueOf() - now.valueOf();
            fn(difference);
            // If the count down is finished, stop setInterval
            if (difference < 0) {
                clearInterval(ticker);
            }
        }, this.tickInterval);
    }
    return Timer;
}());

//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "../../../../../src/app/shared/util.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isValidJSON;
function isValidJSON(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "../../../../../src/app/status-bar/status-bar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/status-bar/status-bar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"columns is-centered\">\n  <div class=\"column is-narrow\" *ngIf=\"!isValidAccessToken\">Access Token: <span class=\"has-text-danger\">Expired</span> </div>\n  <div class=\"column is-narrow\" *ngIf=\"isValidAccessToken\">Access Token: <span class=\"has-text-success\">Active</span> </div>\n\n  <div class=\"column is-narrow\">Minutes remaining: <span>{{ countdown }}</span></div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/status-bar/status-bar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatusBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_timer__ = __webpack_require__("../../../../../src/app/shared/timer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_session_service__ = __webpack_require__("../../../../../src/app/shared/session.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StatusBarComponent = (function () {
    function StatusBarComponent(sessionService) {
        var _this = this;
        this.sessionService = sessionService;
        this.countdown = "0";
        this.sessionService.sessionUpdated.subscribe(function (sessionChanged) {
            _this.isValidAccessToken = !_this.sessionService.isSessionExpired();
            var timer = new __WEBPACK_IMPORTED_MODULE_1__shared_timer__["a" /* Timer */](function (difference) {
                var msToMin = 1 / (1000 * 60);
                _this.countdown = (difference * msToMin).toFixed(0);
            }, _this.sessionService.getSessionExpiration());
        });
    }
    return StatusBarComponent;
}());
StatusBarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-status-bar',
        template: __webpack_require__("../../../../../src/app/status-bar/status-bar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/status-bar/status-bar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_session_service__["a" /* SessionService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_session_service__["a" /* SessionService */]) === "function" && _a || Object])
], StatusBarComponent);

var _a;
//# sourceMappingURL=status-bar.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map