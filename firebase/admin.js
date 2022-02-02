const admin = require("firebase-admin")

const serviceAccount = require("./firebase-keys.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
