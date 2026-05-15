'use client'

import { useState, FormEvent } from 'react'
import { submitContactForm } from './actions'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
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
      const result = await submitContactForm({ name, email, message })
      
      if (result.error) {
        throw new Error(result.error)
      }

      setSubmitStatus({
        success: true,
        message: 'Thank you! Your message has been sent successfully.'
      })
      
      // Reset form
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        success: false,
        message: 'There was an error sending your message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {submitStatus.message && (
        <div className={`p-4 mb-6 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
        </div>
      )}
                    {/* <form className="flex flex-col gap-4"> */}
                <input type="text" placeholder="Your Name" className="p-2 border-4 rounded-lg border-creoCont-pink text-creoSkin-100 placeholder-creoSkin-300" />
                <input type="email" placeholder="Your Email" className="p-2 border-4 rounded-lg border-creoCont-yellow text-creoSkin-100 placeholder-creoSkin-300" />
                <textarea placeholder="Message" className="p-2 rounded-lg border-4 border-creoCont-purple text-creoSkin-100 placeholder-creoSkin-300" rows={4} />
                <button type="submit" className="px-4 py-2 bg-creoSkin-300 text-creoSkin-400 hover:text-creoSkin-100 rounded-lg font-semibold">
                  Send
                </button>
              {/* </form> */}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            id="name"
            type="text"
            placeholder="Your Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border-4 rounded-lg border-creoCont-pink text-creoSkin-100 placeholder-creoSkin-300"
          />
        
          <input
            id="email"
            placeholder="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border-4 rounded-lg border-creoCont-yellow text-creoSkin-100 placeholder-creoSkin-300" 
          />
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Message"
            className="p-2 rounded-lg border-4 border-creoCont-purple text-creoSkin-100 placeholder-creoSkin-300"
          />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-creoSkin-300 text-creoSkin-400 hover:text-creoSkin-100 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-creoCont-purple ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  )
}