import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'
import { slug } from 'github-slugger' // 👈 태그 링크 생성을 위해 필요 (템플릿에 기본 내장됨)

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  // ---------------------------------------------------------
  // 🏆 태그 랭킹 로직 (자동 계산)
  // ---------------------------------------------------------
  const tagCounts = {}

  posts.forEach((post) => {
    // draft(초안)가 아닌 글의 태그만 카운트
    if (post.tags && post.draft !== true) {
      post.tags.forEach((tag) => {
        // 태그 이름을 키(key)로 하여 개수 증가
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  // 개수가 많은 순서(내림차순)로 정렬
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  // 상위 7개만 추출
  const topTags = sortedTags.slice(0, 7)
  // ---------------------------------------------------------

  return (
    <>
      {/* 1. 히어로 섹션 */}
      <div className="flex flex-col-reverse items-start justify-between gap-8 pt-12 pb-10 sm:flex-row sm:items-center">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
            Latest Writings
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        {/* 호푸 이미지 */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-lg sm:h-32 sm:w-32 dark:border-gray-800">
          <Image
            src="/static/images/hope.png"
            alt="Hope and Ho-pu"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 2. ✨ Trending Topics (랭킹 로직 + 고급 디자인 적용) */}
      {topTags.length > 0 && (
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2">
            {/* 섹션 타이틀: 작고 세련되게 */}
            <span className="bg-primary-500 h-1 w-1 rounded-full"></span>
            <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              Trending Topics
            </h3>
          </div>

          <div className="flex flex-wrap gap-3">
            {topTags.map((t) => (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="group hover:border-primary-400 dark:hover:border-primary-500 relative flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200"
              >
                {/* 태그 이름 */}
                <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 relative z-10 transition-colors">
                  {t}
                </span>

                {/* 게시글 개수 (Badge) */}
                <span className="group-hover:bg-primary-100 group-hover:text-primary-600 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400 ml-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gray-100 px-1.5 text-[10px] font-bold text-gray-500 transition-colors dark:bg-gray-700 dark:text-gray-400">
                  {tagCounts[t]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 3. 게시글 리스트 */}
      <div className="border-t border-gray-100 pt-10 pb-10 dark:border-gray-800">
        <ul className="space-y-12">
          {!posts.length && <li className="text-gray-500">No posts found.</li>}

          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="group">
                <article className="-mx-4 flex flex-col gap-2 rounded-2xl p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {/* 메타 정보 */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={date} className="font-medium">
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>

                  {/* 제목 */}
                  <h2 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-2xl leading-tight font-bold text-gray-900 transition-colors dark:text-gray-100">
                    <Link href={`/blog/${slug}`} className="block">
                      {title}
                    </Link>
                  </h2>

                  {/* 요약 */}
                  <p className="prose line-clamp-2 max-w-none text-gray-500 dark:text-gray-400">
                    {summary}
                  </p>

                  {/* 하단 태그 (작게) */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 4. 하단 버튼 및 뉴스레터 */}
      <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-10 dark:border-gray-700">
        {posts.length > MAX_DISPLAY ? (
          <Link
            href="/blog"
            className="group text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-2 text-base font-semibold"
          >
            All Posts
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </>
  )
}
