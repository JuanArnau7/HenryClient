import React from 'react'
import logo from '../Img/loading.gif'

const Loading = ({Visible} )=> {
  return (
    <>
    {Visible?
    <>
    <div className='w-fit h-fit flex flex-col justify-center '>
        <img src={logo} alt='not found'/>
    </div>
    </>
    :
    <></>}
    </>
  )
}


export default Loading