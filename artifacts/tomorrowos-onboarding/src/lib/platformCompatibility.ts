/**
 * Single typed source of truth for the Platform Compatibility Centre
 * (/compatibility).
 *
 * Evidence policy: every value here must be verifiable from a public source —
 * the TomorrowOS documentation (docs.tomorrowos.org) or the public GitHub
 * repositories. Internal or provisional claims (e.g. named test models that
 * have not been published) must NOT be added until sign-off. Where no public
 * evidence exists, the honest placeholder strings below are used instead of
 * dashes.
 *
 * Status vocabulary (never use interchangeably):
 * - production-ready: exact combination completed validation and is approved.
 * - validated: exact combination completed physical testing and passed.
 * - supported: designed for the platform/series; not every combination tested.
 * - platform-validation: implementation exists; testing underway.
 * - requires-validation: in scope, but the exact combination is untested.
 * - planned: on the roadmap, not currently available.
 * - unsupported: known not to work or out of scope.
 */

export type CompatibilityStatus =
  | 'production-ready'
  | 'validated'
  | 'supported'
  | 'platform-validation'
  | 'requires-validation'
  | 'planned'
  | 'unsupported';

export const COMPATIBILITY_STATUS_LABELS: Record<CompatibilityStatus, string> = {
  'production-ready': 'Production Ready',
  validated: 'Validated',
  supported: 'Supported',
  'platform-validation': 'Platform Validation',
  'requires-validation': 'Requires Validation',
  planned: 'Planned',
  unsupported: 'Unsupported',
};

export const COMPATIBILITY_STATUS_DEFINITIONS: Record<CompatibilityStatus, string> = {
  'production-ready':
    'The exact platform, hardware, OS build and runtime combination has completed the validation workflow and is approved for deployment within its documented limitations.',
  validated:
    'The exact combination has completed physical testing and passed the published acceptance criteria.',
  supported:
    'TomorrowOS is designed to operate on the platform or series, but not every model, firmware or media combination has necessarily been validated.',
  'platform-validation': 'Implementation exists and testing is currently underway.',
  'requires-validation':
    'The platform may fall inside the supported scope, but the exact combination has not completed testing.',
  planned: 'Support is on the roadmap but is not currently available.',
  unsupported: 'The combination is known not to work or falls outside the supported product scope.',
};

/** Honest placeholders — never conceal a missing value behind a dash. */
export const NOT_RECORDED = 'Not yet recorded';
export const NO_PUBLIC_TEST = 'No public test result';
export const NO_PUBLIC_MODEL = 'No public test model recorded';

export type TestResult = string; // human wording, e.g. "Confirmed in code" / NO_PUBLIC_TEST

export interface DeviceCompatibility {
  /** Series or OS-version grouping, e.g. "Series 3" or "Tizen 6.5". */
  group: string;
  model: string;
  firmware: string;
  runtime: string;
  pairing: TestResult;
  playback: TestResult;
  offline: TestResult;
  recovery: TestResult;
  status: CompatibilityStatus;
  notes: string;
}

export interface PlatformLimitation {
  category:
    | 'Firmware'
    | 'Media'
    | 'HTML/runtime'
    | 'Storage'
    | 'Network'
    | 'Orientation'
    | 'Offline'
    | 'Recovery'
    | 'Hardware-specific'
    | 'Untested behaviour';
  scope: string;
  firmware: string;
  symptom: string;
  workaround: string;
  status: string;
}

export interface CompatibilityLink {
  label: string;
  href: string;
  external: boolean;
}

export interface PlatformCompatibility {
  id: string;
  name: string;
  status: CompatibilityStatus;
  /** One-line maturity summary for the overview card. */
  summary: string;
  scope: string[];
  /** Public named tested models — empty until published test evidence exists. */
  testedModels: string[];
  /** Latest player package version verifiable from the public repository, if any. */
  runtimeVersion?: string;
  keyLimitation: string;
  /** Plain-language support statement for the detail section. */
  statement: string;
  devices: DeviceCompatibility[];
  limitations: PlatformLimitation[];
  validationNotes: string[];
  links: CompatibilityLink[];
  primaryCta: CompatibilityLink;
  secondaryCta?: CompatibilityLink;
}

export const COMPATIBILITY_LAST_REVIEWED = '3 August 2026';

const TIZEN_DOCS = 'https://docs.tomorrowos.org/docs/os/tizen';
const BRIGHTSIGN_DOCS = 'https://docs.tomorrowos.org/docs/os/brightsign';
const CERTIFICATION_DOCS = 'https://docs.tomorrowos.org/docs/testing/certification';
const TIZEN_REPO = 'https://github.com/TomorrowOS/TomorrowOS_Tizen';
const BRIGHTSIGN_REPO = 'https://github.com/TomorrowOS/TomorrowOS_BrightSign';
const DISCUSSIONS = 'https://github.com/orgs/TomorrowOS/discussions';

export const PLATFORMS: PlatformCompatibility[] = [
  {
    id: 'samsung-tizen',
    name: 'Samsung Tizen',
    status: 'supported',
    summary:
      'First-class player platform for Samsung commercial displays on Tizen 6.5 and 7.0.',
    scope: ['Tizen 6.5 (commercial displays)', 'Tizen 7.0 (commercial displays)'],
    testedModels: [],
    keyLimitation:
      'Screenshot capture requires panel firmware 1080 or newer; behaviour varies by model and firmware.',
    statement:
      'TomorrowOS ships an open-source Tizen web player (.wgt) for Samsung commercial displays on Tizen 6.5 and 7.0. Older Tizen generations are not supported without a separate player build. Capability depends on the exact display model and firmware — a feature can work on one commercial panel and fail on another, so each model and firmware combination should be validated before production.',
    devices: [
      {
        group: 'Tizen 6.5',
        model: NO_PUBLIC_MODEL,
        firmware: NOT_RECORDED,
        runtime: NOT_RECORDED,
        pairing: 'Six-character pairing confirmed in code and documentation',
        playback: 'Image, H.264 video (AVPlay), widget playback confirmed in code',
        offline: 'Cache and resume logic confirmed in code; per-model validation required',
        recovery: 'Reboot-resume confirmed in code; per-model validation required',
        status: 'requires-validation',
        notes: 'Supported scope; no public exact-model validation result recorded',
      },
      {
        group: 'Tizen 7.0',
        model: NO_PUBLIC_MODEL,
        firmware: NOT_RECORDED,
        runtime: NOT_RECORDED,
        pairing: 'Six-character pairing confirmed in code and documentation',
        playback: 'Image, H.264 video (AVPlay), widget playback confirmed in code',
        offline: 'Cache and resume logic confirmed in code; per-model validation required',
        recovery: 'Reboot-resume confirmed in code; per-model validation required',
        status: 'requires-validation',
        notes: 'Supported scope; no public exact-model validation result recorded',
      },
    ],
    limitations: [
      {
        category: 'Firmware',
        scope: 'Samsung commercial displays (all supported models)',
        firmware: 'Below panel firmware 1080',
        symptom: 'Remote screenshot capture may fail even when pairing and playback work',
        workaround: 'Upgrade panel firmware to 1080 or newer, then re-test capture',
        status: 'Documented requirement',
      },
      {
        category: 'HTML/runtime',
        scope: 'Tizen generations older than 6.5',
        firmware: NOT_RECORDED,
        symptom: 'Out of the supported V1 scope',
        workaround: 'None — would need a separate player build or firmware path',
        status: 'Documented scope boundary',
      },
      {
        category: 'Network',
        scope: 'All models',
        firmware: 'Any',
        symptom: 'Pairing and WebSocket connection fail when the CMS URL is set to localhost',
        workaround: 'Use a LAN IP, tunnel or public HTTPS URL the display can reach',
        status: 'Documented configuration rule',
      },
      {
        category: 'Hardware-specific',
        scope: 'All models',
        firmware: 'Any',
        symptom: 'Display on/off scheduling is implemented via panel mute and is capability-gated',
        workaround: 'Check device.info.getCapabilities on the exact panel before relying on it',
        status: 'Documented behaviour',
      },
    ],
    validationNotes: [
      'Setup happens on the display: an orientation intro on first launch, then an on-device CMS URL screen (no config file on removable media).',
      'Install paths: Custom App URL, USB sideload of the .wgt package, or Tizen Studio Device Manager.',
      'Trust the live device.info.getCapabilities response on the exact panel over any published table.',
    ],
    links: [
      { label: 'Samsung Tizen installation guide', href: '/guides/platforms/samsung-tizen', external: false },
      { label: 'Tizen platform documentation', href: TIZEN_DOCS, external: true },
      { label: 'TomorrowOS Tizen repository', href: TIZEN_REPO, external: true },
      { label: 'Media compatibility', href: '/compatibility/media', external: false },
    ],
    primaryCta: { label: 'Installation guide', href: '/guides/platforms/samsung-tizen', external: false },
    secondaryCta: { label: 'Platform documentation', href: TIZEN_DOCS, external: true },
  },
  {
    id: 'brightsign',
    name: 'BrightSign',
    status: 'platform-validation',
    summary:
      'Open-source player for BrightSign Series 3–6; implementation complete, validation underway.',
    scope: ['Series 3', 'Series 4', 'Series 5', 'Series 6'],
    testedModels: [],
    runtimeVersion: '1.1.0 (player package, public repository)',
    keyLimitation:
      'Series 3 needs BrightSign OS 9.1.140+ for reliable video; 4K H.264 is a Series 3 hardware limit.',
    statement:
      'TomorrowOS ships an open-source HTML player for BrightSign Series 3–6, installed at the root of an SD card and configured through a config file. Series-level support is confirmed in the public repository and documentation; exact tested model numbers and OS builds have not yet been published, so individual combinations remain in validation.',
    devices: [
      {
        group: 'Series 3',
        model: NO_PUBLIC_MODEL,
        firmware: '9.1.140+ required for reliable video',
        runtime: NOT_RECORDED,
        pairing: 'Six-character pairing confirmed in code and documentation',
        playback: 'Video reliable on OS 9.1.140+; 1080p H.264 recommended (field testing)',
        offline: 'SD-card cache and resume confirmed in code; per-model validation required',
        recovery: 'Reboot-resume and watchdog confirmed in code; per-model validation required',
        status: 'requires-validation',
        notes: '4K H.264 unsupported — hardware limit',
      },
      {
        group: 'Series 4',
        model: NO_PUBLIC_MODEL,
        firmware: NOT_RECORDED,
        runtime: NOT_RECORDED,
        pairing: NO_PUBLIC_TEST,
        playback: NO_PUBLIC_TEST,
        offline: NO_PUBLIC_TEST,
        recovery: NO_PUBLIC_TEST,
        status: 'requires-validation',
        notes:
          'Series 4 support is within the intended scope, but no public exact-model validation result is currently recorded',
      },
      {
        group: 'Series 5',
        model: NO_PUBLIC_MODEL,
        firmware: NOT_RECORDED,
        runtime: NOT_RECORDED,
        pairing: NO_PUBLIC_TEST,
        playback: NO_PUBLIC_TEST,
        offline: NO_PUBLIC_TEST,
        recovery: NO_PUBLIC_TEST,
        status: 'requires-validation',
        notes: 'Series 5-specific rendering fix present in the player code',
      },
      {
        group: 'Series 6',
        model: NO_PUBLIC_MODEL,
        firmware: NOT_RECORDED,
        runtime: NOT_RECORDED,
        pairing: NO_PUBLIC_TEST,
        playback: NO_PUBLIC_TEST,
        offline: NO_PUBLIC_TEST,
        recovery: NO_PUBLIC_TEST,
        status: 'requires-validation',
        notes: 'Series-level support claim only',
      },
    ],
    limitations: [
      {
        category: 'Firmware',
        scope: 'Series 3',
        firmware: 'Below BrightSign OS 9.1.140',
        symptom: 'Unreliable video playback',
        workaround: 'Upgrade to 9.1.140 or newer in the 9.1 line',
        status: 'Confirmed (field testing)',
      },
      {
        category: 'Media',
        scope: 'Series 3',
        firmware: 'Any (persists on 9.1.140+)',
        symptom: '4K H.264 playback unreliable — hardware limitation',
        workaround: 'Use validated 1080p H.264 media',
        status: 'Confirmed hardware limit',
      },
      {
        category: 'HTML/runtime',
        scope: 'Series 5',
        firmware: NOT_RECORDED,
        symptom: 'Inflated browser viewport positioned player UI off-screen',
        workaround: 'Fixed in the current player runtime (automatic layout correction)',
        status: 'Fixed in player code',
      },
      {
        category: 'Hardware-specific',
        scope: 'Any series on consumer TVs',
        firmware: 'Any',
        symptom: 'HDMI-CEC can cycle the TV between black and its home screen',
        workaround: 'Disable HDMI-CEC on the TV input; verify on a monitor first',
        status: 'Documented workaround',
      },
      {
        category: 'Storage',
        scope: 'Any series',
        firmware: 'Any',
        symptom: 'Leftover provisioning files on the SD card cause boot loops',
        workaround: 'Keep one autorun file; factory-reset previously provisioned players',
        status: 'Documented workaround',
      },
    ],
    validationNotes: [
      'Configuration is file-based: CMS endpoint and orientation are set in config.js before the SD card is inserted (no on-device setup screen).',
      'Untested behaviour: synchronised multi-player playback, GPIO/serial peripherals, and 4K profiles on Series 4–6 are not publicly verified.',
    ],
    links: [
      { label: 'BrightSign support article', href: '/learn/brightsign-digital-signage-player', external: false },
      { label: 'BrightSign installation documentation', href: BRIGHTSIGN_DOCS, external: true },
      { label: 'TomorrowOS BrightSign repository', href: BRIGHTSIGN_REPO, external: true },
      { label: 'Media compatibility', href: '/compatibility/media', external: false },
    ],
    primaryCta: {
      label: 'View support article',
      href: '/learn/brightsign-digital-signage-player',
      external: false,
    },
    secondaryCta: { label: 'Installation documentation', href: BRIGHTSIGN_DOCS, external: true },
  },
  {
    id: 'lg-webos',
    name: 'LG webOS',
    status: 'planned',
    summary: 'On the roadmap; no public player build or validation data yet.',
    scope: [],
    testedModels: [],
    keyLimitation: 'No public runtime is available yet.',
    statement:
      'LG webOS signage support is on the TomorrowOS roadmap. The public documentation lists it as coming soon, and no public player repository, runtime build or validation data exists yet. No model or webOS version claims will be published until testing produces evidence.',
    devices: [],
    limitations: [],
    validationNotes: [],
    links: [{ label: 'Follow development on GitHub', href: DISCUSSIONS, external: true }],
    primaryCta: { label: 'Follow development', href: DISCUSSIONS, external: true },
  },
  {
    id: 'android',
    name: 'Android',
    status: 'planned',
    summary: 'On the roadmap; no public player build or validation data yet.',
    scope: [],
    testedModels: [],
    keyLimitation: 'No public runtime or APK is available yet.',
    statement:
      'Android media player support is on the TomorrowOS roadmap. The public documentation lists it as coming soon. No APK, supported Android versions or validation data are published — those will appear here once testing produces evidence.',
    devices: [],
    limitations: [],
    validationNotes: [],
    links: [{ label: 'Follow development on GitHub', href: DISCUSSIONS, external: true }],
    primaryCta: { label: 'Follow development', href: DISCUSSIONS, external: true },
  },
  {
    id: 'windows',
    name: 'Windows',
    status: 'planned',
    summary: 'On the roadmap; no public player build or validation data yet.',
    scope: [],
    testedModels: [],
    keyLimitation: 'No public runtime is available yet.',
    statement:
      'A Windows player — for media PCs and system-on-chip alternatives — is on the TomorrowOS roadmap. The public documentation lists it as coming soon. Validated OS builds and deployment instructions will be published after testing.',
    devices: [],
    limitations: [],
    validationNotes: [],
    links: [{ label: 'Follow development on GitHub', href: DISCUSSIONS, external: true }],
    primaryCta: { label: 'Follow development', href: DISCUSSIONS, external: true },
  },
];

/**
 * Exact device combinations with completed, publicly recorded validation
 * evidence. Deliberately empty today: no exact model + firmware + runtime
 * test result has been published yet. Series-level findings live in the
 * platform sections and must NOT be duplicated here as if they were exact
 * tests.
 */
export const VALIDATED_COMBINATIONS: (DeviceCompatibility & {
  platform: string;
  validationDate: string;
  mediaProfile: string;
})[] = [];

/** Derived summary counts — never hardcode these in the UI. */
export function getCompatibilitySummary() {
  return {
    supportedFamilies: PLATFORMS.filter(
      (p) => p.status === 'supported' || p.status === 'platform-validation',
    ).length,
    namedTestDevices: PLATFORMS.reduce((n, p) => n + p.testedModels.length, 0),
    inValidation: PLATFORMS.filter((p) => p.status === 'platform-validation').length,
    planned: PLATFORMS.filter((p) => p.status === 'planned').length,
    lastReviewed: COMPATIBILITY_LAST_REVIEWED,
  };
}
