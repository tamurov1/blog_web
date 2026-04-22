export type NewsSeverity = 'Critical' | 'High' | 'Medium' | 'Brief'

export type NewsPost = {
  id: string
  title: string
  deck: string
  category: string
  severity: NewsSeverity
  publishedAt: string
  readTime: string
  source: string
  sourceUrl: string
  tags: string[]
  body: Array<{
    heading: string
    paragraphs: string[]
  }>
  whyItMatters: string
  summary: string[]
  timeline: string[]
  analystNote: string
  indicators: string[]
  relatedIds: string[]
}

export const CYBER_NEWS_PAGE_SIZE = 50
export const CYBERNEWS_BRAND_NAME = 'Dmytrii Tamurov Cybernews'
export const CYBERNEWS_SITE_URL = 'https://dmytriitamurov.com/cybernews'
export const CYBERNEWS_AUTHOR_NAME = 'Dmytrii Tamurov'
export const CYBERNEWS_AUTHOR_URL = 'https://dmytriitamurov.com'

export const cyberNewsPosts: NewsPost[] = [
  {
    id: 'cloud-identity-session-abuse',
    title: 'Cloud identity session abuse remains a priority intrusion path',
    deck:
      'Security teams are tightening refresh-token monitoring, conditional access rules, and anomalous device checks after a wave of identity-led compromises.',
    category: 'Cloud',
    severity: 'High',
    publishedAt: '2026-04-22',
    readTime: '5 min read',
    source: 'Dmytrii Tamurov Cybernews',
    sourceUrl: CYBERNEWS_SITE_URL,
    tags: ['Identity', 'Cloud', 'Detection'],
    body: [
      {
        heading: 'Identity signals are becoming the first place to investigate',
        paragraphs: [
          'Cloud intrusions increasingly begin with valid sessions rather than obvious password guessing. That changes the defender workflow because the first suspicious event can look like an ordinary user sign-in until device, network, and consent context are reviewed together.',
          'Teams should prioritize detections that combine multiple weak signals. A new device, fresh OAuth consent, unfamiliar network, and unusual mailbox activity are stronger as a cluster than as isolated alerts.',
        ],
      },
      {
        heading: 'Response needs fast revocation paths',
        paragraphs: [
          'Password resets are not enough when an attacker already has usable session material. Incident handlers should revoke sessions, remove suspicious app grants, rotate exposed secrets, and preserve audit logs before broad cleanup work hides the path of entry.',
          'The practical goal is a short loop from alert to containment. Long-lived tokens, unclear ownership, and missing sign-in logs all slow that loop down.',
        ],
      },
    ],
    whyItMatters:
      'Identity compromise gives attackers a low-noise path into cloud systems. Better session monitoring reduces dwell time without forcing disruptive controls onto every normal login.',
    summary: [
      'The most useful detections are focused on impossible travel, new device registration, suspicious consent grants, and token reuse from unfamiliar networks.',
      'Incident response teams should preserve sign-in logs, audit OAuth application changes, and rotate exposed session material before forcing broad password resets.',
      'The operational priority is reducing session lifetime and adding friction only around high-risk behavior, not blocking normal user work.',
    ],
    timeline: [
      'Initial access: phishing or endpoint token theft.',
      'Expansion: attacker adds persistence through trusted app consent or device registration.',
      'Containment: revoke sessions, remove rogue apps, rotate secrets, and review mailbox forwarding rules.',
    ],
    analystNote:
      'Treat identity telemetry as production security data. Short-lived tokens help, but the real improvement comes from alert quality and fast revocation paths.',
    indicators: ['New OAuth grants', 'Unexpected MFA method changes', 'Refresh tokens from VPN exits'],
    relatedIds: ['ransomware-backup-pressure', 'supply-chain-build-secrets'],
  },
  {
    id: 'ransomware-backup-pressure',
    title: 'Ransomware crews increase pressure on backup and recovery systems',
    deck:
      'Recent playbooks target backup consoles, storage snapshots, and recovery credentials before encryption begins.',
    category: 'Ransomware',
    severity: 'Critical',
    publishedAt: '2026-04-21',
    readTime: '6 min read',
    source: 'Dmytrii Tamurov Cybernews',
    sourceUrl: CYBERNEWS_SITE_URL,
    tags: ['Ransomware', 'Backups', 'IR'],
    body: [
      {
        heading: 'Recovery systems are now part of the attack surface',
        paragraphs: [
          'Ransomware operators often inspect backup tools before encryption because working recovery paths reduce their leverage. That makes backup consoles, storage snapshots, service accounts, and admin workstations part of the same security boundary as domain controllers.',
          'Immutable copies help, but they are not a replacement for operational testing. A backup is only meaningful if the team can restore from it during a compromised-domain scenario.',
        ],
      },
      {
        heading: 'Ownership decides response speed',
        paragraphs: [
          'Organizations should define who can isolate backup management systems, rotate backup credentials, and pause risky administrative access during an active incident.',
          'The best recovery plans avoid depending on the same identity provider, network segment, or password vault that may already be under attacker control.',
        ],
      },
    ],
    whyItMatters:
      'When backups are weakened before encryption, the incident shifts from cleanup to business continuity. Protecting recovery infrastructure directly lowers extortion pressure.',
    summary: [
      'Backup infrastructure should be treated as a tier-zero asset with isolated admin accounts, separate logging, and tested restoration paths.',
      'The strongest control remains immutable storage with recovery drills that prove systems can be rebuilt without the compromised domain.',
      'Teams should review whether backup credentials are exposed through scripts, shared admin workstations, or synchronized password vaults.',
    ],
    timeline: [
      'Recon: adversary enumerates storage, hypervisors, and backup management tools.',
      'Disablement: jobs are paused, retention rules changed, or snapshots deleted.',
      'Impact: encryption or extortion begins after recovery options are reduced.',
    ],
    analystNote:
      'Do not measure backup health by successful jobs alone. Measure it by restoration time, isolation, and whether attackers can administer the same systems.',
    indicators: ['Backup job deletion', 'Snapshot policy edits', 'Admin logins outside maintenance windows'],
    relatedIds: ['cloud-identity-session-abuse', 'edge-device-patching-window'],
  },
  {
    id: 'supply-chain-build-secrets',
    title: 'Build pipelines leak secrets through logs and temporary artifacts',
    deck:
      'Developer platforms continue to expose tokens through verbose output, dependency scripts, and long-lived automation credentials.',
    category: 'AppSec',
    severity: 'Medium',
    publishedAt: '2026-04-20',
    readTime: '4 min read',
    source: 'Dmytrii Tamurov Cybernews',
    sourceUrl: CYBERNEWS_SITE_URL,
    tags: ['Supply Chain', 'Secrets', 'CI/CD'],
    body: [
      {
        heading: 'Build output is a data source attackers can mine',
        paragraphs: [
          'CI systems routinely print environment details, dependency output, failing command context, and temporary paths. If a token appears in that output, it may survive in logs, artifacts, caches, or external monitoring systems.',
          'This is especially risky for deployment tokens and package publishing credentials because a single leak can give attackers access to production systems or trusted release channels.',
        ],
      },
      {
        heading: 'Short-lived credentials reduce the blast radius',
        paragraphs: [
          'Teams should prefer scoped, short-lived credentials for build jobs and disable broad tokens that outlive a single deployment.',
          'Secret scanning should cover repositories, logs, artifacts, container layers, and package lifecycle scripts rather than only source code.',
        ],
      },
    ],
    whyItMatters:
      'A leaked build token can turn a low-severity pipeline mistake into source access, package compromise, or cloud deployment abuse.',
    summary: [
      'CI logs, package manager hooks, and cached build folders can retain secrets after a job finishes.',
      'Short-lived credentials and scoped deployment tokens reduce blast radius when logs or artifacts are copied outside the pipeline.',
      'The feed should be watched for new package releases that request unexpected install-time network access.',
    ],
    timeline: [
      'Exposure: secret printed by debug output or failing command.',
      'Collection: artifact retained in CI storage or mirrored to an external system.',
      'Abuse: token used for source access, package publishing, or cloud deployment.',
    ],
    analystNote:
      'Secret scanning belongs inside the pipeline and around it. Scan logs, artifacts, repositories, and package release workflows.',
    indicators: ['Verbose CI output', 'Unexpected publish tokens', 'New dependency lifecycle scripts'],
    relatedIds: ['cloud-identity-session-abuse', 'edge-device-patching-window'],
  },
  {
    id: 'edge-device-patching-window',
    title: 'Edge device patch windows need faster ownership decisions',
    deck:
      'Network appliances and remote access systems remain difficult to patch because ownership is often split across IT, security, and vendors.',
    category: 'Infrastructure',
    severity: 'High',
    publishedAt: '2026-04-19',
    readTime: '5 min read',
    source: 'Dmytrii Tamurov Cybernews',
    sourceUrl: CYBERNEWS_SITE_URL,
    tags: ['Exposure', 'Patching', 'Network'],
    body: [
      {
        heading: 'Internet-facing devices need preassigned owners',
        paragraphs: [
          'Edge appliances often sit between teams. Security sees the exposure, infrastructure owns uptime, and vendors control patch timing. That split slows action when a serious advisory lands.',
          'Asset records should include firmware version, exposed management interfaces, business owner, technical owner, and emergency maintenance authority.',
        ],
      },
      {
        heading: 'Mitigations should expire',
        paragraphs: [
          'Temporary access restrictions and vendor workarounds are useful, but they should be tracked with the same discipline as patches.',
          'If a mitigation has no owner or expiration date, it can become quiet permanent risk while teams assume the issue was handled.',
        ],
      },
    ],
    whyItMatters:
      'Exposed appliances are high-value entry points. Faster ownership decisions shorten the window between public advisory and real protection.',
    summary: [
      'Internet-facing systems should have named owners, maintenance windows, and emergency patch authority before the advisory lands.',
      'Exposure management works best when asset inventory includes firmware versions, external IPs, and business owners.',
      'Temporary mitigations should be tracked like patches so they do not become permanent unknown risk.',
    ],
    timeline: [
      'Advisory: vendor publishes fixed firmware or mitigation.',
      'Exposure check: security validates reachable versions and management interfaces.',
      'Closure: owner patches, restricts access, and documents residual risk.',
    ],
    analystNote:
      'The hard part is rarely the patch command. It is deciding who can interrupt service when the exposed asset is business critical.',
    indicators: ['Public admin portals', 'Old firmware versions', 'Unknown appliance ownership'],
    relatedIds: ['cloud-identity-session-abuse', 'supply-chain-build-secrets'],
  },
]

export const cyberNewsCategories = [
  'All',
  ...Array.from(new Set(cyberNewsPosts.map((post) => post.category))),
]

export const cyberNewsSeverities: Array<'All' | NewsSeverity> = [
  'All',
  'Critical',
  'High',
  'Medium',
  'Brief',
]

export function getCyberNewsPost(postId: string) {
  return cyberNewsPosts.find((post) => post.id === postId)
}

export function severityStyles(severity: NewsSeverity) {
  const styles: Record<NewsSeverity, string> = {
    Critical: 'border-red-200 bg-red-50 text-red-700',
    High: 'border-orange-200 bg-orange-50 text-orange-700',
    Medium: 'border-blue-200 bg-blue-50 text-blue-700',
    Brief: 'border-gray-200 bg-gray-50 text-gray-700',
  }

  return styles[severity]
}
