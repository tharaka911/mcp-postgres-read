# IDE Configuration Guide

This guide explains how to configure the `postgres-read` MCP server for use with AI assistants and IDEs like Antigravity, Claude Desktop, and Cursor.

## Configuration File Locations

- **Antigravity / Generic**: Check your client's documentation.
- **Claude Desktop (macOS)**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Cursor**: `~/.cursor/mcp.json` (or via Settings > Features > MCP)

## Configuration Options

You can configure the server to run either from local source code or using a pre-built executable.

### Option 1: Running from Local Source code

Use this method if you have the source code checked out locally and want to make changes.

**Prerequisites:**
- [Bun](https://bun.sh) installed
- Repository cloned locally

**Configuration JSON:**

```json
{
  "mcpServers": {
    "postgres-read": {
      "command": "bun",
      "args": [
        "run",
        "/absolute/path/to/your/postgres-read/index.ts"
      ],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost:5432/dbname?sslmode=require"
      }
    }
  }
}
```

> **Note:** Replace `/absolute/path/to/your/postgres-read/index.ts` with the actual path to your `index.ts` file.

### Option 2: Running from Downloaded Build Artifact (Recommended for Use)

Use this method if you downloaded a pre-built binary from the GitHub Releases page.

**Configuration JSON:**

```json
{
  "mcpServers": {
    "postgres-read": {
      "command": "/absolute/path/to/downloaded/postgres-read",
      "args": [],
      "env": {
        "DATABASE_URL": "postgresql://user:password@localhost:5432/dbname?sslmode=require"
      }
    }
  }
}
```

> **Note:**
> 1. Replace `/absolute/path/to/downloaded/postgres-read` with the actual path to the executable.
> 2. Ensure the file has execute permissions (`chmod +x postgres-read`).
> 3. On macOS, you may need to allow the executable to run in System Settings > Privacy & Security if it's blocked.

## Environment Variables

The server requires the following environment variable:

- `DATABASE_URL`: A valid PostgreSQL connection string (e.g., `postgresql://user:password@host:port/dbname`).
