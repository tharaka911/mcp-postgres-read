# Local Development Guide

This guide describes how to set up the `postgres-read` MCP server for local development.

## Prerequisites

- [Bun](https://bun.sh) (v1.2.0 or later)
- PostgreSQL database
- Git

## Setup Instructions

1.  **Clone the Repository**

    ```bash
    git clone <your-repo-url>
    cd postgres-read
    ```

2.  **Install Dependencies**

    ```bash
    bun install
    ```

3.  **Environment Configuration**

    Create a `.env` file in the root directory:

    ```bash
    touch .env
    ```

    Add your PostgreSQL connection string to `.env`:

    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/dbname?sslmode=require
    ```

    > **Note:** Ensure your database is running and accessible.

## Running Locally

To start the server from source:

```bash
bun run index.ts
```

The server communicates via `stdin`/`stdout`. You won't see typical log output unless you attach a debugger or use an MCP client.

## Building the Project

To build a standalone executable:

```bash
bun run build
```

This will create a `postgres-read` binary in the current directory.

## Testing

To verify the server is working correctly, you can run the verification script:


```bash
cp .env.example .env
# Edit .env with your credentials
bun run test
```

This script simulates an MCP client, initializing the connection and listing available tools.
