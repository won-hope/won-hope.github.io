import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      {/* 1. 히어로 섹션: 아주 심플하게, 핵심만 전달 */}
      <div className="pt-12 pb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          Latest Writings
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{siteMetadata.description}</p>
      </div>

      {/* 2. 게시글 리스트: 구분선 없이 여백으로만 구분 */}
      <div className="pb-20">
        <ul className="space-y-12">
          {!posts.length && <li className="text-gray-500">No posts found.</li>}

          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="group">
                <article className="space-y-3">
                  {/* 메타 정보 (날짜 | 태그) - 작고 회색으로 처리 */}
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <div className="flex gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>

                  {/* 제목 - 마우스 올리면 색상 변경 */}
                  <h2 className="group-hover:text-primary-500 text-2xl leading-tight font-bold text-gray-900 transition-colors duration-200 dark:text-gray-100">
                    <Link href={`/blog/${slug}`} className="block">
                      {title}
                    </Link>
                  </h2>

                  {/* 요약글 - 담백하게 */}
                  <p className="prose line-clamp-2 max-w-none text-gray-500 dark:text-gray-400">
                    {summary}
                  </p>

                  {/* '더보기' 버튼 대신 심플한 텍스트 링크 (선택사항) */}
                  {/* <div className="text-sm font-medium">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Read "${title}"`}
                    >
                      Read more &rarr;
                    </Link>
                  </div> 
                  */}
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 3. 모든 글 보기 버튼 - 우측 하단에 조용히 배치 */}
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end border-t border-gray-200 pt-8 dark:border-gray-700">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex items-center text-base font-medium transition-colors"
            aria-label="All posts"
          >
            All Posts
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      )}
    </>
  )
}
