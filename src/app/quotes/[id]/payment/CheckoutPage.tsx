'use client'

import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubcurrency from '@/lib/convertToSubcurrency'
import { createPolicy } from '../action'
import { useRouter } from 'next/navigation'

export type CheckoutProps = {
  amount: number
  quoteId: string
  underwritingDetailsId: string
}

const CheckoutPage = ({
  amount,
  underwritingDetailsId,
  quoteId,
}: CheckoutProps) => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })

        const data = await response.json()

        if (response.ok) {
          setClientSecret(data.clientSecret)
        } else {
          setErrorMessage(data.message || 'Failed to fetch client secret.')
        }
      } catch (error) {
        console.error('Error fetching client secret:', error)
        setErrorMessage('Failed to fetch client secret. Please try again.')
      }
    }

    fetchClientSecret()
  }, [amount])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    if (!stripe || !elements) return

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success`,
        payment_method_data: {
          billing_details: {
            address: {
              country: 'US',
            },
          },
        },
      },
      redirect: 'if_required',
    })

    let status
    let chargeId = ''
    let currency = ''

    if (paymentIntent) {
      chargeId = paymentIntent.id || ''
      currency = paymentIntent.currency || ''
      status = paymentIntent.status || ''

      await createPolicy({
        quoteId,
        underwritingDetailsId,
        status,
        chargeId,
        amount,
        currency,
      })
    }

    if (error) {
      setErrorMessage(error.message)
      router.push('/payment-failure')
    } else {
      router.push(
        `/payment-success?amount=${amount}&quoteId=${quoteId}&underwritingDetailsId=${underwritingDetailsId}`
      )
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className='loading-container'>
        <div className='loading-spinner' role='status'>
          <span className='visually-hidden'></span>
        </div>
      </div>
    )
  }

  const options = {
    fields: {
      billingDetails: {
        address: {
          country: 'never' as const,
        },
      },
    },
  }

  return (
    <form onSubmit={handleSubmit} className='checkout-form'>
      {clientSecret && <PaymentElement options={options} />}
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <button disabled={!stripe || loading} className='pay-button'>
        {!loading ? `Pay $${amount}` : 'Processing...'}
      </button>
    </form>
  )
}

export default CheckoutPage
