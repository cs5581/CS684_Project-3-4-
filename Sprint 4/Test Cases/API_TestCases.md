API Test Actions : 

- Verify Correct HTTPS Code: creating a resource should return 201 CREATED and unpermitted requests should return 403 FORBIDDEN. 
- Verify Response Payload: Check correct field names, types, and values — including in error responses.
- Verify response headers: HTTP server headers have implications on both security and performance.
- Verify correct application state: This is optional and applies mainly to manual testing, or when a UI or another interface can be easily inspected.  
- Verify basic performance sanity: If an operation was completed successfully but took an unreasonable amount of time, the test fails. 
 

## API is the /users endpoint, which includes the following API calls: 
| API Call | 	Action | 
| -------- | ------- |
| GET /users | 	List all users | 
| GET /users?name={username} | 	Get user by username |
| GET /users/{id} |	Get user by ID |
| GET /users/{id}/configurations |	Get all configurations for user | 
| POST /users/{id}/configurations |	Create a new configuration for user |
| DELETE /users/{id}/configurations/{id} |	Delete configuration for user |
| PATCH /users/{id}/configuration/{id}	| Update configuration for user |

## API TEST CASES 

| Test Scenario Category | Test Action Category | Test Action Description | Result | 
| -----------------------| -------------------- | ----------------------- | -------|
| Execute API call with valid required parameters  | Validate status code | 1. All requests should return 2XX HTTP status code 2. Returned status code is according to spec:  - 200 OK for GET requests - 201 for POST or PUT requests creating a new resource 200, 202, or 204 for a DELETE operation  | PASS |
|                | Validate payload:  | 1. Response is a well-formed JSON object 2. Response structure is according to data model (schema validation: field names and field types are as expected, including nested objects; field values are as expected; non-nullable fields are not null, etc.) | PASS  | 
|                | Validate state: | 1. For GET requests, verify there is NO STATE CHANGE in the system (idempotence) 2. For POST, DELETE, PATCH, PUT operations Ensure action has been performed correctly in the system by: Performing appropriate GET request and inspecting response Refreshing the UI in the web application and verifying new state (only applicable to manual testing) | PASS |
|                | Validate headers:  | Verify that HTTP headers are as expected, including content-type, connection, cache-control, expires, access control-allow-origin, keep-alive, HSTS, and other standard header fields – according to spec.  | PASS | 

