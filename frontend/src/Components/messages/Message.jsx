import React from 'react'

function Message() {
  return (
    <div className='chat chat-end'>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img 
                    alt = 'Tailwind css chat bubble component'
                    src = 'https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png' />
            </div>
        </div>
        <div className='chat-bubble text-white bg-blue-500'>Hi! whats up?</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
    </div>
  )
}

export default Message