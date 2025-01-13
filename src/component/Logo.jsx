import React from 'react'
import { useSelector } from 'react-redux';


function Logo() {
  const theme = useSelector((store) => store.theme.theme);
  return (
    <div className='w-9 h-9 '>
      <img src={theme === 'light' ? `https://res.cloudinary.com/vipeocloud/image/upload/v1736617787/logoblack_qkgs1x.png` :`https://res.cloudinary.com/vipeocloud/image/upload/v1736617787/logowhite_cjq8ba.png`}/>
    </div>
  )
}

export default Logo