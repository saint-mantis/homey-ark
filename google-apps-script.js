// Google Apps Script for Contact Form to Google Sheets Integration
// 
// SETUP INSTRUCTIONS:
// 1. Open Google Sheets and create a new spreadsheet named "Homey Ark Contact Form Submissions"
// 2. In the first row, add these headers: Timestamp | Name | Email | Phone | Service | Message
// 3. Go to Extensions > Apps Script
// 4. Delete any existing code and paste this script
// 5. Click "Deploy" > "New deployment"
// 6. Select type: "Web app"
// 7. Execute as: "Me"
// 8. Who has access: "Anyone"
// 9. Click "Deploy" and copy the Web App URL
// 10. Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' in script.js with your Web App URL

function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Append the data to the sheet
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.service,
      data.message
    ]);
    
    // Optional: Send email notification to admin
    sendEmailNotification(data);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Form submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  // Optional: Send email notification when form is submitted
  var recipient = 'info@homeyark.com'; // Replace with your email
  var subject = 'New Contact Form Submission - ' + data.service;
  var body = 'You have received a new contact form submission:\n\n' +
             'Name: ' + data.name + '\n' +
             'Email: ' + data.email + '\n' +
             'Phone: ' + data.phone + '\n' +
             'Service: ' + data.service + '\n' +
             'Message: ' + data.message + '\n\n' +
             'Submitted at: ' + data.timestamp;
  
  MailApp.sendEmail(recipient, subject, body);
}

// Test function - you can run this to test if the script has access to the sheet
function testSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Last row: ' + sheet.getLastRow());
}
