import mongoose, { ConnectionStates } from 'mongoose'

// Object stores the connection state of Database.
const connection = {
    isConnected: ConnectionStates.connected
}

// [Part 9 Connect To MongoDB] https://youtu.be/7W4vja9Ax-0
/**
* connect async function.
*/
async function connect() {
    if (connection.isConnected) {
        console.log('already connected.')
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
        }
    }
}
const db = { connect, disconnect }
export default db

// REFERENCES:
//
// https://youtu.be/7W4vja9Ax-0
// https://www.mongodb.com/docs/compass/current/
// mongoose package.
// https://mongoosejs.com/
// https://mongoosejs.com/docs/guide.html
