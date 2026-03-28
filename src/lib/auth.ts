import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

// Cached MongoClient singleton (survives HMR in dev)
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

function getMongoClient(): MongoClient {
    if (!globalForMongo._mongoClient) {
        const uri = process.env.MONGODB_URI || "";
        globalForMongo._mongoClient = new MongoClient(uri, {
            tls: true,
            // Retry on transient network failures
            retryWrites: true,
            retryReads: true,
        });
    }
    return globalForMongo._mongoClient;
}

const client = getMongoClient();
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        jwt()
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }
    },
    trustedOrigins: process.env.BETTER_AUTH_URL 
        ? [process.env.BETTER_AUTH_URL, "http://localhost:3000"] 
        : ["http://localhost:3000"],
});
