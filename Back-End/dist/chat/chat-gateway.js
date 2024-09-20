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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.messages = [];
    }
    handleConnection(client) {
        if (client && client.id) {
            this.server.emit('user-joined', {
                message: `User Joined The Chat: ${client.id}`,
            });
        }
        else {
            console.error('Client or client.id is undefined during connection');
        }
    }
    handleDisconnect(client) {
        this.server.emit('user-left', {
            message: `User Left The Chat: ${client.id}`,
        });
    }
    handleNewMessage(message) {
        if (message && message.userId) {
            const newMessage = {
                userId: message.userId,
                message: message.message,
                timestamp: new Date(),
            };
            this.messages.push(newMessage);
            this.server.emit('message', newMessage);
        }
        else {
            console.error('Message or userId is undefined');
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleNewMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3005, {
        cors: {
            origin: '*',
        }
    })
], ChatGateway);
//# sourceMappingURL=chat-gateway.js.map