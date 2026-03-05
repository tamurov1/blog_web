export interface BlogNode {
  id: string
  title: string
  path?: string
  author?: string
  date?: string
  children?: BlogNode[],
}

// STRUCTURE: 
//   id: 'id',
//   title: 'title',
//   path: '/blog/id',
//   children: [
        // {
        //   id: 'id',
        //   title: 'title',
        //   path: '/blog/parent-id/id',
        //   author: 'author',
        //   date: 'date',
        // },

//   ],


export const blogGraph: BlogNode = {

  id: 'everything',
  title: 'Everything',
  children: [
    {
      id: 'projects',
      title: 'Projects',
      children: [
        {
          id: 'nexessary',
          title: 'Nexessary: Building a Structured Workspace for Real Workflows',
          path: '/blog/projects/nexessary/',
          author: 'Dmytrii Tamurov',
          date: '2026-03-04',
        },
      ],
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      children: [
        {
          id: 'vulnerabilities',
          title: 'Vulnerabilities',
          author: 'Dmytrii Tamurov',
          date: '2025-07-07',
          children: [
            {
              id: 'research',
              title: 'Research',
              children: [
                {
                  id: 'critical-node.js-vulnerabilities-209210',
                  title: 'Critical Node.js Vulnerabilities (CVE-2025-27209 & CVE-2025-27210)',
                  path: '/blog/cybersecurity/vulnerabilities/research/critical-node-js-vulnerabilities-209210/',
                  author: 'Dmytrii Tamurov',
                  date: '2025-07-17',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'thoughts-journal',
      title: 'Thoughts Journal',
      children: [
        {
          id: 'paradox-of-good-and-bad',
          title: 'The Paradox of Good and Bad',
          path: '/blog/thoughts-journal/paradox-of-good-and-bad/',
          author: 'Dmytrii Tamurov',
          date: '2026-03-05',
        },
      ],
    },
  ]
};
