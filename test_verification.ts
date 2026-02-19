
import { spawn } from "child_process";


if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL environment variable is not set.");
    console.error("Please create a .env file in the root directory. You can copy .env.example:");
    console.error("  cp .env.example .env");
    console.error("Then edit .env with your PostgreSQL connection details.");
    process.exit(1);
}

const serverProcess = spawn("bun", ["run", "index.ts"], {
    stdio: ["pipe", "pipe", "pipe"],
    env: process.env,
});

serverProcess.stderr.on("data", (data) => {
    console.error(`[Server Error]: ${data}`);
});

let buffer = "";

serverProcess.stdout.on("data", (data) => {
    buffer += data.toString();
    const lines = buffer.split("\n");

    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const response = JSON.parse(line);
            console.log("Received response:", JSON.stringify(response, null, 2));

            if (response.id === 1) {
                console.log("Initialize successful, sending initialized notification and list_tools request...");
                // Send initialized notification
                serverProcess.stdin.write(JSON.stringify({
                    jsonrpc: "2.0",
                    method: "notifications/initialized"
                }) + "\n");

                // Send tools/list request
                serverProcess.stdin.write(JSON.stringify({
                    jsonrpc: "2.0",
                    id: 2,
                    method: "tools/list",
                    params: {}
                }) + "\n");
            } else if (response.id === 2) {
                console.log("Tools list received!");
                if (response.result && response.result.tools) {
                    console.log(`Found ${response.result.tools.length} tools.`);
                    process.exit(0);
                } else {
                    console.error("No tools found in response");
                    process.exit(1);
                }
            }
        } catch (e) {
            // Incomplete JSON, wait for more data
        }
    }
    // Keep the last incomplete part in buffer
    if (!buffer.endsWith("\n")) {
        const lastNewline = buffer.lastIndexOf("\n");
        if (lastNewline !== -1) {
            buffer = buffer.substring(lastNewline + 1);
        }
    } else {
        buffer = "";
    }
});

// Send initialize request
const initRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" }
    }
};

console.log("Sending initialize request...");
serverProcess.stdin.write(JSON.stringify(initRequest) + "\n");

// Timeout
setTimeout(() => {
    console.error("Timeout waiting for response");
    serverProcess.kill();
    process.exit(1);
}, 5000);
