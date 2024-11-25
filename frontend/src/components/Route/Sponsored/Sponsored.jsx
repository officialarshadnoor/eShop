import React from 'react'
import styles from '../../../styles/styles'

const Sponsored = () => {
  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}>
      <div className='flex justify-between w-full'>
        <div className='flex items-start'>
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png" style={{width:"150px",objectFit: "contain"}} alt="" />
        </div>
        <div className='flex items-start'>
            <img src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png" style={{width:"150px",objectFit: "contain"}} alt="" />
        </div>
        <div className='flex items-start'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/LG_logo_%282014%29.svg" style={{width:"150px",objectFit: "contain"}} alt="" />
        </div>
        <div className='flex items-start'>
            <img src="https://www.shutterstock.com/image-vector/galati-romania-april-29-2023-600nw-2295394661.jpg" style={{width:"150px",objectFit: "contain"}} alt="" />
        </div>
        <div className='flex items-start'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png" style={{width:"150px",objectFit: "contain"}} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Sponsored
