import React from 'react';
import Link from 'next/link';
import { sort } from 'fast-sort'; 

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: string;
}

const UsersTable = async ({ sortOrder }: Props) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users',
    { 
      cache: 'no-store'
    }
  );
  const users: User[] = await res.json();

  let sortedUsers = users;
  switch(sortOrder) {
    case 'Email': 
      sortedUsers = sort(users).asc(u => u.email);
      break;
    case 'Name': 
      sortedUsers = sort(users).asc(u => u.name);
      break;
    default: 
      sortedUsers = users;
  }

  return (
    <div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>
              <Link href="/users?sortOrder=Name">Name</Link>
            </th>
            <th>
              <Link href="/users?sortOrder=Email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable;