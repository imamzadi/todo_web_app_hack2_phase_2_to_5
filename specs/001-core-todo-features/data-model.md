# Data Model: Core TODO Application

Based on the feature specification, the following data models are defined.

## User

Represents a registered user in the system.

| Field           | Type      | Constraints      | Description                            |
|-----------------|-----------|------------------|----------------------------------------|
| id              | integer   | Primary Key      | Unique identifier for the user.        |
| email           | string    | Not Null, Unique | User's email address.                  |
| hashed_password | string    | Not Null         | Hashed password for the user.          |
| created_at      | timestamp | Not Null         | Timestamp of when the user was created.|

## Task

Represents a single to-do item.

| Field       | Type      | Constraints      | Description                               |
|-------------|-----------|------------------|-------------------------------------------|
| id          | integer   | Primary Key      | Unique identifier for the task.           |
| user_id     | integer   | Foreign Key (User) | The user who owns the task.              |
| title       | string    | Not Null         | The title of the task.                    |
| description | text      | Nullable         | A detailed description of the task.       |
| status      | string    | Not Null         | The status of the task ('pending' or 'completed'). |
| due_date    | date      | Nullable         | The due date for the task.                |
| created_at  | timestamp | Not Null         | Timestamp of when the task was created.   |

## Relationships

-   A `User` can have many `Task`s.
-   A `Task` belongs to one `User`.
