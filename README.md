# electricity-app-solita

## Implemented features:
• Total electricity consumption per day<br>
• Total electricity production per day<br>
• Average electricity price per day<br>
• Longest consecutive time in hours, when electricity price has been negative, per day<br>

## Additional implemented features:
• Pagination<br>

## Extras: <br>
•E2E test <br>
•One unit test <br>

## Instructions on how to run the project:

### Prerequisities
Node.js v25.2.1 <br>
pnpm 10.28.0 <br>
Angular CLI 21.10.<br> 
npm 11.6.2 <br>
Docker (for database)<br>

Both backend and frontend are written in TypeScript.

### Deploy database container locally

Start the database as instructed in the Solita exercise assignment.

### Run the backend
Navigate to the backend folder<br>
Install dependencies with: ```pnpm install --frozen-lockfile``` <br>
Build the project with: ```pnpm run build```

For local setup on Linux/MacOS terminal set these environment variables:
```export PORT=3000```
```export DB_HOST=localhost```
```export DB_USER=academy```
```export DB_NAME=electricity```
```export DB_PASSWORD=academy```
```export DB_PORT=5432```<br>

Start the backend with: pnpm run start. <br>

### Run the frontend
Navigate to the frontend folder<br>
Insall depencies: ```npm ci```<br>
Start the development server: ```ng serve```

### Access the application: <br>
http://localhost:4200





