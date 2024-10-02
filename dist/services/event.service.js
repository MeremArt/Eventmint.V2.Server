"use strict";
// services/event.service.ts
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
const event_model_1 = __importDefault(require("../models/event.model"));
class EventService {
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield event_model_1.default.create(event);
        });
    }
    getEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield event_model_1.default.findById(id);
            if (!event)
                throw new Error('invalid eventID');
            return event;
        });
    }
    getEventByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield event_model_1.default.findOne(query);
            return event;
        });
    }
    getEvents(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield event_model_1.default.find(query).maxTimeMS(5000);
            return event;
        });
    }
}
exports.default = EventService;
