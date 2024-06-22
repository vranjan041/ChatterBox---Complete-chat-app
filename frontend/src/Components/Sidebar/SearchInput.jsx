import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../Hooks/useGetConversations';
import toast from 'react-hot-toast';

function SearchInput() {
  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversation()
  const { conversations } = useGetConversations()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!search) return
    if(search.length < 3){
      return toast.error("Search term must be atleast 3 characters long")
    }

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConversation(conversation)
      setSearch('')
    }
    else toast.error("No such user found")
  }

  return (
    <form className='flex items-center gap-2'
      onSubmit={handleSubmit}>
      <input type='text' placeholder='Search' className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoIosSearch className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput

// import React from 'react'
// import { IoIosSearch } from "react-icons/io";

// function SearchInput() {
//   return (
//     <div className='flex items-center gap-2'>
//         <input type='text' placeholder='Search' className='input input-bordered rounded-full' />
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//             <IoIosSearch className='w-6 h-6 outline-none'/>
//         </button>
//     </div>
//   )
// }

// export default SearchInput