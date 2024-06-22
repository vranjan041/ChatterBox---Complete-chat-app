import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversations, setConvesations] = useState([])

  useEffect(() => {
    const getConversations = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/users')
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            setConvesations(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    getConversations()
  },[])
  return {loading, conversations}
}

export default useGetConversations