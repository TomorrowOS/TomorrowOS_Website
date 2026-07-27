# FINAL Supabase Connection Guide — TomorrowOS (source of truth, extracted from docx)

Use two entry paths that merge into one shared connection flow.

## Connect Supabase to TomorrowOS

Supabase provides the database used by your TomorrowOS CMS.

Choose the option that applies to you:

- **I'm new to Supabase** — Create an account, organisation and project. Button: "Start new account setup"
- **I already have a Supabase account** — Sign in and open an existing project—or create a new one. Button: "Use my existing account"

## Flow A — I'm new to Supabase

### 1. Create your Supabase account
Open Supabase and create an account. Button: "Open Supabase"
Note: Keep this guide open — Supabase will open in a new browser tab. Keep this TomorrowOS guide open so you can return to it during setup.

### 2. Create your organisation
Every Supabase project belongs to an organisation.
Enter:
- Organisation name: Your business or project name
- Type: Select the option that best describes you
- Plan: Select the appropriate plan for your project
Then select: "Create organisation"

### 3. Create your project
Select "New project" and complete the required fields.
- Project name: Choose a recognisable name. Example: Acme TomorrowOS CMS
- Database password: Create a strong database password and save it securely. You will need this password later. It is different from your Supabase account password.
- Region: Choose the region approved or closest to you or customers geographically for your TomorrowOS/Replit deployment.
- Security settings: Leave the default security settings unchanged unless TomorrowOS specifically instructs otherwise.
- GitHub connection: Connecting GitHub is optional and is not required for this setup.
Select: "Create new project"

### 4. Wait for your project to become ready
Supabase may take a few moments to create the database. Do not continue until the project dashboard has opened successfully.
Then proceed to: Connect your project to TomorrowOS

## Flow B — I already have a Supabase account

### 1. Sign in to Supabase
Sign in using your existing account. Button: "Open Supabase"

### 2. Open or create a project
- I already have a project: Open the project you want to connect to TomorrowOS.
- I do not have a project yet: Select "New project" and follow the project-creation instructions above.
Note: TomorrowOS should use a dedicated or approved project. Do not connect an unrelated production database unless you understand the impact.

Both paths now merge into the same connection instructions.

## Shared flow — Connect Supabase to TomorrowOS

### 1. Open the connection settings
From your Supabase project dashboard, select the green **Connect** button at the top of the page.

### 2. Select the approved connection method
In the connection window:
- Select Direct
- Under Connection Method, select "Direct connection (recommended)"
- Under Type, select "URI"

### 3. Copy the database connection string
Scroll to Connection string and select the copy icon.
A connection string looks similar to:
`postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnopqrst.supabase.co:5432/postgres`
Your value will contain a different project address.

IMPORTANT TERMINOLOGY: This is your **Postgres database connection string**. It is NOT the Supabase Project URL found in the API settings. Always use one consistent term: **Supabase Postgres connection string**. Never say only "Supabase URL" or "Project URL".

### 4. Replace the password placeholder
The copied connection string may contain `[YOUR-PASSWORD]`.
Replace the entire placeholder — including the square brackets — with the database password created when the project was set up.
Before: `postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijklmnopqrst.supabase.co:5432/postgres`
After: `postgresql://postgres:ExamplePassword123@db.abcdefghijklmnopqrst.supabase.co:5432/postgres`
(ExamplePassword123 is only an example. Use your real database password.)

### 5. Forgot your database password?
From Supabase, open Database → Settings, then reset the database password.
After resetting it, update the connection string in Replit before testing again.
Or simply click "Reset database password" above the connection string to reset it.

## Connect it to Replit

### 6. Add the connection string to Replit
Add your Supabase connection to Replit: when TomorrowOS or Replit asks for your Supabase connection, use the complete Postgres connection string prepared above.

Required Replit Secret:
- Key: `SUPABASE_URL`
- Value: Your complete Supabase Postgres connection string

Where to add it — in Replit:
1. Open All tools.
2. Open Secrets.
3. Select New Secret.
4. Enter SUPABASE_URL as the key.
5. Paste the complete connection string as the value.
6. Select Add Secret.

Replit encrypts values stored through Secrets and exposes them to the application as environment variables. Database credentials should not be hard-coded into code.

Security warning — never paste the connection string into: a public Replit chat, your application code, GitHub, a screenshot, or a support message.

## Verify the connection

### 7. Test in Replit Preview
Before publishing:
1. Run the TomorrowOS project.
2. Open Replit Preview.
3. Wait for the TomorrowOS server-status check.
4. Confirm that Supabase shows Connected.
(Replit recommends getting Preview working before publishing; publishing does not fix a broken Preview environment.)

Success state: "Supabase connected — Your TomorrowOS CMS can access its database." Button: Continue to publishing

Failure state: "Supabase could not connect"
Check:
- You copied the complete connection string.
- You replaced [YOUR-PASSWORD], including the brackets.
- The password is correct.
- Special characters were properly encoded.
- You selected the connection method required by TomorrowOS.
- The secret is named exactly SUPABASE_URL.
Actions: Edit Supabase secret / Reset database password / View connection steps / Retry
Do not display only raw errors like: "Database not found", "Connection refused", "SSL error", "Invalid URL", "[object Object]".

### 8. Confirm the published connection
Before selecting Publish:
1. Open the Replit Publishing pane.
2. Confirm SUPABASE_URL is included in the published environment.
3. Publish the CMS.
4. Open the public CMS URL.
5. Confirm that Supabase still shows Connected.
(A project can work in Preview but fail after publishing because of production secrets or database settings.)

Final success state: "Database connected — Supabase is connected in both Preview and your published TomorrowOS CMS."
