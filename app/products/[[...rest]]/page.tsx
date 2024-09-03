import React from 'react';

interface Props {
  params: {
    rest: string[]
  }
}

const Products = ({ params: { rest } }: Props) => {
  

  return (
    <div>Products page - {rest}</div>
  )
}

export default Products;