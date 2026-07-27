export const contentGuideConfig = {
  cloudinaryImageLimitCopy: "Images: check the current Cloudinary plan limit. The currently listed Free-plan limit is 10 MB per image.",
  cloudinaryVideoLimitCopy: "Videos: check the current Cloudinary plan limit. The currently listed Free-plan limit is 100 MB per video.",
  emptyScheduleMeansAlwaysAvailable: "Leave the schedule empty to make the playlist available at all times.",
  scheduleTimezoneCopy: "Confirm the venue or CMS timezone before saving the schedule.",
  offlinePublishingCopy: "You may be able to assign content while a player is offline, but it may not receive the update until it reconnects.",
  playlistStatusIndicatorCopy: "The green indicator identifies the playlist the CMS currently marks as active.",
  playlistRemovalBehaviour: "Removing a playlist allows the next eligible playlist to play. When no other playlist is scheduled, the branded splash screen is shown.",
  routes: {
    base: "/guides/content",
    uploadMedia: "/guides/content#upload-media",
    createPlaylist: "/guides/content#create-playlist",
    schedule: "/guides/content#schedule",
    publishToScreen: "/guides/content#publish-to-screen",
    confirmPlayback: "/guides/content#confirm-playback",
    troubleshooting: "/guides/content#troubleshooting"
  }
};
