import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// 1. 기존 Logo(SVG) import를 삭제하고, Next.js Image 컴포넌트를 가져옵니다.
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'flex items-center w-full justify-between py-2 border-b border-transparent transition-all duration-300'

  if (siteMetadata.stickyNav) {
    headerClass +=
      ' sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-950/80 border-gray-200 dark:border-gray-800 shadow-sm'
  } else {
    headerClass += ' bg-white dark:bg-gray-950'
  }

  return (
    <header className={headerClass}>
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        {/* 로고 영역 */}
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="group flex items-center justify-between">
            {/* 2. 이미지 컨테이너: 크기 고정 */}
            <div className="mr-3 h-8 w-8 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
              {/* 3. SVG 대신 PNG 이미지 사용 */}
              <Image
                src="/static/images/hope.png" // 👈 요청하신 이미지 경로
                alt="Hope Won Logo"
                width={40} // 10 * 4px = 40px (화질 확보용)
                height={40}
                className="h-full w-full rounded-full object-cover" // rounded-full: 원형으로 만듦 (네모가 좋으면 삭제)
                priority // 로고는 중요하므로 우선 로딩
              />
            </div>

            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hover:text-primary-500 hidden h-6 text-lg leading-6 font-bold text-gray-900 transition-colors sm:block dark:text-gray-100">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>

        {/* 메뉴 영역 (기존 유지) */}
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
          <div className="no-scrollbar hidden max-w-40 items-center gap-x-6 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:text-primary-500 dark:hover:text-primary-400 after:bg-primary-500 relative text-sm font-medium text-gray-700 transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:content-[''] hover:after:origin-bottom-left hover:after:scale-x-100 dark:text-gray-300"
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <div className="flex items-center gap-2">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
