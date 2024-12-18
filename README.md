# 🧙‍♂️ Magic Movers API

**Fueling magical logistics with ease!** This API manages **Magic Movers** and their **Magic Items** to handle missions and items with virtual magic. 🚀

----------

## ✨ Features

-   **Add a Magic Mover** 🏋️‍♂️
-   **Add a Magic Item** 📦
-   **Load a Magic Mover with Items** 🔄
-   **Start a Mission**: Change mover state to `on-mission` and log the activity. ✈️
-   **End a Mission**: Unload items, return mover to `resting` state, and log the activity. 🛬
-   **Fetch Movers by Completed Missions** (Descending order). 📊
-   **View Logs** 📜
-   **Clear Logs** ❌
-   **Clear All Magic Items** 🗑️
-   **Fetch All Magic Items** 🔍

----------

## 🗂️ Project Structure

```plaintext
magic-movers/
├── src/
│   ├── controllers/       # API logic
│   ├── middlewares/       # Middlewares
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions	
│   ├── server.ts          # App entry point
├── Dockerfile             # Docker image instructions
├── docker-compose.yaml    # Docker Compose configuration
├── .dockerignore          # Ignored files for Docker builds
├── .env.example           # Sample environment variables
├── README.md              # Project documentation
├── package.json           # Project metadata
└── tsconfig.json          # TypeScript configuration

```

----------

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/HAWKZ4/magic-transporters.git
cd magic-transporters

```

----------

## 🐳 Running with Docker

Docker allows you to containerize the application for consistent environments. Follow these steps:

### 1. Prepare Environment Variables

-   Copy `.env.example` to `.env`:
    
    ```bash
    cp .env.example .env
    
    ```
    
-   Update `.env` with your configuration:
    
    ```env
    DATABASE_URI=mongodb://mongodb:27017/magictransporters
    NODE_ENV=development
    
    ```
    

### 2. Build and Run the Application

-   To build and start the services, use:
    
    ```bash
    docker-compose up --build
    
    ```
    
-   The API will be accessible at:  
    `http://localhost:8000`  
    The MongoDB instance will run on:  
    `mongodb://localhost:27017`

### 3. Stop the Services

-   To stop the services without deleting containers:
    
    ```bash
    docker-compose stop
    
    ```
    
-   To remove containers, networks, and volumes:
    
    ```bash
    docker-compose down
    
    ```
    

### 4. Persistent Storage

-   Data will persist across container restarts due to the configured Docker volume (`mongo-data`).
-   To reset the database, remove the `mongo-data` volume:
    
    ```bash
    docker volume rm magic-movers_mongo-data
    
    ```
    

----------

## 🚀 Running Without Docker

If you prefer to run the application without Docker:

### Install Dependencies

```bash
yarn install

```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
NODE_ENV=development
DATABASE_URI=your_mongodb_uri

```

### Start the Application

```bash
yarn dev

```

----------

## 📚 API Documentation

The API comes with live documentation powered by **Swagger**.  
Access it at:  
`http://localhost:<PORT>/api-docs`

### Available Endpoints

#### **Magic Movers**

Method

Endpoint

Description

POST

`/api/magic-movers`

Add a new magic mover.

PUT

`/api/magic-movers/:id/load`

Load a mover with items.

PUT

`/api/magic-movers/:id/start-mission`

Start a mission.

PUT

`/api/magic-movers/:id/end-mission`

End a mission.

GET

`/api/magic-movers`

List movers by missions.

DELETE

`/api/magic-movers`

Clear all magic movers.

#### **Magic Items**

Method

Endpoint

Description

POST

`/api/magic-items`

Add a new magic item.

GET

`/api/magic-items`

Fetch all magic items.

DELETE

`/api/magic-items`

Clear all magic items.

#### **Logs**

Method

Endpoint

Description

GET

`/api/logs`

Fetch all logs.

DELETE

`/api/logs`

Clear all logs.

----------

## 🧪 Testing

Testing is not yet implemented. Feel free to contribute! 🚀

----------

## 📜 License

This project is licensed under the MIT License.

----------

## 📝 Notes

-   Contributions are welcome. Fork the repo, make changes, and open a pull request!
-   Using Docker ensures consistency across environments, making it the recommended way to run this project.

----------