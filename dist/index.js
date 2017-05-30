var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const API_REQUEST = 'API_REQUEST';
export const TYPE = {
    success: "SUCCESS",
    failure: "FAILURE",
    error: "ERROR"
};
export default function apiMiddleware() {
    return (next) => (action) => __awaiter(this, void 0, void 0, function* () {
        if (!isValidRequest(action)) {
            return next(action);
        }
        const request = action[API_REQUEST];
        try {
            const response = yield fetch(request.url, {
                method: request.method ? request.method : "GET",
                headers: request.header ? request.header : {},
                body: request.body ? JSON.stringify(request.body) : undefined
            });
            let data = yield response.json();
            if (!isValidResponse(response.status)) {
                return next({
                    type: request.action && request.action.failure ? request.action.failure : TYPE.failure,
                    payload: data,
                    error: true
                });
            }
            return next({
                type: request.action && request.action.success ? request.action.success : TYPE.success,
                payload: data,
                error: false
            });
        }
        catch (e) {
            return next({
                type: request.action && request.action.error ? request.action.error : TYPE.error,
                payload: e,
                error: true
            });
        }
    });
}
function isValidRequest(action) {
    return typeof action === 'object' && action.hasOwnProperty(API_REQUEST);
}
function isValidResponse(status) {
    return status === 200;
}
