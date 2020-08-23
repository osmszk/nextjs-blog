import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'


const postsDirectory = path.join(process.cwd(), 'posts' )

export function getSortedPostsData() {
  // Get file names under /posts
  const fileName = fs.readdirSync(postsDirectory)
  const allPostsData = fileName.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName .replace(/\.md$/, '')
    // Read markdown file as string
    const fullPath = path.json(postsDirectory, fileName)
    const fileConstents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileConstents)

    return {
      id,
      ...matterResult.data
    }
  })

  return allPostsData.sort((a,b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  });
}