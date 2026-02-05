# Data Model: Premium UI and BetterAuth Integration

## Entities

### User (BetterAuth Integration)

This entity represents the user within the context of the application, integrated with BetterAuth. The core attributes will be managed by BetterAuth, but relevant identifiers will be stored and used by our application.

-   **`id`**: Unique identifier for the user. (Type: Integer/UUID, sourced from BetterAuth/our database).
-   **`username`**: User's chosen username. (Type: String, sourced from BetterAuth).
-   **`email`**: User's email address. (Type: String, sourced from BetterAuth).
-   **`is_active`**: Boolean indicating if the user's account is active. (Type: Boolean, potentially managed by BetterAuth or our system).
-   **`create_date`**: Timestamp of user creation. (Type: DateTime).
-   **`update_date`**: Timestamp of last user update. (Type: DateTime).

**Relationships**:
-   One-to-many with `Task` (a user can have multiple tasks). The `owner_id` in the `Task` entity will link to the `User.id`.

### Task (Existing Entity, updated for BetterAuth `owner_id`)

This entity represents a single task created by a user. Its structure remains largely the same, but the `owner_id` will now reference the `User.id` managed via BetterAuth.

-   **`id`**: Unique identifier for the task. (Type: Integer).
-   **`title`**: Title of the task. (Type: String).
-   **`description`**: Detailed description of the task. (Type: String).
-   **`status`**: Current status of the task (e.g., "pending", "completed"). (Type: String).
-   **`owner_id`**: Foreign key linking to the `User.id` who owns this task. (Type: Integer/UUID).
-   **`create_date`**: Timestamp of task creation. (Type: DateTime).
-   **`update_date`**: Timestamp of last task update. (Type: DateTime).

**Relationships**:
-   Many-to-one with `User` (many tasks can belong to one user).
