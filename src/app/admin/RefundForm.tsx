'use client'
import React, { useState } from 'react'
import { RefundFormProps } from '@/utils/types/interfaces'
import { toast } from 'react-toastify'

const RefundForm: React.FC<RefundFormProps> = ({
  policy,
  cancelRefund,
  onRefundComplete,
}) => {
  const [amount, setAmount] = useState(
    policy.amount ? policy.amount.toFixed(2) : '250.00'
  )
  const [reason, setReason] = useState('select')
  const [note, setNote] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/refund-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          policyId: policy.id,
          amount: parseFloat(amount),
          reason,
          charge: policy.chargeId,
          note,
        }),
      })

      const result = await response.json()
      if (result.success) {
        toast.success('Refund successful')
        onRefundComplete()
        cancelRefund()
      } else {
        toast.error('Refund failed: ' + result.error)
      }
    } catch (error) {
      console.log('Error: ' + error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='refund-form'>
      <div className='card'>
        <div className='refund-text'>Refund Payment</div>
        <div className='dialog-content'>
          <label className='refund-text'>
            Refunds take 5-10 days to appear on a customer&apos;s statement.
            Stripe&apos;s fees for the original payment won&apos;t be returned,
            but there are no additional fees for the refund.{' '}
            <a
              href='https://support.stripe.com/questions/understanding-fees-for-refunded-payments'
              target='_blank'
              rel='noopener noreferrer'
            >
              Learn more
            </a>
            .
          </label>
          <div className='form-layout'>
            <div className='fieldset'>
              <label>Refund Amount</label>
              <input
                type='number'
                min='0.00'
                step='0.01'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='text-input'
                placeholder='Amount'
                required
                disabled
              />
            </div>
            <div className='fieldset'>
              <label>Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className='select-input'
                required
              >
                <option value='select'>Select a reason</option>
                <option value='duplicate'>Duplicate</option>
                <option value='fraudulent'>Fraudulent</option>
                <option value='requested_by_customer'>
                  Requested by customer
                </option>
                <option value='other'>Other</option>
              </select>
            </div>
            <div className='fieldset'>
              <label>Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className='text-area'
                placeholder='Add a reason for this refund.'
              />
            </div>
          </div>
        </div>
        <div className='dialog-footer'>
          <button
            type='button'
            className='button cancel'
            onClick={cancelRefund}
          >
            Cancel
          </button>
          <button type='submit' className='button submit'>
            Refund
          </button>
        </div>
      </div>
    </form>
  )
}

export default RefundForm
