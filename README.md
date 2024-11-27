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
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   ├── server.ts          # App entry point
├── .env                   # Environment variables
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

----------

## 🚀 Running the Application

### Development Mode

```bash
yarn dev

```

----------

## 📚 API Documentation

The API comes with live documentation powered by **Swagger**.
 Access it at:  
`http://localhost:<PORT>/api-docs`

### Available Endpoints:

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

List movers by completed missions.

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

-   Ensure MongoDB is running locally or provide a remote database URI in `.env`.
-   Contributions are welcome. Fork the repo, make changes, and open a pull request!
