import React from 'react';
import Link from 'next/link';
import UsersTable from './UsersTable';

interface Props {
  searchParams: {
    sortOrder: string
  }
};

const UsersPage = ({ searchParams: { sortOrder } }: Props) => {
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className='btn'>ADD USER</Link>
      <UsersTable sortOrder={sortOrder}/>
    </>
  )
}

export default UsersPage;