'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const onEmailValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onNameValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onFormSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });


    const body = await response.json();

    if (body && response.status === 200) {
      router.push('/api/auth/signin');
    }
  };

  return (
    <form
      className='min-w-96 w-2/4 mx-auto mt-10 p-10 border border-solid border-slate-300 rounded flex-col space-y-3'
      onSubmit={onFormSubmitted}
    >
      
      <label className='input input-bordered flex items-center gap-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path
            fillRule='evenodd'
            d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
            clipRule='evenodd'
          />
        </svg>
        <input
          type='password'
          className='grow'
          value={password}
          onChange={onPasswordValueChanged}
        />
      </label>
      <button className='btn self-center btn-primary' type='submit'>
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
