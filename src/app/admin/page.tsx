'use client'
import React, { useEffect, useState } from 'react'
import RefundForm from './RefundForm'
import { IPolicy } from '@/utils/types/interfaces'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminPage = () => {
  const [policies, setPolicies] = useState<IPolicy[]>([])
  const [showRefundForm, setShowRefundForm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchPolicies = async () => {
    try {
      const response = await fetch('/api/get-policies')
      const data = await response.json()
      if (response.ok) {
        setPolicies(data)
        setError(null)
      } else {
        setError(`Failed to fetch policies: ${data.message}`)
      }
    } catch (error) {
      console.error('Error fetching policies:', error)
      setError('Failed to fetch policies. Please try again.')
    }
  }
  useEffect(() => {
    fetchPolicies()
  }, [])

  useEffect(() => {
    if (showRefundForm === null) {
      refreshPolicies()
    }
  }, [showRefundForm])

  const refreshPolicies = async () => {
    try {
      const response = await fetch('/api/get-policies')
      const data = await response.json()
      if (response.ok) {
        setPolicies(data)
        setError(null)
      } else {
        setError(`Failed to fetch policies: ${data.message}`)
      }
    } catch (error) {
      console.error('Error refreshing policies:', error)
      setError('Failed to refresh policies. Please try again.')
    }
  }

  const handleRefundClick = (policyId: string) => {
    setShowRefundForm(policyId)
  }

  const handleCancelRefund = () => {
    setShowRefundForm(null)
  }

  const handleRefundComplete = () => {
    refreshPolicies()
    setShowRefundForm(null)
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='admin-page-container'>
      <h1 className='admin-page-title'>Admin Page</h1>
      <div className='policy-list'>
        {policies.map((policy) => (
          <div key={policy.id} className='policy-item'>
            <div className='policy-details'>
              <p className='policy-info'>Policy ID: {policy.id}</p>
              <p className='policy-info'>Status: {policy.status}</p>
              {policy.amount && (
                <p className='policy-info'>
                  Amount: ${policy.amount.toFixed(2)}
                </p>
              )}
              <button
                className={`${
                  policy.status === 'refunded' ? 'disabled-btn' : ''
                } refund-button`}
                onClick={() => handleRefundClick(policy.id)}
                disabled={policy.status === 'refunded'}
              >
                Refund
              </button>
            </div>
            {showRefundForm === policy.id && (
              <RefundForm
                policy={policy}
                cancelRefund={handleCancelRefund}
                onRefundComplete={handleRefundComplete}
              />
            )}
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AdminPage
