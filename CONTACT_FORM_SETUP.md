# Contact Form Google Sheets Setup Guide

## Step-by-Step Instructions

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Homey Ark Contact Form Submissions"
4. In the first row (Row 1), add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Service`
   - F1: `Message`

### 2. Set Up Google Apps Script
1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the code from `google-apps-script.js` file
4. Click **Save** (disk icon) and name your project (e.g., "Contact Form Handler")

### 3. Deploy the Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure settings:
   - **Description**: Contact Form Submission Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** > **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/...../exec`)

### 4. Update Your Website
1. Open `script.js` in your website code
2. Find this line:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual Web App URL
4. Save the file

### 5. Update Contact Information
In `index.html`, update these placeholder values with your actual information:
- **Phone Number**: `+91 98765 43210`
- **Email**: `info@homeyark.com`
- **Office Address**: Update the address text and Google Maps embed URL
- **WhatsApp**: `919876543210` (replace with your WhatsApp Business number)
- **Social Media Links**: Add your Facebook, Instagram, and LinkedIn URLs

### 6. Update Google Maps Embed
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your office location
3. Click **Share** > **Embed a map**
4. Copy the iframe code
5. Replace the iframe in `index.html` (in the `.map-container` section)
6. Also update the "Get Directions" link with your location

### 7. Test the Form
1. Open your website in a browser
2. Fill out the contact form with test data
3. Submit the form
4. Check your Google Sheet - a new row should appear with the submission data
5. If you enabled email notifications in the script, check your inbox

## Optional: Email Notifications
The script includes a function to send email notifications when a form is submitted. Update this line in `google-apps-script.js`:
```javascript
var recipient = 'info@homeyark.com'; // Replace with your email
```

## Troubleshooting
- If submissions aren't appearing in the sheet, check the Apps Script execution logs
- Make sure the Web App is deployed with "Anyone" access
- Verify the Web App URL is correctly copied to script.js
- Check browser console for any JavaScript errors

## Security Note
The contact form uses Google Apps Script Web App with "Anyone" access, which is necessary for public form submissions. The script only accepts POST requests and appends data to your spreadsheet. Never include sensitive API keys or credentials in client-side JavaScript.
