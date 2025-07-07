export interface BlogNode {
  id: string
  title: string
  path: string
  author?: string
  date?: string
  children?: BlogNode[]
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

  id: 'cybersecurity',
  title: 'Cybersecurity',
  children: [
        {
          id: 'empty yet',
          title: 'empty yet',
          path: '/blog/empty-yet',
          author: 'Dmytrii Tamurov',
          date: '2025-07-07',
        },
  ],
}
