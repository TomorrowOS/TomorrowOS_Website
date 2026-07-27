# FINAL Cloudinary Connection Guide — TomorrowOS (source of truth, extracted from docx)

## Connect Cloudinary to TomorrowOS

Cloudinary stores and delivers the images and videos used by your TomorrowOS CMS.

Choose the option that applies to you:
- **I'm new to Cloudinary** — Create a free Cloudinary account and connect your first product environment. Button: "Create a Cloudinary account"
- **I already have a Cloudinary account** — Sign in and select the product environment you want to connect. Button: "Sign in to Cloudinary"

## Flow A — I'm new to Cloudinary

### 1. Create your Cloudinary account
Open Cloudinary and create an account. You can sign up using the available account options shown by Cloudinary. Button: "Open Cloudinary"
Note: Keep this guide open — Cloudinary will open in a new browser tab.

### 2. Complete the Cloudinary account setup
Follow the Cloudinary onboarding prompts until you reach the Console.
When setup is complete, you should see your current Product Environment and its Cloud name.
(A Cloudinary product environment contains its own assets, API credentials and settings. Free Cloudinary accounts support one product environment.)
Then continue to: Find your Cloudinary credentials

## Flow B — I already have a Cloudinary account

### 1. Sign in to Cloudinary
Sign in to your existing Cloudinary account. Button: "Open Cloudinary"

### 2. Select your product environment
Open the product environment you want TomorrowOS to use.
IMPORTANT: Your Cloud name, API key and API secret must all come from the same product environment. When your account contains multiple environments, confirm the correct environment is selected before copying the credentials.

Both account paths now continue into the same setup process.

## Shared flow — Find your Cloudinary credentials

### 1. Open API Keys
From the Cloudinary Console:
1. Open the dashboard or Home page.
2. Select "Go to API Keys".
When that button is not visible: Select Settings in the navigation, then open API Keys.
(Cloudinary documents both routes to the API Keys page.)

### 2. Locate the three required values
TomorrowOS requires three separate Cloudinary values. Exact mapping:

| In Cloudinary | In Replit |
| --- | --- |
| Cloud name | CLOUDINARY_CLOUD_NAME |
| API key | CLOUDINARY_API_KEY |
| API secret | CLOUDINARY_API_SECRET |

(Cloudinary identifies the Cloud name as the product-environment identifier. Its API key and API secret authenticate backend SDK and API requests.)

Do not copy the key name: the Cloudinary page may show a display name or label for the API key. TomorrowOS needs the actual Cloud name, API key value, and API secret value — not the key's display name.

## Add the values to Replit

### 3. Add your Cloud name
In Cloudinary, copy the value labelled "Cloud name". Return to Replit and add:
- Key: `CLOUDINARY_CLOUD_NAME`
- Value: Your Cloudinary Cloud name
Example: `ukx17pqh`

### 4. Add your API key
In Cloudinary, copy the value labelled "API key". Return to Replit and add:
- Key: `CLOUDINARY_API_KEY`
- Value: Your Cloudinary API key

### 5. Add your API secret
In Cloudinary, reveal or copy the value labelled "API secret". Return to Replit and add:
- Key: `CLOUDINARY_API_SECRET`
- Value: Your Cloudinary API secret

The API secret is sensitive and should never be placed in browser-side code or exposed publicly.

Security warning — never paste your API secret into: Replit Agent chat, application source code, GitHub, screenshots, support emails or messages, or public documentation. Store it only through Replit Secrets. Replit stores secrets as encrypted environment variables.

## Test the connection

### 6. Test Cloudinary in Replit Preview
Once all three values are stored:
1. Return to your TomorrowOS Replit project.
2. Start the application.
3. Open Preview.
4. Wait for the server-status check.
5. Confirm Cloudinary displays Connected.

Success state: "Cloudinary connected — TomorrowOS can access your media storage." Button: Continue

Failure state: "Cloudinary could not connect"
Check the following:
- All three values were added.
- Each value was pasted into the matching field.
- The Secret names use the exact spelling and underscores shown.
- The API key was not pasted into the API secret field.
- All three values came from the same product environment.
- There are no extra spaces before or after the values.
- The API key is active.
- The API secret has not been reset or rotated.
Actions: Edit Cloudinary credentials / View where to find credentials / Retry connection
Do not display raw errors such as: "Media storage not found", "Unauthorized", "Invalid signature", "Undefined", "[object Object]".

## Confirm Cloudinary after publishing

### 7. Check the published application
Before publishing:
1. Open the Replit Publishing pane.
2. Confirm the three Cloudinary Secrets are available to the published application.
3. Publish the CMS.
4. Open the public CMS URL.
5. Confirm Cloudinary still shows Connected.
6. Upload a small test image.
(Missing production Secrets can cause undefined values and failed API calls in a published application, even where the project was configured in the editor.)

Final success state: "Media storage connected — TomorrowOS can upload and retrieve media through Cloudinary."

Stronger final test: do not treat a simple API authentication response as sufficient. TomorrowOS should perform a practical health check: authenticate with Cloudinary → upload a small temporary test asset → confirm the returned asset URL → delete the temporary asset → mark Cloudinary as connected. This verifies both authentication and upload permissions.

Optional logo section (used in onboarding branding step): Upload logo → Copy URL → Save for branding step → Skip for now. Example URL shape: `https://res.cloudinary.com/your-cloud-name/image/upload/...`
