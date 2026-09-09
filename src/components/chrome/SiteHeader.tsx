'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { List, X, Phone } from '@phosphor-icons/react/dist/ssr'

import { DainamoLockup } from '../brand/DainamoLockup'
import { company, nav, PRIMARY_CTA } from '../../lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const calm = useReducedMotion()

  // IntersectionObserver instead of a scroll listener: no per-frame work.
  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel')
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting), {
      rootMargin: '0px',
      threshold: 0,
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="site-header" data-lifted={lifted || undefined}>
        <div className="site-header__inner shell">
          <Link href="/" className="site-header__brand" aria-label="Dainamo Holdings, home">
            <DainamoLockup width={188} tone="light" />
          </Link>

          <nav className="site-header__nav" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="site-header__link"
                  data-active={active || undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="site-header__actions">
            <a
              className="site-header__phone"
              href={`tel:${company.phones[0].tel}`}
              data-cursor="link"
            >
              <Phone size={16} weight="fill" aria-hidden="true" />
              <span>{company.phones[0].number}</span>
            </a>
            <Link href={PRIMARY_CTA.href} className="btn btn-primary site-header__cta" data-cursor="cta">
              {PRIMARY_CTA.label}
            </Link>
            <button
              type="button"
              className="site-header__toggle"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={calm ? { opacity: 0 } : { opacity: 0, transform: 'translate3d(0, -12px, 0)' }}
            animate={calm ? { opacity: 1 } : { opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
            exit={calm ? { opacity: 0 } : { opacity: 0, transform: 'translate3d(0, -8px, 0)' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mobile-menu__nav" aria-label="Primary, mobile">
              {nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
                  animate={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
                  transition={{ duration: 0.32, delay: 0.04 * index, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={item.href} className="mobile-menu__link">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <Link href={PRIMARY_CTA.href} className="btn btn-primary">
                {PRIMARY_CTA.label}
              </Link>
              <a className="mobile-menu__phone" href={`tel:${company.phones[0].tel}`}>
                {company.phones[0].number}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
