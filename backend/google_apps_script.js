/**
 * Google Apps Script — paste this in your Sheet's Script Editor
 * (Extensions → Apps Script)
 *
 * Set up a trigger:
 *   Triggers → Add Trigger → onFormSubmit → From spreadsheet → On form submit
 */

var BACKEND_WEBHOOK_URL = "https://skillforge-backend-o793.onrender.com/api/sync/sheets/webhook";
var SYNC_SECRET = "YOUR_SYNC_SECRET_HERE"; // must match SYNC_SECRET in your .env

function onFormSubmit(e) {
  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({ secret: SYNC_SECRET }),
    muteHttpExceptions: true,
  };

  try {
    var response = UrlFetchApp.fetch(BACKEND_WEBHOOK_URL, options);
    Logger.log("Sync response: " + response.getContentText());
  } catch (err) {
    Logger.log("Sync error: " + err.toString());
  }
}
