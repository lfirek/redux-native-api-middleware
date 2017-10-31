export const API_REQUEST = 'API_REQUEST';
export const TYPE = {
    success: "SUCCESS",
    failure: "FAILURE",
    error: "ERROR"
};

export interface Action {
    type: string
    payload: any
    additional: any
    error: boolean
}

export default function apiMiddleware() {
    return (next: (action: Action) => any) => async (action: any) => {
        if (!isValidRequest(action)) {
            return next(action)
        }

        const request = action[API_REQUEST];
        let additional = request.additional;

        try {
            const response = await fetch(request.url, {
                method: request.method ? request.method : "GET",
                headers: request.header ? request.header : {},
                body: request.body ? JSON.stringify(request.body) : undefined
            });

            let data = await response.json();

            if (!isValidResponse(response.status)) {
                return next({
                    type: request.action && request.action.failure ? request.action.failure : TYPE.failure,
                    payload: data,
                    additional: additional,
                    error: true
                })
            }

            return next
                ({
                    type: request.action && request.action.success ? request.action.success : TYPE.success,
                    payload: data,
                    additional: additional,
                    error: false
                })
        } catch (e) {
            return next({
                type: request.action && request.action.error ? request.action.error : TYPE.error,
                payload: e,
                additional: additional,
                error: true
            })
        }
    }
}

function isValidRequest(action: any) {
    return typeof action === 'object' && action.hasOwnProperty(API_REQUEST);
}

function isValidResponse(status: number) {
    return status === 200
}
