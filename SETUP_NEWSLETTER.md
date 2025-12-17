# How to Connect Newsletter to Google Sheets

You can save all newsletter signups directly to a Google Sheet for free. Follow these steps:

## 1. Create the Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new sheet.
2. Name it "Compound Newsletter".
3. Rename the first tab (at the bottom) to `Emails` (Case sensitive!).
4. Add headers to the first row:
   - Cell A1: `Timestamp`
   - Cell B1: `Email`

## 2. Create the Script
1. In the Google Sheet, click **Extensions** > **Apps Script**.
2. Delete any code in the editor (`myFunction`...) and paste this **exact** code:

```javascript
var SHEET_NAME = "Emails";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(SHEET_NAME);

    var email = e.parameter.email;
    var timestamp = new Date();

    sheet.appendRow([timestamp, email]);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "email": email }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click the floppy disk icon (Save) and name the project "Newsletter Script".

## 3. Deploy the Script
1. Click the blue **Deploy** button > **New deployment**.
2. Click the specific **Select type** (gear icon) > **Web app**.
3. Fill in these details:
   - **Description**: Newsletter v1
   - **Execute as**: `Me` (your email)
   - **Who has access**: `Anyone` (This is critical so the website can send data)
4. Click **Deploy**.
5. You will ask to **Authorize Access**. Click "Review permissions".
   - Select your account.
   - You might see a "Google hasn't verified this app" warning (because you just wrote it). Click **Advanced** > **Go to Newsletter Script (unsafe)**.
   - Click **Allow**.

## 4. Get the URL
1. Copy the **Web app URL** (It starts with `https://script.google.com/macros/s/...`).
2. Open the file `components/Footer.tsx` in your project.
3. Replace `YOUR_SCRIPT_URL_HERE` with the URL you just copied.
4. Save and deploy!
