'use client'

import { useState, FormEvent } from 'react'
import { submitContactForm } from './actions'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({})

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const result = await submitContactForm({ name, email, message, company })
      
      if (result.error) {
        throw new Error(result.error)
      }

      setSubmitStatus({
        success: true,
        message: `Thanks for reaching out. We've received your message and will get back to you soon. Your request ID is ${result.requestId || 'CR-UNKNOWN'}.`
      })
      
      setName('')
      setEmail('')
      setMessage('')
      setCompany('')
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        success: false,
        message: 'We could not send your message right now. Please try again in a moment or email info@creolitos.com directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {submitStatus.message && (
        <div
          className={`mb-6 rounded-md p-4 ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          role="status"
          aria-live="polite"
        >
          {submitStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          id="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-xl border-4 border-creoCont-pink bg-creoCont-pink-soft px-4 py-3 text-creoSkin-100 placeholder-creoSkin-300"
        />
        <input
          id="email"
          placeholder="Your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl border-4 border-creoCont-yellow bg-creoCont-yellow-soft px-4 py-3 text-creoSkin-100 placeholder-creoSkin-300"
        />
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Message"
          className="rounded-xl border-4 border-creoCont-purple bg-creoCont-purple-soft px-4 py-3 text-creoSkin-100 placeholder-creoSkin-300"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`rounded-xl bg-creoCont-pink px-4 py-3 font-semibold text-creoSkin-100 shadow-sm transition-colors hover:bg-creoCont-purple hover:shadow-md focus:outline-none focus:ring-2 focus:ring-creoCont-pink focus:ring-offset-2 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  )
}
