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
    id: 'unc6692-microsoft-teams-helpdesk-impersonation',
    title: 'UNC6692 Turns Microsoft Teams into a High-Trust Entry Point for Enterprise Intrusions',
    deck:
      'UNC6692 is using spam floods, fake IT-support chats in Microsoft Teams, and modular SNOW malware to move from social engineering into credential theft, persistence, and domain-level compromise.',
    category: 'Social Engineering',
    severity: 'High',
    publishedAt: '2026-04-23',
    readTime: '6 min read',
    source: 'Dmytrii Tamurov Cybernews',
    sourceUrl: CYBERNEWS_SITE_URL,
    tags: ['UNC6692', 'Microsoft Teams', 'Social Engineering', 'SNOWBELT', 'Credential Theft', 'Lateral Movement'],
    body: [
      {
        heading: 'The intrusion begins by manufacturing pressure and then posing as relief',
        paragraphs: [
          'The campaign starts with inbox flooding. Once the target is distracted by spam volume, the attacker follows with a Microsoft Teams message from an external account impersonating internal helpdesk staff and offering assistance.',
          'That sequence matters because it is designed around trust transfer. The attacker first creates an operational problem, then steps in as the apparent solution through a platform employees already use for internal support and collaboration.',
        ],
      },
      {
        heading: 'UNC6692 is targeting high-value users and filtering for valid enterprise victims',
        paragraphs: [
          'Observed activity shows deliberate prioritization of senior personnel rather than broad opportunistic targeting. That suggests the actor is optimizing for accounts with greater system access, wider internal trust, and faster paths to sensitive assets.',
          'The delivery flow also appears selective. Victims are sent to a fake utility, presented as a mailbox repair tool, which uses gatekeeping logic before pulling an AutoHotkey payload from attacker-controlled infrastructure. That filtering helps the actor avoid noisy execution in automated analysis environments.',
        ],
      },
      {
        heading: 'The SNOW toolset expands a Teams phish into persistent post-compromise access',
        paragraphs: [
          'After the initial lure, the campaign deploys multiple components with distinct roles: SNOWBELT as a malicious browser-extension relay, SNOWBASIN as a local backdoor for command execution and file actions, and SNOWGLAZE as a covert tunneling layer between internal systems and attacker infrastructure.',
          'The victim is also pushed toward a fake health-check workflow that requests mailbox credentials under the pretense of validation. That means the operation is not satisfied with one foothold. It seeks both malware-based persistence and direct credential capture early in the intrusion.',
        ],
      },
      {
        heading: 'The real objective is controlled escalation across the enterprise environment',
        paragraphs: [
          'Post-exploitation behavior points to systematic takeover rather than casual access. Reported actions include network scanning, credential extraction, tunneling for remote sessions, pass-the-hash movement, and collection of high-value assets such as Active Directory data.',
          'Equally significant is the use of legitimate cloud infrastructure such as AWS S3 for hosting and exfiltration. That blends malicious traffic into trusted services and makes traditional reputation-based filtering less effective, especially when collaboration platforms are already assumed to be low-friction channels.',
        ],
      },
    ],
    whyItMatters:
      'This campaign shows that enterprise chat platforms are no longer peripheral phishing channels. Microsoft Teams can now function as a trusted entry point for credential theft, malware delivery, and structured lateral movement when users treat in-platform support messages as inherently safe.',
    summary: [
      'UNC6692 combines spam flooding with fake helpdesk messages in Microsoft Teams to create urgency and exploit employee trust.',
      'The malware chain uses modular SNOW components for command execution, covert communications, credential harvesting, and persistence.',
      'The operation appears designed for escalation into broader enterprise control, not just initial access or one-time data theft.',
    ],
    timeline: [
      'Pretext creation: the victim is overwhelmed with spam and then contacted on Teams by an external account impersonating IT support.',
      'Initial compromise: a phishing link delivers a fake mailbox repair utility that retrieves an AutoHotkey-based payload for selected targets.',
      'Credential and foothold expansion: SNOW malware components are deployed while the victim is prompted to submit mailbox credentials through a fake health-check flow.',
      'Enterprise escalation: the actor scans the network, extracts credentials, moves laterally, and uses trusted cloud infrastructure for staging and exfiltration.',
    ],
    analystNote:
      'Security teams that still model phishing primarily around email are behind the threat. Collaboration tools, external tenant messaging, and cloud-hosted payload paths now need the same defensive scrutiny as traditional mail gateways and web proxies.',
    indicators: [
      'Unexpected Teams messages from external tenants claiming to be helpdesk staff',
      'Mailbox repair or sync utilities delivered through chat links',
      'AutoHotkey execution tied to cloud-hosted payload retrieval',
      'Unapproved browser extensions on Microsoft Edge',
      'Internal hosts exposing suspicious local HTTP listeners on ports 8000 to 8002',
    ],
    relatedIds: [],
  },
  {
    id: 'bitwarden-cli-supply-chain-breach',
    title: 'Bitwarden CLI Supply Chain Breach: How One Compromised Package Could Cascade Across CI/CD Pipelines',
    deck:
      'A malicious Bitwarden CLI package on npm showed how a single compromised developer tool can expose credentials, poison CI/CD workflows, and propagate across downstream repositories.',
    category: 'Supply Chain',
    severity: 'Critical',
    publishedAt: '2026-04-23',
    readTime: '6 min read',
    source: 'Dmytrii Tamurov Cybernews',
    sourceUrl: CYBERNEWS_SITE_URL,
    tags: ['Bitwarden', 'Supply Chain', 'CI/CD', 'npm', 'GitHub Actions', 'Credential Theft'],
    body: [
      {
        heading: 'The entry point was the delivery pipeline, not the product',
        paragraphs: [
          'The malicious npm release, published as @bitwarden/cli@2026.4.0, turned a trusted developer utility into an attack vector. Researchers linked the compromise to a broader campaign targeting software delivery infrastructure rather than the end product itself.',
          'That distinction matters. The attacker did not need to break Bitwarden vault data or production systems to create impact. By compromising the CI/CD path and inserting malicious logic into the distributed package, they moved directly into the trust channel developers and automation systems already rely on.',
        ],
      },
      {
        heading: 'The malware was designed for developer and pipeline environments',
        paragraphs: [
          'Once installed, the package was built to extract high-value material from engineering environments: GitHub and npm tokens, SSH keys, environment variables, shell history, local configuration data, and CI/CD secrets. The targeting was specific to systems where repository access, package publishing, and deployment credentials are concentrated.',
          'The collected data was encrypted before exfiltration and sent to infrastructure masquerading as Checkmarx. Researchers also observed a fallback model that used GitHub as an alternate exfiltration channel, which shows a more resilient and deliberate operation than simple smash-and-grab malware.',
        ],
      },
      {
        heading: 'The highest-risk outcome is recursive compromise across repositories',
        paragraphs: [
          'The danger is not limited to one infected workstation. If GitHub and npm credentials are captured, attackers can inject malicious workflows into repositories, harvest additional secrets during CI/CD execution, and publish more compromised packages into downstream ecosystems.',
          'That creates a repeatable loop: one developer installation becomes multiple repository compromises, which then become broader supply chain distribution. In practice, that means the real blast radius is defined by credential reuse and pipeline trust relationships, not by the short window in which the malicious package was available.',
        ],
      },
      {
        heading: 'This incident reflects a structural shift in security risk',
        paragraphs: [
          'Developer machines and build systems now hold the access attackers want most. Modern software teams centralize source control, package publishing, cloud deployment, and automation in a few trusted environments, so compromising those environments yields disproportionate leverage.',
          'The Bitwarden CLI case is significant because it shows how trusted platforms such as npm and GitHub can become active components in an attack chain. In this model, attackers are no longer just stealing data. They are positioning themselves to replicate across systems before defenders recognize the original breach.',
        ],
      },
    ],
    whyItMatters:
      'This was a high-leverage software supply chain event. A single malicious package had the potential to expose developer credentials, poison automation, and spread into downstream repositories through trusted CI/CD workflows.',
    summary: [
      'The compromise targeted the npm distribution path for Bitwarden CLI rather than Bitwarden production systems or user vault data.',
      'The malicious package focused on harvesting developer and CI/CD credentials, including GitHub tokens, npm tokens, SSH keys, and environment secrets.',
      'The largest risk was post-compromise propagation through injected workflows, credential reuse, and malicious downstream package publishing.',
    ],
    timeline: [
      'Initial compromise: the delivery pipeline or associated automation path is abused to publish a malicious Bitwarden CLI package to npm.',
      'Execution and collection: installing the package triggers credential theft from developer workstations and CI/CD environments.',
      'Amplification: captured GitHub and npm credentials can be used to tamper with repositories, workflows, and downstream packages.',
      'Containment: remove the malicious version, rotate exposed credentials, review workflow integrity, and audit package publishing activity.',
    ],
    analystNote:
      'Supply chain defense now has to treat developer endpoints, package registries, and CI/CD workflows as one security boundary. If one is compromised, assume the attacker will try to turn it into repeatable distribution.',
    indicators: [
      'Unexpected package install hooks',
      'New or modified GitHub Actions workflows',
      'Unrecognized npm publish activity',
      'Secrets uploaded to newly created GitHub repositories',
    ],
    relatedIds: [],
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
