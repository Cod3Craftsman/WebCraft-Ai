import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import axios from "axios"
import { serverUrl } from '../App'
import { useState } from 'react'
function Dashboard() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [websites, setWebsites] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  useEffect(() => {
    const handleGetAllWebsites = async () => {
      setLoading(true)
      try {
        const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
        setWebsites(result.data || [])
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
        setLoading(false)
      }
    }
    handleGetAllWebsites()
  }, [])
  return (
    <div className='min-h-screen bg-[#050505] text-white'>
      {/* header */}
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button className='p-2 rounded-lg hover:bg-white/10 transition' onClick={() => navigate("/")}><ArrowLeft size={16} /></button>
            <h1 className='text-lg font-semibold'>Dashboard</h1>
          </div>
          <button className='px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:scale-105 transition' onClick={() => navigate("/generate")}>+ New Website</button>
        </div>
      </div>

      {/* Greetings to the user */}
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-10'
        >
          <p className='text-sm text-zinc-400 mb-1'>Welcome Back</p>
          <h1 className='text-3xl font-bold'>{userData.name}</h1>
        </motion.div>

        {loading && (
          <div className='mt-24 text-center text-zinc-400'>Loading your websites...</div>
        )}

        {error && !loading && (
          <div className='mt-24 text-center text-red-400'>{error}</div>
        )}

        {
          websites?.length === 1 && (
            <div className='mt-24 text-center text-zinc-400 text-lg font-bold'>Oops! Currently you have no websites</div>
          )
        }

        {!loading && !error && websites?.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
            {websites.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className='rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col'
              >
                <div className='relative h-40 bg-black cursor-pointer'>
                  <iframe srcDoc={w.latestCode} ></iframe>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard