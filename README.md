# Postgres Read MCP Server

A Model Context Protocol (MCP) server that provides read-only access to a PostgreSQL database. It allows AI assistants like Antigravity, Claude, or Cursor to safely query your database and inspect schemas.

## Documentation

- **[Local Development Guide](./local_development.md)**  
  Instructions for setting up the project locally, installing dependencies, and running tests.

- **[IDE Configuration Guide](./ide_configuration.md)**  
  How to configure this MCP server with AI clients like:
  - Antigravity
  - Claude Desktop
  - Cursor

- **[Contribution Guide](./contribution_guide.md)**  
  Guidelines for contributing to the project, reporting issues, and submitting pull requests.

## Features

- **Read-Only Access**: Safely query your database without risk of modification.
- **Schema Inspection**: List tables and view table definitions.
- **Secure**: Uses environment variables for connection strings.
- **Fast**: Built on the [Bun](https://bun.sh) runtime.

## Available Tools

- **`list_tables`**: List all tables in the public schema.
- **`describe_table`**: Get schema details for a specific table.
- **`query`**: Execute a read-only SQL query (`SELECT` only).
