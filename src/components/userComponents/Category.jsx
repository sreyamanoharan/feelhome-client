import React from 'react'
import homestay from '../../../src/images/homestay.jpg'

const Category = () => {
  return (
   <>
   <div className="flex flex-row space-x-6">
    <div className="card card-compact w-96 bg-base-100 shadow-xl mt-6 ml-6">
    <figure><img src={homestay} alt="Shoes" /></figure>
    <div className="card-body">
      <h2 className="card-title">Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
    
    </div>
  </div>
  <div className="card card-compact w-96 bg-base-100 shadow-xl mt-6 ml-6">
  <figure><img src={homestay} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
  
  </div>
</div>
<div className="card card-compact w-96 bg-base-100 shadow-xl mt-6 ml-6">
<figure><img src={homestay} alt="Shoes" /></figure>
<div className="card-body">
  <h2 className="card-title">Shoes!</h2>
  <p>If a dog chews shoes whose shoes does he choose?</p>

</div>
</div>
<div className="card card-compact w-96 bg-base-100 shadow-xl mt-6 ml-6">
<figure><img src={homestay} alt="Shoes" /></figure>
<div className="card-body">
  <h2 className="card-title">Shoes!</h2>
  <p>If a dog chews shoes whose shoes does he choose?</p>
 
</div>
</div>
</div>

  </>


  )
}

export default Category