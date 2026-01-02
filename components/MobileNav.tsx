'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current)
      } else {
        // Prevent scrolling
        disableBodyScroll(navRef.current)
      }
      return !status
    })
  }

  useEffect(() => {
    return () => clearAllBodyScrollLocks()
  }, [])

  return (
    <>
      {/* 1. 햄버거 메뉴 버튼 */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="rounded-md p-2 transition-colors hover:bg-gray-100 sm:hidden dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false} className="relative z-[60]">
          {/* 2. 뒷배경 (Overlay): 어둡게 처리 + 블러 효과 */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          </TransitionChild>

          {/* 3. 슬라이딩 패널 (Menu Content) */}
          <div className="fixed inset-0 flex justify-end">
            <TransitionChild
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
              unmount={false}
            >
              {/* 디자인 변경 포인트: 
                  - w-full 대신 max-w-xs (너무 넓지 않게)
                  - bg-white/90 + backdrop-blur (유리 효과)
                  - shadow-2xl (깊이감 추가)
              */}
              <DialogPanel className="relative h-full w-full max-w-xs bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-gray-950/90">
                {/* 닫기 버튼 영역 */}
                <div className="flex justify-end p-5">
                  <button
                    className="rounded-md p-2 text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                    aria-label="Toggle Menu"
                    onClick={onToggleNav}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-8 w-8"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* 메뉴 링크 영역 */}
                <nav ref={navRef} className="flex flex-col space-y-6 px-8 pt-4">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="hover:text-primary-500 dark:hover:text-primary-400 text-2xl font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100"
                      onClick={onToggleNav}
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>

                {/* 하단 장식 (선택 사항) */}
                <div className="absolute bottom-10 left-0 w-full px-8 text-center">
                  <p className="text-xs text-gray-400">Designed by Hope</p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
