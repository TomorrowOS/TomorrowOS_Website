# Final Tizen Setup Flow (2026) — extracted content source

> Extraction of `attached_assets/0_Final_Tizen_Setup_Flow_(2026)_1785123429567.docx`.
> IMPORTANT: the refinement spec (Pasted-Extend-the-existing-TomorrowOS-Guided-Setup-onboarding-...txt) OVERRIDES this doc where they conflict. Known doc issues the spec corrects:
> - "ScreenCloud" reference → must NOT appear anywhere (acceptance criterion 28)
> - Example CMS URL `http://mycms.replit.app` → must be HTTPS: `https://my-signage-cms.replit.app`
> - "6 digit code" → do NOT promise any fixed pairing-code format
> - "Once stored" phrasing → use "After selecting Custom App, restart the display so the change takes effect."
> - "Click reboot in the devices card in your CMS" → do NOT assume remote CMS reboot exists; default restart instructions use the remote/physical method; show CMS reboot only as a conditional alternative.

## Install TomorrowOS on Samsung Tizen

Install the TomorrowOS Runtime on a supported Samsung commercial signage display running Tizen 6.5 or Tizen 7.0.

### Before you begin
You will need:
- A supported Samsung commercial signage display
- The Samsung remote
- An active internet connection
- Your published CMS URL (public HTTPS)
- Access to your CMS from a computer or mobile device
- Approximately 10 minutes

### Confirm compatibility
Before continuing, check that the display model, Tizen version and firmware are supported by TomorrowOS.
Button: Check Samsung compatibility
This guide is for supported commercial signage displays. It does not apply to Samsung consumer televisions.

### 1. Choose your starting point
**New or factory-reset display** — Complete the Samsung display initial setup first:
1. Select the language.
2. Connect the display to the internet.
3. Select the physical screen orientation.
4. Confirm the local date and time.
5. Complete the remaining Samsung setup prompts.
Then continue to Set Play via to Custom App.

**Display already configured** — Continue directly to the next step.

### 2. Set Play via to Custom App
TomorrowOS must be selected as the application the display launches.
Using the Samsung remote:
1. Open Menu.
2. Select System.
3. Select Play via.
4. Select Custom App.

- Custom App is already selected → Continue to Step 3.
- Custom App is not available → The display may currently be configured to launch MagicINFO. Follow: Switch from MagicINFO to Custom App.

### 3. Open Custom App
1. Press Home on the Samsung remote.
2. Select Custom App.
Depending on the model and firmware, the option may appear inside App Management.

### 4. Install the TomorrowOS Runtime
Inside Custom App or App Management, select Install Custom App.
Some supported firmware may label this option Install Web App.
Enter this address exactly: `https://tmr.sh/tizen`
Then confirm the installation.

Important:
- Enter the full address.
- Do not add spaces.
- Do not turn off or restart the display during installation.

Expected result: The display downloads the TomorrowOS Runtime and launches it when installation is complete.

### 5. Select the screen orientation
When the TomorrowOS Runtime opens, select the option matching the physical installation:
- Landscape
- Portrait clockwise
- Portrait counter-clockwise
Choose the physical orientation of the display. This can be changed later through the approved TomorrowOS Runtime setup process.

### 6. Connect the Runtime to your CMS
The TomorrowOS Runtime will ask for your CMS address.
Enter the public HTTPS URL copied after publishing your CMS.
Example: `https://my-signage-cms.replit.app`

Use:
- Your published Replit CMS URL, or
- Your connected custom domain, or
- Public URL from another supported host

Do not use:
- The Replit project editor URL
- A temporary preview URL
- A Supabase URL
- A Cloudinary URL
- An admin or settings page inside the CMS
- Localhost address

Help link: Where do I find my CMS URL?

### 7. Wait for the pairing code
After the CMS URL is accepted, a pairing code will appear on the display.
Leave this screen open while you complete the next step.
(Do not promise a fixed code format.)

### 8. Pair the screen in your CMS
This action takes place inside your published CMS, not on the TomorrowOS guide.
On your computer or mobile device:
1. Open your published CMS.
2. Select Pair a device.
3. Enter the pairing code shown on the Samsung display.
4. Select Connect.
5. Wait for the screen to appear in the device list.

Expected result: The screen appears in your CMS as connected or online, and the Runtime leaves the pairing screen.
Button: Open my CMS
TomorrowOS.org does not enter or verify the pairing code for you. Pairing is completed inside your owned and operated CMS.

### 9. Confirm the installation
Before continuing, confirm:
- The display appears online in the CMS.
- The pairing screen has closed.
- The expected starter, splash or assigned content appears.
- No blocking installation or connection error is visible.

**Complete a restart test** (mandatory before considering installation complete):
1. Restart the Samsung display using the remote or approved physical restart method.
2. Wait for the display to start.
3. Confirm the TomorrowOS Runtime launches again.
4. Confirm the screen reconnects to the CMS.
5. Confirm the expected content or splash screen resumes.

Conditional (only when the generated CMS genuinely has a working reboot command): "Alternative: Use the Reboot action on the device card inside your CMS."

Completion action: I confirmed the screen restarts and reconnects

### 10. Create and deploy content
In your CMS:
1. Create a playlist.
2. Upload or create content.
3. Adjust the schedule.
4. Save the changes.
5. Assign the playlist to the Samsung display.
6. Confirm the content appears on the screen.
Link: View content deployment guide

## Switch from MagicINFO to Custom App
Use these steps when Custom App does not appear after pressing Home.

1. **Leave MagicINFO** — Use the Source button and temporarily switch to an available input, such as HDMI. This allows you to open the Samsung system menu outside MagicINFO.
2. **Open the Samsung menu** — Press Menu on the remote. Select System.
3. **Change Play via** — Select Play via, then select Custom App. (Tizen 6.5 and above.)
4. **Restart the display** — Turn the display off and on again. Press Home. Confirm Custom App is now available. Return to Step 3 of the Samsung setup guide.
   After selecting Custom App, restart the display so the change takes effect.

## Troubleshooting
**I cannot see Custom App** — Confirm Play via is set to Custom App. Restart the display after changing the setting. Confirm the panel is a supported commercial signage model. Action: View MagicINFO switching steps.

**The installation URL does not load** — Confirm the display is connected to the internet. Re-enter `https://tmr.sh/tizen` exactly. Confirm the display date and time are correct. Restart the display and try again. Action: Copy installation URL.

**The CMS URL is rejected** — Use the public published CMS address. Confirm it begins with `https://`. Do not use the Replit editor or Preview address. Open the CMS URL on another device to confirm it loads. Do not use a Supabase or Cloudinary address. Action: Where do I find my CMS URL?

**No pairing code appears** — Confirm the CMS URL is correct. Confirm the published CMS is currently available. Restart the TomorrowOS Runtime. Check the display for an error message. (Reset instructions unconfirmed: use engineering placeholder `{{CONFIRM_APPROVED_RUNTIME_RESET_PROCESS}}`.)

**The CMS does not accept the code** — Enter the code exactly as shown. Confirm you are using the same CMS URL entered on the display. Confirm the pairing code has not expired. Return to the player and check whether a new code is displayed. (Do not promise the user can manually generate a new code.)

**The screen pairs but shows no content** — Pairing and content assignment are separate steps. Confirm the screen appears online in the CMS. Confirm a playlist or content item is assigned. Confirm the schedule is active now. Confirm the content format is supported by the display. Confirm the CMS changes were saved. Action: View content deployment guide.
