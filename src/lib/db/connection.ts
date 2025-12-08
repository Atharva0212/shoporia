import mongoose from "mongoose";
import { DbModels } from "./types";
import { ModelStore } from "./modelStore";

declare global {
    var dbCache: {
        cachedConnection: mongoose.Connection | null,
        cachedConnectionPromises: Promise<mongoose.Connection> | null,
    }
}

if (!global.dbCache) {
    global.dbCache = {
        cachedConnection: null,
        cachedConnectionPromises: null
    }
}

function ensureConnectionPromise(): Promise<mongoose.Connection> {
    if (global.dbCache.cachedConnectionPromises) {
        return global.dbCache.cachedConnectionPromises;
    }
    const dbUrl = process.env.DB_URL as string;
    const connectionPromise = mongoose.createConnection(dbUrl).asPromise().then((conn) => {
        global.dbCache.cachedConnection = conn;
        global.dbCache.cachedConnectionPromises = null;
        return conn;
    }).catch((err) => {
        global.dbCache.cachedConnectionPromises = null;
        throw new Error(err);
    });
    global.dbCache.cachedConnectionPromises = connectionPromise;
    return connectionPromise;
}

async function getConnection(): Promise<mongoose.Connection> {
    const connection = global.dbCache.cachedConnection;
    if (connection) {
        if (connection.readyState === 1) {
            return connection;
        }
        await connection.close();
        global.dbCache.cachedConnection = null;
    }
    const newConnection = await ensureConnectionPromise();

    newConnection.on('disconnected', () => {
        console.warn(`Database disconnected!`);
        global.dbCache.cachedConnection = null;
    });

    newConnection.on('error', () => {
        console.error("Error in database connection");
        if (
            newConnection.readyState === mongoose.ConnectionStates.disconnected ||
            newConnection.readyState === mongoose.ConnectionStates.uninitialized
        ) {
            global.dbCache.cachedConnection = null;
        }
    });
    return newConnection;
}

export async function getConnectionModel(collectionName: keyof DbModels): Promise<mongoose.Model<DbModels[keyof DbModels]["document"]>> {
    const store = ModelStore[collectionName];
    if (!store) {
        throw new Error(`No collection found for the:${collectionName}`)
    };
    const connection = await getConnection();

    const { modelName, schema } = await store();

    return connection.model(modelName, schema);
}