'use client'

import React, { useState } from 'react'
import NewsLatterBox from './NewsLatterBox'



const Contact = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showFailureMessage, setShowFailureMessage] = useState(false)

  const handleValidation = () => {
    let tempErrors = {}
    let isValid = true

    if (fullname.length <= 0) {
      tempErrors['fullname'] = true
      isValid = false
    }
    if (email.length <= 0) {
      tempErrors['email'] = true
      isValid = false
    }

    if (message.length <= 0) {
      tempErrors['message'] = true
      isValid = false
    }

    setErrors({ ...tempErrors })
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValidForm = handleValidation()
    if (isValidForm) {
      const res = await fetch('/api/sendgrid', {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: 'FitPulse - formularz kontaktowy',
          message: message
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      const { error } = await res.json()
      if (error) {
        setShowSuccessMessage(false)
        setShowFailureMessage(true)
        return
      }
    }
    setShowSuccessMessage(true)
    setShowFailureMessage(false)
  }

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Jesteś zainteresowana/y?
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Wszystkie osoby chcące skorzystać za naszej aplikacji gorąco
                zachęcamy do kontaktu poprzez poniższy formularz.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Imię
                        <small className="font-secondary text-sm text-primary ml-1">
                          *
                        </small>
                      </label>
                      <input
                        name="fullname"
                        required
                        onChange={(e) => {
                          setFullname(e.target.value)
                        }}
                        type="text"
                        placeholder="Jan Nowak"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Email
                        <small className="font-secondary text-sm text-primary ml-1">
                          *
                        </small>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@email.com"
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Wiadomość
                        <small className="font-secondary text-sm text-primary ml-1">
                          *
                        </small>
                      </label>
                      <textarea
                        name="message"
                        required
                        onChange={(e) => {
                          setMessage(e.target.value)
                        }}
                        rows={5}
                        placeholder="Twoja wiadomość"
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      Wyślij
                    </button>
                  </div>
                  {showSuccessMessage && (
                    <p className="mt-2 text-lime-700 w-full px-4">
                      Wiadomość wysłana pomyślnie!
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
