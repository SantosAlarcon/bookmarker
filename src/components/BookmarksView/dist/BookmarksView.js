"use client";
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var updateBookmarkList_1 = require("@/app/utils/updateBookmarkList");
var authStore_1 = require("@/store/authStore");
var bookmarksStore_1 = require("@/store/bookmarksStore");
var filterStore_1 = require("@/store/filterStore");
var framer_motion_1 = require("framer-motion");
var next_i18next_1 = require("next-i18next");
var react_1 = require("react");
var BookmarkFolderComponent_1 = require("../BookmarkFolderComponent/BookmarkFolderComponent");
var BookmarkItemComponent_1 = require("../BookmarkItemComponent/BookmarkItemComponent");
var BookmarkSkeleton_1 = require("../BookmarkSkeleton/BookmarkSkeleton");
var ConfirmDeleteDialog_1 = require("../Dialogs/ConfirmDeleteDialog/ConfirmDeleteDialog");
var EditBookmarkDialog_1 = require("../Dialogs/EditBookmarkDialog/EditBookmarkDialog");
var EditFolderDialog_1 = require("../Dialogs/EditFolderDialog/EditFolderDialog");
var BookmarksView_module_scss_1 = require("./BookmarksView.module.scss");
var NotFound_1 = require("./NotFound");
var NoResultsFound_1 = require("./NoResultsFound");
var BookmarksView = function () {
    // Load the translation function with the "common" namespace
    var t = next_i18next_1.useTranslation("common").t;
    // Get and set the bookmarks from the store
    var bookmarksList = bookmarksStore_1.bookmarksStore(function (state) { return state.bookmarksList; });
    var allBookmarksList = bookmarksStore_1.bookmarksStore(function (state) { return state.allBookmarksList; });
    // Get the filter from the filter store
    var filter = filterStore_1.filterStore(function (state) { return state.filter; });
    // Get the session from the store because it already has the session information fetched in the auth button.
    var session = authStore_1.authStore(function (state) { return state.session; });
    // Get and set the loading state
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(__spreadArrays(bookmarksList)), filteredList = _b[0], setFilteredList = _b[1];
    // Get the root folders so that can be rendered first
    react_1.useEffect(function () {
        setLoading(true);
        var getRootItems = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, updateBookmarkList_1.updateBookmarkList()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        getRootItems();
        setLoading(false);
    }, [session]);
    react_1.useEffect(function () {
        setFilteredList(bookmarksList);
    }, []);
    react_1.useEffect(function () {
        if (filter === "" || filter === undefined) {
            setFilteredList(__spreadArrays(bookmarksList));
        }
        else {
            // @ts-ignore
            setFilteredList(__spreadArrays(allBookmarksList).filter(function (item) {
                var _a, _b;
                return ((_a = item.bookmark_title) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(filter)) || ((_b = item.folder_title) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(filter));
            }));
        }
    }, [filter, bookmarksList]);
    return (React.createElement(React.Fragment, null,
        React.createElement(EditBookmarkDialog_1["default"], { title: t("edit-bookmark-title") }),
        React.createElement(EditFolderDialog_1["default"], { title: t("edit-folder-title") }),
        React.createElement(ConfirmDeleteDialog_1["default"], { title: t("delete-item") }),
        React.createElement("main", { className: BookmarksView_module_scss_1["default"].bookmarks__view__container }, loading ? (
        // If not bookmarks are loaded, it shows skeleton component
        Array.from({ length: 10 }).map(function (_, i) { return React.createElement(BookmarkSkeleton_1["default"], { key: i }); })) :
            // If there are, it renders the folders and bookmarks
            bookmarksList.length > 0 ? (
            // First render the root folders and its children
            React.createElement(framer_motion_1.motion.ul, { layout: true, initial: "false", className: BookmarksView_module_scss_1["default"].bookmarks__view__list }, filteredList === null || filteredList === void 0 ? void 0 : filteredList.map(function (item, index) {
                {
                    /* If the item have the folder_id field, it renders a folder component. */
                }
                if (item.hasOwnProperty("folder_id")) {
                    return (React.createElement(framer_motion_1.motion.li, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { scale: 0 }, transition: { delay: 0.1 * index }, key: item.folder_id },
                        React.createElement(BookmarkFolderComponent_1["default"], { key: item.folder_id }, item)));
                }
                else {
                    return (React.createElement(framer_motion_1.motion.li, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { scale: 0 }, transition: { delay: 0.1 * index }, key: item.bookmark_id },
                        React.createElement(BookmarkItemComponent_1["default"], { key: item.bookmark_id }, item)));
                }
            }))) : (
            // If there not any bookmarks/folders, it shows a message of it.
            // In case that no search ocurrences are found, it shows a message of it.
            React.createElement("div", { className: BookmarksView_module_scss_1["default"].bookmarks__view__paragraph }, filteredList.length === 0 && (filter !== "" || filter !== undefined)
                ? (React.createElement(NotFound_1["default"], null))
                : (React.createElement(NoResultsFound_1["default"], null)))))));
};
exports["default"] = BookmarksView;
