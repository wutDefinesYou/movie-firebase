/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {
  onRequest,
  HttpsError,
  onCall,
} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { defineSecret } = require("firebase-functions/params");
const tmdbApiKey = defineSecret("TMDB_SECRET_KEY");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.requestToTMDB = onCall(
  { timeoutSeconds: 1200, secrets: [tmdbApiKey] },
  (req, res) => {
    const apiKey = tmdbApiKey.value();
    if (apiKey.length === 0)
      throw new HttpsError("aborted", "TMDB API key is not set");
    return apiKey;
  }
);
