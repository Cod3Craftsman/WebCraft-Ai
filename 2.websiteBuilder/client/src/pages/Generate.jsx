import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'

function Generate() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white">
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button className='p-2 rounded-lg hover:bg-white/10 transition' onClick={() => navigate("/dashboard")}><ArrowLeft size={16} /></button>
            <h1 className='text-lg font-semibold'>WebCraft<span className="text-zinc-400">.Ai</span></h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">Build smarter websites with
            <span className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent ">Real AI Power</span>
          </h1>

          <p className="text-zinc-400 max-w-2xl mx-auto">
            Tell us about the website you want. WebCraft.AI will generate it for you, which may take a few minutes to ensure quality.
          </p>
        </motion.div>

        <div className="mb-14">
          <h1 className="text-xl font-medium mb-2 text-center text-purple-400">Describe your website here</h1>
          <div className="relative ml-40">
            <textarea
              name=""
              id=""
              placeholder="Describe your website in detail..."
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20 hover:bg-black/40 transition"
            ></textarea>
          </div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-14 py-4 rounded-2xl font-semibold text-lg bg-white text-black mt-10 cursor-pointer hover:bg-white/90 transition"
            >Generate Website</motion.button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Generate