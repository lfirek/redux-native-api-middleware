import 'isomorphic-fetch'
import configureStore from 'redux-mock-store'
import * as nock from 'nock'
import middleware, { API_REQUEST, TYPE } from '../src/index'

const middlewares = [middleware]
const mockStore = configureStore(middlewares)
declare var window: any;

describe("Test Case", () => {
    it('Success response [GET]', () => {

        const initialState = {}
        const response = {
            id: '1',
            username: 'first',
            email: 'first@second.com'
        };

        const http = nock('http://www.example.com')
            .get('/resource')
            .reply(200, response);

        const store = mockStore(initialState)

        const middlewareRequest = {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }

        return store.dispatch(middlewareRequest).then(function () {
            const actions = store.getActions()
            const expectedPayload = { type: TYPE.success, payload: response, error: false }
            expect(actions).toEqual([expectedPayload])
        })
    })


    it('Failure response', () => {

        const initialState = {}
        const response = {
            id: '1',
            username: 'first',
            email: 'first@second.com'
        };

        const http = nock('http://www.example.com')
            .get('/resource')
            .reply(500, response);

        const store = mockStore(initialState)

        const middlewareRequest = {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }

        return store.dispatch(middlewareRequest).then(function () {
            const actions = store.getActions()
            const expectedPayload = { type: TYPE.failure, payload: response, error: true }
            expect(actions).toEqual([expectedPayload])
        })
    })


    it('Error response', () => {

        const initialState = {}
        const response = "ERROR";

        const http = nock('http://www.example.com')
            .get('/resource')
            .reply(500, response);

        const store = mockStore(initialState)

        const middlewareRequest = {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }

        return store.dispatch(middlewareRequest).then(function () {
            const actions = store.getActions()
            expect(actions[0].type).toEqual(TYPE.error)
            expect(actions[0].error).toEqual(true)
            expect(actions[0].payload).toBeInstanceOf(Error)
        })
    })


    it('Fake dispatch', () => {

        const initialState = {}
        const store = mockStore(initialState)
        const action = { type: "FAKE" }
        return store.dispatch(action).then(function () {
            const actions = store.getActions()
            expect(actions).toEqual([action])
        })
    })

    it('Fake dispatch and success response', () => {

        const initialState = {}
        const response = {
            id: '1',
            username: 'first',
            email: 'first@second.com'
        };

        const http = nock('http://www.example.com')
            .get('/resource')
            .reply(200, response);

        const store = mockStore(initialState)

        const middlewareRequest = {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        const action = { type: "FAKE" }
        return store.dispatch(action).then(function () {
            return store.dispatch(middlewareRequest)
        }).then(function () {
            const actions = store.getActions()
            const expectedPayload = { type: TYPE.success, payload: response, error: false }
            expect(actions).toEqual([action, expectedPayload])
        })
    })

})
