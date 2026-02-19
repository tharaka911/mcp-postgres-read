
import db from "./db.js";

const BLOCKED_PATTERNS = [
    /^\s*(INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|CREATE|REPLACE|MERGE|GRANT|REVOKE|COPY)\s/i,
    /;\s*(INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|CREATE)/i,
    /--.*?;/i,
];

export function validateQuery(query: string): { valid: boolean; reason?: string } {
    const trimmed = query.trim();
    if (!trimmed) return { valid: false, reason: "Empty query" };
    if (!/^\s*(SELECT|WITH|EXPLAIN)\s/i.test(trimmed)) {
        return { valid: false, reason: "Only SELECT, WITH (CTEs), and EXPLAIN are permitted" };
    }
    for (const pattern of BLOCKED_PATTERNS) {
        if (pattern.test(trimmed)) {
            return { valid: false, reason: "Query contains disallowed operations" };
        }
    }
    return { valid: true };
}

export async function safeQuery(query: string) {
    const check = validateQuery(query);
    if (!check.valid) throw new Error(`Query rejected: ${check.reason}`);
    return await db.unsafe(query);
}
