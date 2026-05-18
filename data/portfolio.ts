export type PortfolioProject = {
  slug: string
  title: string
  shortTitle: string
  date: string
  category: string
  summary: string
  stack: string[]
  outcomes: string[]
  href: string
  externalHref?: string
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'snort-ssh-detection-lab',
    title: 'Snort Intrusion Detection Lab: SSH Traffic Analysis',
    shortTitle: 'Snort SSH Detection Lab',
    date: '2025-08-04',
    category: 'Network Security / NIDS',
    summary:
      'Built a lab with Windows endpoints and a Kali Linux Snort sensor, then wrote and validated a custom rule that detected live SSH traffic inside the LAN.',
    stack: ['Snort 3', 'Kali Linux', 'Windows 11', 'TCP/IP', 'SSH', 'Network Analysis'],
    outcomes: [
      'Created a custom TCP/22 detection rule and confirmed real alerts during a live SSH session.',
      'Documented incident metadata, affected devices, evidence, impact, and remediation steps.',
      'Practiced SOC-style analysis by turning raw detection into a readable security report.',
    ],
    href: '/projects/snort-ssh-detection-lab',
  },
  {
    slug: 'automated-threat-detection-bash',
    title: 'Automated Threat Detection and Log Analysis with Bash',
    shortTitle: 'Bash Threat Detection',
    date: '2026-04-30',
    category: 'Security Automation / Linux',
    summary:
      'Automated Linux authentication log review with Bash, suspicious IP enrichment, dynamic blocking logic, and daily security reporting.',
    stack: ['Bash', 'Linux Auth Logs', 'iptables', 'IP Geolocation', 'GitHub SSH'],
    outcomes: [
      'Parsed authentication logs to identify suspicious access patterns.',
      'Added IP geolocation enrichment and blocking workflow design with iptables.',
      'Generated daily reports to make command-line security findings easier to review.',
    ],
    href: '/projects/automated-threat-detection-bash',
    externalHref: 'https://lnkd.in/gtwPd4pB',
  },
  {
    slug: 'nexessary',
    title: 'Nexessary: Structured Workspace for Real Workflows',
    shortTitle: 'Nexessary',
    date: '2026-03-04',
    category: 'Full-Stack Product Development',
    summary:
      'Designed and built an MVP web application focused on organizing tasks, notes, planning, communication, and documents in one structured workspace.',
    stack: ['Product Design', 'Full-Stack Development', 'Workflow Systems', 'MVP Delivery'],
    outcomes: [
      'Built an early product around real workflow organization instead of disconnected tools.',
      'Designed the platform for task management, collaboration, and structured planning.',
      'Gathered early feedback while continuing to improve core features and interface quality.',
    ],
    href: '/projects/nexessary',
    externalHref: 'https://nexessary.com',
  },
]

export const coreSkills = [
  'SOC analysis',
  'Threat detection',
  'Network security',
  'Linux administration',
  'Security automation',
  'Vulnerability research',
  'Incident documentation',
  'Full-stack development',
]
