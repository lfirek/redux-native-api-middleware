redux-native-api-middleware
====================
# Info
Middleware is lightweight http request dispatcher created for native applications (React Native).

Lightweight means without dependencies in pure modern js


# Examples

Simple Action
```js
import API_REQUEST from 'redux-native-api-middleware';

function action() {
    return {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
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
import API_REQUEST from 'redux-native-api-middleware';

function action() {
    return {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
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
    error = false
}
```

## FAILURE

Type failure means your request not get HTTP status code 200 without any other errors

```js
Action {
    type = action.failure
    payload = JSON parsed response
    error = true
}
```

## ERROR

Type error means we got exception on some point of code (ex. response parsing)

```js
Action {
    type = action.error
    payload = ERROR object
    error = true
}
```

