# FINAL Upload Media and Create and Deploy a Playlist in TomorrowOS sample CMS — extracted content source

> Extraction of `attached_assets/FINAL_Upload_Media_and_Create_and_Deploy_a_Playlist_in_Tomorr_1785125517681.docx` (typos cleaned).
> The refinement spec (Pasted-Extend-the-existing-TomorrowOS-Guided-Setup-onboarding-_1785125511780.txt) OVERRIDES this doc where they conflict.

# Create and publish your first playlist
Upload media, arrange it into a playlist and assign it to a connected screen using the TomorrowOS sample CMS.

## Before you begin
You will need:
- A published TomorrowOS sample CMS
- Supabase and Cloudinary connected
- At least one paired screen shown as online or connected in your CMS
- An image or video file to upload
- Approximately 2–5 minutes

Important: This guide demonstrates the interface included with the TomorrowOS sample CMS. A custom CMS built with TomorrowOS may organise playlists, media and publishing differently.

## Part 1 — Create your playlist

### 1. Open Playlists
From your CMS dashboard, find the Playlists section. Select the orange + button beside Playlists.
Expected result: the playlist editor opens inside your CMS.

### 2. Name your playlist
Enter a clear name that explains where or how the playlist will be used.
Example: `Reception — Welcome Content`
Good names may include: location, screen purpose, campaign, time period.
Avoid generic names such as: `Playlist 1`.

### 3. Upload your media
In the Assets section, select the orange + button.
1. Select the + button beside Assets.
2. Choose the images or videos you want to upload from your computer.
3. Wait for each upload to complete.
4. Confirm the asset appears in the Assets area.

Warning: Do not close the page while an upload is still in progress.

Upload limits: depend on the asset type and your Cloudinary plan. Check your current Cloudinary limits when a file does not upload. The currently listed Free-plan limits are 10 MB for images and 100 MB for videos. (Keep these values in a central config — do not hard-code in components.)

When an upload fails, check:
- The file is within your Cloudinary plan limit.
- The file type is supported.
- Cloudinary is configured correctly.
- The internet connection is stable.
- The filename does not contain unusual unsupported characters.
Actions: View Cloudinary guide / Check media compatibility / Try again in my CMS.
Do not display raw Cloudinary errors by default; only a collapsed "View technical details".

### 4. Add media to the playlist
Select the assets you want to include and add them to the playlist.
Recommended first playlist: one image, one short video, no more than two or three items.
Starting with a small playlist makes it easier to identify playback or compatibility issues.

### 5. Arrange the playback order
1. Drag and drop the playlist items into the required order.
2. Place the first item at the top (the top item plays first).
3. Review the duration of each item.

Video duration: videos play for their natural duration unless the CMS displays another playback-duration option.
Image duration: set how long each image remains visible. Recommended first test: 10 seconds per image, short test videos, a simple sequence.

### 6. Configure the schedule
**Option A — Play continuously**: Leave the schedule empty to make the playlist available at all times. (Store in central config; internal review note: "Confirm that an empty schedule means always available before production release.")

**Option B — Use a schedule**:
1. Select the required days.
2. Choose the start time.
3. Choose the end time.
4. Confirm the venue or CMS timezone.

For the first onboarding test, use one continuously available playlist rather than overlapping scheduled playlists.
Warning: Avoid overlapping playlist schedules until you understand how the CMS resolves schedule conflicts. (Do not invent priority rules.)

### 7. Save the playlist
Before saving, review: playlist name, media order, image durations, schedule.
Select **Save Playlist** (bottom of the page, near the scheduling area).
Expected result: the saved playlist appears in the Playlists section.
Completion: "I created and saved my playlist" — This only updates your onboarding progress. TomorrowOS.org does not inspect the CMS or verify the playlist.

## Part 2 — Publish the playlist to a screen

### 8. Select a screen
Choose the screen that should receive the playlist. Confirm the screen:
- Appears in the device list
- Is paired with this CMS
- Is shown as online or connected by the CMS
- Matches the physical screen you intend to update

Screen offline? You may be able to assign content while a player is offline, but it may not receive the update until it reconnects. (Central config; internal review note: "Confirm the exact offline publishing behaviour before production release.")

### 9. Open Publish
From the selected device, select the orange **Publish** button.
Expected result: a playlist-selection panel opens.

### 10. Choose the playlist
Select the playlist you created. For the first deployment, choose one playlist only.
Select **Publish Selected**.
Note: you can publish multiple playlists to a single player if you have multiple schedules.
Important: Publishing assigns the selected playlist to the screen through your CMS. The TomorrowOS onboarding guide does not publish the playlist itself. (No working Publish Selected button in the guide.)

### 11. Wait for the screen to update
Keep the CMS and physical display visible. Timing may depend on: network connection, media size, whether media is already cached, whether the player is currently online.
Do not refresh or republish repeatedly while the first update is still processing.
Expected result: the selected playlist begins playing on the physical screen.
(No animated progress bars, fake download status, fake online indicator, or automatic success state.)

### 12. Confirm playback
Check the physical display — not only the CMS. Confirm:
- The correct playlist is playing.
- Assets appear in the correct order.
- Images use the expected duration.
- Videos play to completion.
- The display orientation is correct.
- No black screens appear.
- No media errors appear.
- At least one full playlist cycle completes.

Completion: "My playlist is playing correctly" — This result is based on your confirmation. TomorrowOS.org does not currently inspect the physical display through this guide.

Final success panel: "Your first content is live" — You confirmed that media was uploaded, saved into a playlist and published to your screen. Actions: Open my CMS / Return to Guided Setup / Add another playlist / View troubleshooting. Never say "Playback verified by TomorrowOS".

## Understanding playlist status (optional section)
Once published, the CMS displays playlists assigned to the selected screen.
Green indicator copy (central config): "The green indicator identifies the playlist the CMS currently marks as active."
Do not say "confirmed as currently playing" without Runtime telemetry. Internal review note (Review Mode only): confirm whether the indicator means assigned / scheduled / requested / downloaded / confirmed as playing.

## Change or remove a playlist (optional section)
**Replace the current playlist**:
1. Select the screen.
2. Open Publish.
3. Select the replacement playlist.
4. Select Publish Selected.
5. Confirm the new content appears.

**Remove a playlist**: Select Remove beside the playlist assignment.
Expected behaviour copy (central config field `playlistRemovalBehaviour`): "Removing a playlist allows the next eligible playlist to play. When no other playlist is scheduled, the branded splash screen is shown."
Internal review warning (Review Mode only): confirm removal and fallback behaviour before production release.
Removing an assignment must not be described as deleting the playlist.

## Troubleshooting (expandable sections)
**My asset will not upload** — Check: Cloudinary is configured; file within plan limit; format supported; internet stable. Actions: Open Cloudinary guide / Check media compatibility / Try again in my CMS.

**My playlist will not save** — Check: name entered; at least one asset added; image durations valid; schedule fields complete; no upload in progress. Action: Open my CMS.

**The playlist does not appear in Publish** — Check: playlist was saved; correct CMS environment open; playlist list refreshed; playlist not archived or removed.

**The screen is offline** — Check: display has power; TomorrowOS Runtime running; network connected; screen remains paired to this CMS. Actions: Open device troubleshooting / View platform guides.

**The playlist was published but does not play** — Check: physical screen online; playlist assigned to the correct screen; schedule currently active; changes saved; media format supported; screen has had time to download the content.

**The screen is black** — Check: playlist contains valid media; assets uploaded successfully; media format compatible; schedule active; display orientation correct; target screen supports the media encoding. Actions: Check media compatibility / Open device troubleshooting / Open Cloudinary guide.

No raw technical errors by default; provide a collapsed "View technical details" when appropriate.
