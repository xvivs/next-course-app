import React from 'react';

interface Props {
  params: {
    id: number,
    photoId: number,
  };
}

const UserPhotoPage = ({ params: { id, photoId }}: Props) => {
  return (
    <div>Photo: {photoId}. UserId - {id}</div>
  )
}

export default UserPhotoPage