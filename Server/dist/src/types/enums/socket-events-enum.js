"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketEvent;
(function (SocketEvent) {
    SocketEvent["SEND_CHANGES"] = "send-changes";
    SocketEvent["RECEIVE_CHANGES"] = "receive-changes";
    SocketEvent["CURRENT_USER_UPDATE"] = "current-users-update";
})(SocketEvent || (SocketEvent = {}));
exports.default = SocketEvent;
