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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./index"));
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const document_service_1 = __importDefault(require("./services/document.service"));
const socket_events_enum_1 = __importDefault(require("./types/enums/socket-events-enum"));
const env_config_1 = __importDefault(require("./config/env.config"));
const port = 8080;
const server = http_1.default.createServer(index_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: "*",
    },
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
io.on("connection", (socket) => {
    const accessToken = socket.handshake.query.accessToken;
    const documentId = socket.handshake.query.documentId;
    if (!accessToken || !documentId)
        return socket.disconnect();
    else {
        jsonwebtoken_1.default.verify(accessToken, env_config_1.default.ACCESS_TOKEN_SECRET, (err, decoded) => {
            const { id, email } = decoded;
            socket.username = email;
            document_service_1.default
                .findDocumentById(parseInt(documentId), parseInt(id))
                .then((document) => __awaiter(void 0, void 0, void 0, function* () {
                if (document === null)
                    return socket.disconnect();
                socket.join(documentId);
                io.in(documentId)
                    .fetchSockets()
                    .then((clients) => {
                    io.sockets.in(documentId).emit(socket_events_enum_1.default.CURRENT_USER_UPDATE, clients.map((client) => client.username));
                });
                socket.on(socket_events_enum_1.default.SEND_CHANGES, (rawDraftContentState) => {
                    socket.broadcast
                        .to(documentId)
                        .emit(socket_events_enum_1.default.RECEIVE_CHANGES, rawDraftContentState);
                });
                socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
                    socket.leave(documentId);
                    socket.disconnect();
                    io.in(documentId)
                        .fetchSockets()
                        .then((clients) => {
                        io.sockets.in(documentId).emit(socket_events_enum_1.default.CURRENT_USER_UPDATE, clients.map((client) => client.username));
                    });
                }));
            }))
                .catch((error) => {
                console.log(error);
                return socket.disconnect();
            });
        });
    }
});
