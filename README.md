## Steps to start the back-end app --
After pulling from the git repo and cd into the project root folder --
1. Ensure you have Docker and Docker Compose installed on the system.
2. Ensure you have node version 20 installed.
3. Run -- npm i
4. To start Postgres Container run -- docker-compose up -d
5. Run database migrations -- npm run typeorm:migration:run
6. Start the nestJs app -- npm run start


## Features and Functions -- 
1. Authentication Implemented with protected routes using JWT, NestJs Guards and Strategies. Passwords stored in hashed format using bcrypt.
2. DTO's and Validation pipes implemented.
3. Implemented REST API endpoints for products and users--
    a. POST     /auth/create-account
    b. POST     /auth/login
    c. GET      /products
    d. POST     /products
    e. GET      /products/:id
    f. PATCH    /products/:id
    g. DELETE   /products/:id
4. PostgreSQL tables implemented to store 2 tables : products and users. 
5. Appropriate Exception Handling with status code and messages.
6. env file used to insert system specific environment variables and addresses. 
7. Docker used to implement a containerised Postges Database.
