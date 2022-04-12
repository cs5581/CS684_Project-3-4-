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

| Test Case ID | Testing Description | Test Result | 
| ------------ | ------------------- | ----------- |
| API_TC 01    |  | PASS |
| API_TC 02    |  | PASS | 
| API_TC 03    |  | PASS |
| API_TC_04    |  | PASS | 
