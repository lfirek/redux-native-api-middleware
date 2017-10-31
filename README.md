redux-native-api-middleware
====================
# Info
Middleware is lightweight http request dispatcher created for native applications (React Native).

Lightweight means without dependencies in pure modern js

# Install

```
npm install --save redux-native-api-middleware
```

# Adding middleware to redux store

store
```js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import apiMiddleware from 'redux-native-api-middleware';
import reducers from './reducers';

const reducer = combineReducers(reducers);
const initialState = {};

const store = createStore(reducer, initialState, applyMiddleware(
    middelware,
));
```

# Examples

Simple Action
```js
import { API_REQUEST } from 'redux-native-api-middleware'

function action() {
    return {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource/123',
                method: "GET",
                headers: {
                  'Content-Type': 'application/json'
                }
            }
    }
}
```

Full Action
```js
import { API_REQUEST } from 'redux-native-api-middleware';

function action() {
    return {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource/123',
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: {
                    'username' : 'npm-user'
                    'password' : 'test'
                },
                action: {
                        success: "SUCCESS",
                        failure: "FAILURE",
                        error: "ERROR"
                },
                additional  : {
                    resource : 123
                }
                
            }
    }
}
```


Action Response Interface
```js
interface Action {
    type: string
    payload: any
    additional: any
    error: boolean
}
```

# Action Types

## SUCCESS

Type success means your request get HTTP status code 200 without any other errors

```js
Action {
    type = action.success
    payload = JSON parsed response
    additional = additional data
    error = false
}
```

## FAILURE

Type failure means your request not get HTTP status code 200 without any other errors

```js
Action {
    type = action.failure
    payload = JSON parsed response
    additional = additional data
    error = true
}
```

## ERROR

Type error means we got exception on some point of code (ex. response parsing)

```js
Action {
    type = action.error
    payload = ERROR object
    additional = additional data
    error = true
}
```

