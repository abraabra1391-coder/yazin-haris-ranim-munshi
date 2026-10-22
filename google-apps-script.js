/**
 * Google Apps Script for Wedding RSVP Form
 * Connected to Spreadsheet: "Yazin&ranim weddding"
 * Spreadsheet ID: 1z7siLZzXiraSAM49aGR6edUACLC1EHlNfQvbiRI8D8s
 *
 * HOW TO DEPLOY:
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1z7siLZzXiraSAM49aGR6edUACLC1EHlNfQvbiRI8D8s/edit
 * 2. In top menu, click Extensions > Apps Script
 * 3. Delete any default code in Code.gs, paste all this code and click Save (disk icon).
 * 4. Click the blue "Deploy" button (top right) > "New deployment"
 * 5. Click the gear icon next to "Select type" > select "Web app"
 * 6. Set:
 *    - Description: Wedding RSVP Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Click "Deploy", authorize permissions when prompted, and COPY the Web App URL.
 * 8. Paste that Web App URL into script.js (GOOGLE_SHEET_URL).
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Automatically add header row with styling if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At (IST)",
        "Guest Full Name",
        "Attendance Status",
        "Number of Guests",
        "Wishes & Prayers"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setBackground("#6e1728");
      headerRange.setFontColor("#faf7f2");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }
    
    var name = "";
    var attendance = "";
    var guests = "";
    var message = "";
    
    if (e && e.parameter) {
      name = e.parameter.name || "";
      attendance = e.parameter.attendance || "";
      guests = e.parameter.guests || "";
      message = e.parameter.message || "";
    }
    
    if (e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents);
        if (json.name) name = json.name;
        if (json.attendance) attendance = json.attendance;
        if (json.guests) guests = json.guests;
        if (json.message) message = json.message;
      } catch (jsonErr) {}
    }
    
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd-MMM-yyyy hh:mm:ss a");
    
    sheet.appendRow([
      timestamp,
      name,
      attendance,
      guests,
      message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "RSVP recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Wedding RSVP Google Apps Script is active and listening.");
}
