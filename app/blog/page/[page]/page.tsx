import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5
const sortedPosts = allCoreContent(sortPosts(allBlogs))
const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

export const generateStaticParams = async () => {
  return Array.from({ length: totalPages }, (_, i) => ({ 
    page: (i + 1).toString() 
  }))
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  const pageNumber = parseInt(page)

  if (isNaN(pageNumber) || pageNumber <= 0 || pageNumber > totalPages) {
    return notFound()
  }

  const startIndex = POSTS_PER_PAGE * (pageNumber - 1)
  const initialDisplayPosts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={sortedPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}