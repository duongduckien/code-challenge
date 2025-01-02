# Scoreboard APIs

### I. The modules
##### 1. Authentication
###### 1.1 Login
- ```POST /auth/login```
- Authorize a user and return the JWT token.
###### 1.2 Register
- ```POST /auth/register```
- Create a new user.
##### 2. Score
###### 2.1 Get top 10 user's scores
- ```GET /score/top```
- Get the top 10 users with the highest scores.
##### 3. Action
###### 3.1 Do an action
- ```POST /action```
- Do an action for the current user.
##### 4. User
###### 4.1 Get the current user
- ```GET /user/me```
- Fetch the current user data.
##### 5. Web Socket
###### 5.1 Backend
- At this endpoint ```POST /action```, after increasing the current user scores by an action, the logic will fetch the latest top 10 user's scores.
- Define the event type: Eg. ```TOP_SCORES```
- Broadcast the latest top 10 user's scores to the clients by using that event type.
###### 5.2 Frontend
- Setup websocket connection.
- Listen the websocket message with the event type: ```TOP_SCORES```
- Update the frontend by using the received data.
### II. Security
- Using JWT to make sure only authenticated users can do an action.
- Using a rate limiting to prevent users from spamming the action endpoint. Eg. Limit 10 actions per minute.
- Log all actions for fraud detection and auditing.
- Using HTTPS
- Avoid duplication actions by storing the last action timestamp in the database.