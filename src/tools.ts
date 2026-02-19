
import db from "./db.js";
import { safeQuery } from "./validation.js";

export const TOOLS = [
    {
        name: "query",
        description: "Execute a read-only SQL SELECT query against the database",
        inputSchema: {
            type: "object",
            properties: {
                sql: { type: "string", description: "A SELECT or WITH (CTE) SQL statement" }
            },
            required: ["sql"]
        }
    },
    {
        name: "list_tables",
        description: "List all tables in the public schema",
        inputSchema: { type: "object", properties: {} }
    },
    {
        name: "describe_table",
        description: "Get column definitions and types for a specific table in the public schema",
        inputSchema: {
            type: "object",
            properties: {
                table_name: { type: "string", description: "Table name" }
            },
            required: ["table_name"]
        }
    }
];

export async function handleCallTool(name: string, args: any) {
    switch (name) {
        case "query": {
            const rows = await safeQuery(args?.sql as string);
            return {
                content: [{ type: "text", text: JSON.stringify(rows, null, 2) }]
            };
        }

        case "list_tables": {
            const rows = await db.unsafe(`
                SELECT table_name, table_type
                FROM information_schema.tables
                WHERE table_schema = 'public'
                ORDER BY table_name
            `);
            return {
                content: [{ type: "text", text: JSON.stringify(rows, null, 2) }]
            };
        }

        case "describe_table": {
            // Sanitize table name — only allow alphanumeric and underscores
            const tableName = (args?.table_name as string).replace(/[^a-zA-Z0-9_]/g, "");
            const rows = await db.unsafe(`
                SELECT column_name, data_type, is_nullable, column_default, character_maximum_length
                FROM information_schema.columns
                WHERE table_schema = 'public'
                AND table_name = '${tableName}'
                ORDER BY ordinal_position
            `);
            return {
                content: [{ type: "text", text: JSON.stringify(rows, null, 2) }]
            };
        }

        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}
