'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { motion, useReducedMotion } from 'motion/react'
import { CheckCircle, WarningCircle, CircleNotch, ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { submitEnquiry, type EnquiryState } from '../../app/actions/enquiry'
import { capabilities } from '../../content/capabilities'
import { sectors } from '../../content/sectors'

const initial: EnquiryState = { status: 'idle' }

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn btn-primary form__submit" disabled={pending} data-cursor="cta">
      {pending ? (
        <>
          <CircleNotch size={17} weight="bold" className="spin" aria-hidden="true" />
          Sending
        </>
      ) : (
        <>
          Request the assessment
          <ArrowRight size={17} weight="bold" aria-hidden="true" />
        </>
      )}
    </button>
  )
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^(\+?27|0)[\s-]?\d{2}[\s-]?\d{3}[\s-]?\d{4}$/

/** Mirrors the server rules so a mistake is caught on blur, not on submit. */
function checkField(name: string, value: string): string | null {
  const trimmed = value.trim()
  if (name === 'contactName' && !trimmed) return 'Tell us who to ask for.'
  if (name === 'email') {
    if (!trimmed) return 'We need an email address to send the quotation to.'
    if (!EMAIL.test(trimmed)) return 'That email address does not look complete.'
  }
  if (name === 'phone') {
    if (!trimmed) return 'A telephone number lets us confirm the site visit quickly.'
    if (!PHONE.test(trimmed)) return 'Use a South African number, for example 082 123 4567.'
  }
  if (name === 'message' && !trimmed) return 'Describe what is failing, even in one line.'
  return null
}

export function AssessmentForm({ source = 'site-assessment' }: { source?: string }) {
  const [state, action] = useActionState(submitEnquiry, initial)
  const [live, setLive] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)
  const calm = useReducedMotion()

  const errors = { ...(state.status === 'error' ? (state.fieldErrors ?? {}) : {}), ...live }

  // After a failed submit, put the caret in the first field that needs work.
  useEffect(() => {
    if (state.status !== 'error' || !state.fieldErrors) return
    const first = Object.keys(state.fieldErrors)[0]
    const node = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)
    node?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <motion.div
        className="form__done"
        role="status"
        initial={calm ? false : { opacity: 0, transform: 'translate3d(0, 12px, 0)' }}
        animate={{ opacity: 1, transform: 'translate3d(0, 0px, 0)' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="form__done-icon" aria-hidden="true">
          <CheckCircle size={26} weight="fill" />
        </span>
        <h2 className="display-3">That is with us.</h2>
        <p>
          Your enquiry reference is <strong>{state.reference}</strong>. Someone will call you to
          arrange the site visit, normally within one working day.
        </p>
        <p className="form__done-note">
          If it is urgent, call 063 432 9337 and quote the reference rather than waiting for us.
        </p>
      </motion.div>
    )
  }

  const fieldProps = (name: string) => ({
    name,
    id: name,
    'aria-invalid': Boolean(errors[name]) || undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    // Validate on blur, never on keystroke: correcting someone mid-word is
    // the fastest way to make a form feel hostile.
    onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const problem = checkField(name, event.target.value)
      setLive((prev) => {
        const next = { ...prev }
        if (problem) next[name] = problem
        else delete next[name]
        return next
      })
    },
  })

  return (
    <form ref={formRef} action={action} className="form" noValidate>
      <input type="hidden" name="source" value={source} />

      {/* Honeypot. Off-screen rather than display:none so bots still see it. */}
      <div className="form__trap" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && !state.fieldErrors && (
        <p className="form__banner" role="alert">
          <WarningCircle size={17} weight="fill" aria-hidden="true" />
          {state.message}
        </p>
      )}

      <div className="form__row">
        <div className="field">
          <label className="field__label" htmlFor="contactName">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('contactName')}
            className="input"
            type="text"
            autoComplete="name"
            required
          />
          {errors.contactName && (
            <p className="field__error" id="contactName-error">
              <WarningCircle size={14} weight="fill" aria-hidden="true" />
              {errors.contactName}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="organisation">
            Company or complex
          </label>
          <input
            {...fieldProps('organisation')}
            className="input"
            type="text"
            autoComplete="organization"
          />
          <p className="field__hint">Optional. Helps us send the right person.</p>
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label className="field__label" htmlFor="email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('email')}
            className="input"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
          />
          {errors.email && (
            <p className="field__error" id="email-error">
              <WarningCircle size={14} weight="fill" aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="phone">
            Telephone <span aria-hidden="true">*</span>
          </label>
          <input
            {...fieldProps('phone')}
            className="input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="082 123 4567"
            required
          />
          {errors.phone ? (
            <p className="field__error" id="phone-error">
              <WarningCircle size={14} weight="fill" aria-hidden="true" />
              {errors.phone}
            </p>
          ) : (
            <p className="field__hint">We call before we email.</p>
          )}
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label className="field__label" htmlFor="siteLocation">
            Where is the site
          </label>
          <input
            {...fieldProps('siteLocation')}
            className="input"
            type="text"
            autoComplete="address-level2"
            placeholder="Suburb or street"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="sectorType">
            Type of building
          </label>
          <select {...fieldProps('sectorType')} className="select" defaultValue="">
            <option value="">Select one</option>
            {sectors.map((sector) => (
              <option key={sector.slug} value={sector.name}>
                {sector.name}
              </option>
            ))}
            <option value="Other">Something else</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="service">
          What do you think you need
        </label>
        <select {...fieldProps('service')} className="select" defaultValue="">
          <option value="">Not sure yet, come and look</option>
          {capabilities.map((capability) => (
            <option key={capability.slug} value={capability.name}>
              {capability.name}
            </option>
          ))}
        </select>
        <p className="field__hint">
          Not sure is a perfectly good answer. Diagnosing it is part of the visit.
        </p>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="message">
          What is happening on site <span aria-hidden="true">*</span>
        </label>
        <textarea
          {...fieldProps('message')}
          className="textarea"
          rows={5}
          placeholder="Water coming through the ceiling on the top floor after heavy rain. Roughly 400 square metres of flat roof, last done about six years ago."
          required
        />
        {errors.message ? (
          <p className="field__error" id="message-error">
            <WarningCircle size={14} weight="fill" aria-hidden="true" />
            {errors.message}
          </p>
        ) : (
          <p className="field__hint">
            Rough sizes, when it started and what has already been tried all shorten the visit.
          </p>
        )}
      </div>

      <Submit />

      <p className="form__legal">
        Your details are used to arrange the visit and prepare a quotation, and for nothing else.
        See <a href="/privacy">privacy and data</a>.
      </p>
    </form>
  )
}
