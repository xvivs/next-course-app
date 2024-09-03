'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState('');
  const router = useRouter();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(newPassword !== confirmPassword) {
      setError("Error! Passwords don't match!");
      return;
    }

    const response = await fetch('/api/change-password', {
      method: "POST",
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if(response.status === 200) {
      router.push('/');
    } else {
      const errorBody = await response.json();

      setError(errorBody.error);
    }
  };

  const onOldPasswordChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setOldPassword(e.currentTarget.value);
  };
  const onNewPasswordChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
    setError('');
  };
  const onConfirmPasswordChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
    setError('');
  };
  
  return (
    <form 
      onSubmit={onFormSubmit}
      className='min-w-96 w-1/3 mx-auto mt-10 p-10 border border-solid border-slate-300 rounded space-y-3'
    >
      <h1>Change your password</h1>
      
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Old password</span>
        </div>
        <input 
          type="text" 
          className="input input-bordered w-full max-w-xs"
          value={oldPassword}
          onChange={onOldPasswordChanged}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">New password</span>
        </div>
        <input 
          type="text" 
          className="input input-bordered w-full max-w-xs"
          value={newPassword}
          onChange={onNewPasswordChanged}
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Confirm password</span>
        </div>
        <input 
          type="text" 
          className="input input-bordered w-full max-w-xs"
          value={confirmPassword}
          onChange={onConfirmPasswordChanged}
        />
      </label>

      {error && 
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      }
      <button type="submit" className='btn btn-primary mx-auto block'>Save changes</button>
    </form>
  )
}

export default ChangePasswordForm;