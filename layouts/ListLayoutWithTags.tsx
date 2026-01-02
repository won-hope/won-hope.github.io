'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

// 페이지네이션 컴포넌트 (심플하게 유지)
function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between text-sm font-medium">
        {!prevPage && (
          <button className="cursor-auto text-gray-400 disabled:opacity-50" disabled={!prevPage}>
            &larr; Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-primary-500 hover:text-primary-600"
          >
            &larr; Previous
          </Link>
        )}
        <span className="text-gray-500">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto text-gray-400 disabled:opacity-50" disabled={!nextPage}>
            Next &rarr;
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-primary-500 hover:text-primary-600"
          >
            Next &rarr;
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="pt-10">
        {/* 모바일용 타이틀 (화면 작을 때만 보임) */}
        <div className="pb-6 sm:hidden">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h1>
        </div>

        <div className="flex sm:space-x-12">
          {' '}
          {/* 간격 조정 space-x-24 -> space-x-12 */}
          {/* 1. 사이드바 영역: 회색 박스 제거 -> 깔끔한 Sticky 메뉴로 변경 */}
          <div className="hidden h-full max-h-screen max-w-[240px] min-w-[240px] flex-wrap overflow-auto rounded pt-5 sm:flex">
            <div className="w-full px-2 py-4">
              {' '}
              {/* padding 줄임 */}
              {/* All Posts 버튼 */}
              <div className="mb-6">
                {pathname.startsWith('/blog') && !pathname.includes('/tags/') ? (
                  <h3 className="text-primary-600 border-primary-500 border-l-4 pl-3 text-sm font-bold tracking-wider uppercase">
                    All Posts
                  </h3>
                ) : (
                  <Link
                    href={`/blog`}
                    className="hover:text-primary-600 block border-l-4 border-transparent pl-4 text-sm font-medium tracking-wider text-gray-500 uppercase transition-all hover:border-gray-300"
                  >
                    All Posts
                  </Link>
                )}
              </div>
              {/* 태그 리스트 */}
              <ul>
                {sortedTags.map((t) => {
                  const isSelected = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                  return (
                    <li key={t} className="my-2">
                      {isSelected ? (
                        <h3 className="text-primary-600 border-primary-500 bg-primary-50/50 dark:bg-primary-900/10 inline-block w-full rounded-r-md border-l-4 py-1 pl-3 text-sm font-bold uppercase">
                          {t} <span className="ml-1 text-xs opacity-80">({tagCounts[t]})</span>
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="hover:text-primary-600 inline-block w-full border-l-4 border-transparent py-1 pl-4 text-sm font-medium text-gray-500 uppercase transition-all hover:border-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {t} <span className="ml-1 text-xs text-gray-400">({tagCounts[t]})</span>
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          {/* 2. 메인 게시글 리스트 영역 */}
          <div className="w-full">
            <ul className="space-y-10">
              {' '}
              {/* 간격 넓힘 space-y-5 -> 10 */}
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="group py-2">
                    <article className="flex flex-col space-y-3">
                      {/* 메타 정보 (날짜 | 태그) - Home과 통일 */}
                      <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date} className="text-gray-400">
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <div className="flex gap-2">
                          {tags?.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>

                      {/* 제목 */}
                      <h2 className="text-2xl leading-8 font-bold tracking-tight">
                        <Link
                          href={`/${path}`}
                          className="group-hover:text-primary-500 text-gray-900 transition-colors dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>

                      {/* 요약 */}
                      <div className="prose line-clamp-2 max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
