import mongoose, { ConnectionStates, LeanDocument } from 'mongoose'

// Object stores the connection state of Database.
const connection = {
    isConnected: ConnectionStates.connected
}

/**
* connect async function.
*/
// [Part 9 Connect To MongoDB] https://youtu.be/7W4vja9Ax-0
async function connect(): Promise<void> {
    if (connection.isConnected) {
        console.log('already connected.')
        return
    }

    // If connections in connections queue.
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState
        // No need to connect as it's already connected.
        if (connection.isConnected === 1) {
            console.log('use previous connection.')
            return
        }
        // Else disconnect.
        await mongoose.disconnect()
    }

    if (!process.env.MONGODB_URI) {
        throw console.error("Database environment variable MONGODB_URI is undefined.")
    }

    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log('new connection.')

    connection.isConnected = db.connections[0].readyState
} // end of connect().

/**
* disconnect async function.
*
* Disconnect only in production mode and not in development mode. 
* As connecting and disconnecting on every code change consumes lots of process.
* 
* NodeJS.ProcessEnv.NODE_ENV: "development" | "production" | "test".
*/
async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
            connection.isConnected = ConnectionStates.disconnected
        } else {
            console.log('is not disconnected')
        }
    }
}


// │     Argument of type '(doc: MongoDoc) => MongoJSON' is not assignable
// to parameter of type '(value: LeanDocument<any>, index: number, array: LeanDocument<any>[]) => MongoJSON typescript (2345) [51, 36]
type MongoJSON = { _id: string; createdAt: string; updatedAt: string; }
type MongoDoc = { _id: object; createdAt: object; updatedAt: object; }
type lean = LeanDocument<any>[] | LeanDocument<any>[]


/**
* convertDocToJSON serializes MongoDB Doc Object to JSON object.
*
* Iterating over Doc products is possible if it's a JSON.
*/
function convertDocToJSON(doc: any) {
    // let jsonObject = { _id: '', createdAt: '', updatedAt: '' };
    doc._id = doc._id.toString()
    doc.createdAt = doc.createdAt.toString()
    doc.updatedAt = doc.updatedAt.toString()

    console.log({ doc })
    console.log('in db.ts.')

    return doc
}

const db = {
    connect,
    disconnect,
    convertDocToJSON,
}

export default db

// REFERENCES:
//
// https://youtu.be/7W4vja9Ax-0
// https://www.mongodb.com/docs/compass/current/
// mongoose package.
// https://mongoosejs.com/
// https://mongoosejs.com/docs/guide.html
