'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const NewUserPage = () => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push('/users');
  }

  return (
    <div>
      <button className='btn btn-primary' onClick={() => handleSubmit()}>Create</button>
    </div>
  )
}

export default NewUserPage;