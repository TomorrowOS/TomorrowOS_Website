/**
 * Media compatibility — single typed source of truth for /compatibility/media.
 *
 * Every value in this file is backed by a public source: docs.tomorrowos.org
 * platform pages, the black-gap playback and widget-package guides, or the
 * public TomorrowOS_Tizen / TomorrowOS_BrightSign player repositories.
 *
 * Evidence policy (do not weaken without sign-off):
 * - Only completed physical or automated test results may support
 *   "Validated", "Tested with Limitations" or "Production Recommended".
 * - Repository code and documentation may support "Runtime Supported" or
 *   "Requires Validation" only.
 * - Manufacturer hardware capability alone must never be shown as
 *   TomorrowOS validation.
 * - No public exact media test result exists yet, so MEDIA_TESTS is empty
 *   and the tested-media matrix renders an honest empty state.
 */

export type MediaValidationStatus =
  | 'production-recommended'
  | 'validated'
  | 'tested-with-limitations'
  | 'runtime-supported'
  | 'requires-validation'
  | 'unsupported'
  | 'not-tested';

export const MEDIA_STATUS_LABELS: Record<MediaValidationStatus, string> = {
  'production-recommended': 'Production Recommended',
  validated: 'Validated',
  'tested-with-limitations': 'Tested with Limitations',
  'runtime-supported': 'Runtime Supported',
  'requires-validation': 'Requires Validation',
  unsupported: 'Unsupported',
  'not-tested': 'Not Yet Tested',
};

export const MEDIA_STATUS_DEFINITIONS: Record<MediaValidationStatus, string> = {
  'production-recommended':
    'The exact media profile has passed the required validation workflow across the stated deployment scope.',
  validated:
    'The exact profile passed testing on the listed device, firmware and runtime.',
  'tested-with-limitations':
    'Playback passed partially or requires a documented constraint or workaround.',
  'runtime-supported':
    'The runtime supports the media category, but the exact profile has not necessarily completed validation.',
  'requires-validation':
    'The format may work, but the exact combination must be tested.',
  unsupported:
    'The profile is known not to work correctly for the listed platform or combination.',
  'not-tested': 'No public test result has been recorded.',
};

export type TestResult =
  | 'pass'
  | 'pass-with-limitations'
  | 'fail'
  | 'not-tested'
  | 'not-applicable'
  | 'not-recorded';

export const TEST_RESULT_LABELS: Record<TestResult, string> = {
  pass: 'Pass',
  'pass-with-limitations': 'Pass with limitations',
  fail: 'Fail',
  'not-tested': 'Not tested',
  'not-applicable': 'Not applicable',
  'not-recorded': 'Not recorded',
};

/** Explicit honesty placeholders — never render dashes for unknowns. */
export const NOT_RECORDED = 'Not recorded';
export const NOT_TESTED = 'Not tested';
export const NO_PUBLIC_MEDIA_TEST = 'No public media test recorded';

export const MEDIA_LAST_REVIEWED = '3 August 2026';

export interface MediaCompatibilityResult {
  id: string;
  title: string;
  mediaType: 'video' | 'image' | 'html';
  container?: string;
  codec?: string;
  profileLevel?: string;
  resolution?: string;
  frameRate?: string;
  bitrate?: string;
  audio?: string;
  orientation?: 'landscape' | 'portrait' | 'square' | 'custom';
  platform: string;
  deviceModel: string;
  firmware: string;
  runtimeVersion: string;
  looping: TestResult;
  offline: TestResult;
  rebootRecovery: TestResult;
  status: MediaValidationStatus;
  lastTested: string;
  notes: string;
}

/**
 * The tested media library. Every row must represent an actual recorded
 * media test with public evidence. No such result has been published yet.
 */
export const MEDIA_TESTS: MediaCompatibilityResult[] = [];

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export interface MediaCategory {
  id: 'video' | 'image' | 'html';
  name: string;
  maturity: MediaValidationStatus;
  summary: string;
  /** Download-classification formats recognised by the public players. */
  recognisedFormats: string[];
  formatCaveat: string;
  safestKnownProfile: string;
  principalLimitation: string;
}

export const MEDIA_CATEGORIES: MediaCategory[] = [
  {
    id: 'video',
    name: 'Video',
    maturity: 'runtime-supported',
    summary:
      'Both public players ship a dedicated hardware video pipeline: dual AVPlay players on Samsung Tizen and dual roVideoPlayer instances on BrightSign, with download-and-cache playback and black-gap-avoiding handoffs.',
    recognisedFormats: ['.mp4', '.webm', '.m4v', '.mov', '.mkv', '.avi', '.3gp'],
    formatCaveat:
      'These are the file extensions the players recognise and cache as video. Whether a given container, codec, profile and bitrate actually decodes depends on the exact device and firmware — recognition is not validation.',
    safestKnownProfile:
      '1080p H.264 in MP4 — the profile the public documentation certifies against on BrightSign and exercises on Tizen. No exact public test result yet.',
    principalLimitation:
      'BrightSign Series 3 cannot play 4K H.264 reliably (hardware limit) and needs BrightSign OS 9.1.140+ for reliable video.',
  },
  {
    id: 'image',
    name: 'Images',
    maturity: 'runtime-supported',
    summary:
      'Images render through a dual HTML layer with prefetch, decode warm-up and instant swap on both players, so image-to-image transitions avoid black gaps by design.',
    recognisedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'],
    formatCaveat:
      'These are the extensions the players recognise and cache as images. Decoding happens in the platform browser engine, so behaviour for WebP, GIF animation or BMP varies by device firmware and has no public TomorrowOS test result.',
    safestKnownProfile:
      'JPEG or PNG at the panel’s native resolution — the formats used throughout the public documentation. No exact public test result yet.',
    principalLimitation:
      'Very large dimensions, animated formats and alpha handling have no recorded public test evidence.',
  },
  {
    id: 'html',
    name: 'HTML content and widgets',
    maturity: 'runtime-supported',
    summary:
      'Both players mount HTML content in an iframe: packaged widgets (ZIP with an HTML entry file, downloaded, extracted and cached locally) and hosted web pages (loaded live from their URL).',
    recognisedFormats: ['ZIP widget package with index.html entry', 'Hosted HTML URL'],
    formatCaveat:
      'Widget packages are cached and can run from local files; plain web content loads live and depends on the network and the remote site. CSS and JavaScript behaviour depends on the platform browser engine and firmware.',
    safestKnownProfile:
      'A self-contained ZIP widget package with local assets and an index.html entry file. No exact public test result yet.',
    principalLimitation:
      'Widgets are not prefetched by the image/video download queue — they are prepared when the item is about to play. Video inside HTML does not use the native hardware video path.',
  },
];

/**
 * Categories deliberately not shown: standalone audio, documents and live
 * streams. Neither public player has a playlist item type for them
 * (recognised types are image, video and widget/web only).
 */
export const EXCLUDED_CATEGORIES_NOTE =
  'Standalone audio files, documents and live streams are not playlist item types in the public TomorrowOS players today, so they are not listed. Audio inside video files plays through the video pipeline but has no separate public validation result.';

/* ------------------------------------------------------------------ */
/* Recommended baselines (platform-specific — no universal profile has  */
/* public evidence yet)                                                 */
/* ------------------------------------------------------------------ */

export interface PlatformBaseline {
  platform: string;
  status: MediaValidationStatus;
  profile: string[];
  basis: string;
}

export const PLATFORM_BASELINES: PlatformBaseline[] = [
  {
    platform: 'BrightSign',
    status: 'runtime-supported',
    profile: [
      'MP4 container',
      'H.264 video',
      '1920 × 1080 (1080p)',
      'Landscape 16:9',
      'Moderate bitrate; no advanced codec features',
    ],
    basis:
      'The public BrightSign documentation explicitly certifies with 1080p H.264 and directs Series 3 deployments to 1080p H.264 (not 4K). No exact device, firmware and file combination has a published test result yet, so this remains a documentation-backed baseline rather than a validated profile.',
  },
  {
    platform: 'Samsung Tizen',
    status: 'runtime-supported',
    profile: [
      'MP4 container',
      'H.264 video',
      'Panel-native resolution (commonly 1920 × 1080)',
      'Landscape or configured portrait orientation',
    ],
    basis:
      'The public Tizen documentation checks video playlist playback with H.264 through the AVPlay hardware pipeline. Samsung has published no TomorrowOS-specific recommended profile, and no exact combination has a published test result.',
  },
];

export const BASELINE_WARNING =
  'A recommended profile reduces risk but does not replace testing on the exact deployment hardware and firmware.';

/* ------------------------------------------------------------------ */
/* Looping and transition behaviour (public black-gap guide + player    */
/* source)                                                              */
/* ------------------------------------------------------------------ */

export interface LoopBehaviour {
  scenario: string;
  tizen: string;
  brightsign: string;
}

export const LOOP_BEHAVIOURS: LoopBehaviour[] = [
  {
    scenario: 'Image → image',
    tizen: 'Dual HTML layers with prefetch, decode warm-up and instant swap — no fade that could flash the background.',
    brightsign: 'Same dual-layer, prefetch and instant-swap path; no video player involved.',
  },
  {
    scenario: 'Image → video',
    tizen:
      'Image held on the front layer while video mounts behind it (dual AVPlay preferred, single AVPlay or HTML video as fallbacks), then handed off.',
    brightsign: 'Video mounts on dual roVideoPlayer slots behind the current image before handoff.',
  },
  {
    scenario: 'Video → image',
    tizen:
      'Last video frame held with still mode until the incoming image has painted, and only then is the video player stopped.',
    brightsign: 'Equivalent hold-then-swap handoff before the video player is released.',
  },
  {
    scenario: 'Video → video',
    tizen: 'Dual AVPlay slots: the next file is prepared on the inactive slot and switched over seamlessly.',
    brightsign: 'Dual roVideoPlayer slots with the same prepare-then-switch pattern.',
  },
  {
    scenario: 'Single-image loop',
    tizen: 'Detected as a same-item loop; the existing image stays on screen with no transition at all.',
    brightsign: 'Same detection; no transition means no black-gap opportunity.',
  },
  {
    scenario: 'Single-video loop',
    tizen:
      'Seamless switch to the other AVPlay slot with the same file, or an in-place replay (seek to 0 and play) where applicable.',
    brightsign: 'Slot switch or in-place replay on the dual roVideoPlayer pair.',
  },
];

export const LOOPING_CONTEXT_NOTE =
  'These mechanisms are implemented in the public player source and described in the public black-gap guide. They describe design behaviour: no exact device, firmware and media-profile loop test result has been published yet.';

/* ------------------------------------------------------------------ */
/* Offline and recovery dimensions                                      */
/* ------------------------------------------------------------------ */

export interface OfflineDimension {
  dimension: string;
  designedBehaviour: string;
  publicEvidence: string;
}

export const OFFLINE_DIMENSIONS: OfflineDimension[] = [
  {
    dimension: 'Initial download and caching',
    designedBehaviour:
      'Images and videos are downloaded to local storage before playback; widgets are downloaded and extracted into a local widget cache keyed by URL and version.',
    publicEvidence: 'Player source and public guides. Not yet validated per media profile.',
  },
  {
    dimension: 'Playback with network disconnected',
    designedBehaviour: 'Cached images, videos and extracted widget packages play from local files.',
    publicEvidence: 'Player source and platform documentation. Not yet validated per media profile.',
  },
  {
    dimension: 'Reboot while offline',
    designedBehaviour: 'The player restarts into the cached policy and resumes playback without a network connection.',
    publicEvidence: 'Documented reboot-resume behaviour. Not yet validated per media profile.',
  },
  {
    dimension: 'Reconnection and content reconciliation',
    designedBehaviour: 'On reconnect, the player fetches the current policy and reconciles cached content.',
    publicEvidence: 'Player source. Not yet validated per media profile.',
  },
  {
    dimension: 'Interrupted or invalid downloads, storage exhaustion',
    designedBehaviour: 'Failure diagnostics are logged for media that fails to mount or play.',
    publicEvidence: 'No public test result recorded for these failure paths.',
  },
];

/* ------------------------------------------------------------------ */
/* Known media limitations                                              */
/* ------------------------------------------------------------------ */

export interface MediaLimitation {
  group: string;
  platform: string;
  scope: string;
  firmware: string;
  mediaProfile: string;
  symptom: string;
  workaround: string;
  status: string;
}

export const MEDIA_LIMITATIONS: MediaLimitation[] = [
  {
    group: 'Firmware',
    platform: 'BrightSign',
    scope: 'Series 3 players',
    firmware: 'Below BrightSign OS 9.1.140',
    mediaProfile: 'All video playback',
    symptom: 'Video playback is unreliable on Series 3 until the firmware is upgraded.',
    workaround: 'Upgrade Series 3 players to BrightSign OS 9.1.140 or newer in the 9.1 line before relying on video playlists.',
    status: 'Documented in public platform documentation; fix confirmed at firmware level.',
  },
  {
    group: 'Resolution / codec',
    platform: 'BrightSign',
    scope: 'Series 3 players',
    firmware: 'All, including 9.1.140+',
    mediaProfile: '4K H.264 video',
    symptom: 'Reliable 4K H.264 playback is not expected — a Series 3 hardware limit, not a TomorrowOS playlist issue.',
    workaround: 'Ship 1080p H.264 content to Series 3 devices.',
    status: 'Documented hardware limitation.',
  },
  {
    group: 'Playback context',
    platform: 'Samsung Tizen and BrightSign',
    scope: 'Video inside HTML widgets or web content',
    firmware: NOT_RECORDED,
    mediaProfile: 'Any video embedded in HTML',
    symptom:
      'Embedded video renders through the platform browser engine, not the native hardware video path, so performance, looping and codec behaviour can differ from native playlist video.',
    workaround: 'Use native playlist video items for full-screen video; validate any embedded video in its exact widget context.',
    status: 'Architectural difference documented in public guides.',
  },
  {
    group: 'Offline behaviour',
    platform: 'Samsung Tizen and BrightSign',
    scope: 'Widget packages',
    firmware: NOT_RECORDED,
    mediaProfile: 'ZIP widget packages and hosted web content',
    symptom:
      'Widgets are not prefetched by the image/video download queue; they are prepared when the item is about to play. Hosted (non-packaged) web content loads live and depends on the network.',
    workaround: 'Package widgets as self-contained ZIPs with local assets when offline resilience matters.',
    status: 'Documented package lifecycle behaviour.',
  },
  {
    group: 'Untested media',
    platform: 'All platforms',
    scope: 'HEVC/H.265, WebM, transport streams, animated images, alpha video, very high bitrates',
    firmware: NOT_RECORDED,
    mediaProfile: 'Any profile outside the documented H.264/JPEG/PNG baseline',
    symptom: 'No public TomorrowOS test result exists for these profiles; behaviour is unknown per device and firmware.',
    workaround: 'Treat as Requires Validation and complete the media validation workflow before production use.',
    status: 'Open validation gap.',
  },
];

/* ------------------------------------------------------------------ */
/* Methodology, checklist, contribution                                 */
/* ------------------------------------------------------------------ */

export const MEDIA_METHODOLOGY = [
  'Assign a unique test ID.',
  'Record the original file.',
  'Extract technical metadata (container, codec, profile, resolution, frame rate, bitrate, audio).',
  'Record the exact device.',
  'Record the firmware or OS build.',
  'Record the TomorrowOS runtime version.',
  'Publish the file to the device.',
  'Confirm download completion.',
  'Play through the complete duration.',
  'Test repeated looping.',
  'Test portrait or landscape behaviour as deployed.',
  'Disconnect the network.',
  'Verify offline playback.',
  'Restart the device.',
  'Verify recovery.',
  'Restore the network.',
  'Confirm reconnection.',
  'Record visual, audio and log evidence.',
  'Record limitations.',
  'Approve, reject or require further validation.',
];

export const MEDIA_CHECKLIST = [
  'Record exact file metadata',
  'Confirm target device',
  'Confirm firmware',
  'Confirm runtime version',
  'Test complete playback',
  'Test at least five loops',
  'Test audio if present',
  'Test offline playback',
  'Restart while offline',
  'Restore network connectivity',
  'Confirm recovery',
  'Check storage use',
  'Keep a fallback media profile',
  'Record the result',
];

export const CONTRIBUTION_GUIDELINES = [
  'Remove confidential or client-specific content before sharing anything.',
  'Use reproducible sample files wherever possible.',
  'Provide the exact device model and firmware or OS build.',
  'Include the file’s technical metadata (container, codec, profile, resolution, frame rate, bitrate, audio).',
  'State whether the sample file may be redistributed publicly.',
];

export const DISCUSSIONS_URL = 'https://github.com/orgs/TomorrowOS/discussions';
export const TIZEN_REPO_URL = 'https://github.com/TomorrowOS/TomorrowOS_Tizen';
export const BRIGHTSIGN_REPO_URL = 'https://github.com/TomorrowOS/TomorrowOS_BrightSign';
export const DOCS_URL = 'https://docs.tomorrowos.org';

/* ------------------------------------------------------------------ */
/* Derived summary                                                      */
/* ------------------------------------------------------------------ */

export function getMediaSummary() {
  const recordedTests = MEDIA_TESTS.length;
  const namedTestDevices = new Set(
    MEDIA_TESTS.map((t) => t.deviceModel).filter((m) => m !== NOT_RECORDED),
  ).size;
  const validatedProfiles = MEDIA_TESTS.filter(
    (t) => t.status === 'validated' || t.status === 'production-recommended',
  ).length;
  return {
    recordedTests,
    namedTestDevices,
    validatedProfiles,
    platformFamiliesCovered: 2, // Samsung Tizen + BrightSign (runtime-supported)
    mediaCategories: MEDIA_CATEGORIES.length,
    openValidationGaps: MEDIA_LIMITATIONS.filter((l) => l.group === 'Untested media').length
      + MEDIA_CATEGORIES.length, // every category still awaits its first public exact-profile result
    lastReviewed: MEDIA_LAST_REVIEWED,
  };
}
