import { useNavigate } from "react-router"
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from "react"
import axios from "axios"
import { serverUrl } from "../App"

const PHASES = [
  "Analyzing your idea...",
  "Designing layout & structure...",
  "Writing HTML, CSS & JS...",
  "Adding animations & interactions...",
  "Final quality checks...",
]

function Generate() {
  const navigate = useNavigate()

  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [error, setError] = useState("")



  useEffect(() => {
    if (!loading) {
      setPhaseIndex(0)
      setProgress(0)
      return
    }

    let value = 0
    let phase = 0
    const intervalId = setInterval(() => {
      let increment = value < 20
        ? Math.random() * 1.5
        : value < 60 ? Math.random() * 1.2
          : Math.random() * 0.6
      value += increment

      if (value >= 93) {
        value = 93;
      }


      phase = Math.min(Math.floor((value / 100) * PHASES.length), PHASES.length - 1)
      setProgress(Math.floor(value))
      setPhaseIndex(phase)
    }, 500)

    return () => clearInterval(intervalId)
  }, [loading])


  const handleGenerateWebsite = async () => {
    if (loading) return
    if (!prompt.trim()) {
      setError("Please describe the website first")
      return
    }
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/website/generate`, { prompt }, { withCredentials: true })
      setLoading(false)
      setProgress(100)
      setPhaseIndex(PHASES.length - 1)
      navigate(`/editor/${result.data.websiteId}`)
    } catch (error) {
      setLoading(false)
      setError(error?.response?.data?.message || "Oops! Something went wrong. Please try again later")
      console.log(error)
    }
  }

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
          <div className="relative max-w-3xl mx-auto">
            <textarea
              onChange={(e) => {
                setPrompt(e.target.value)
                setError("")
              }}
              value={prompt}
              placeholder="Describe your website in detail..."
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20 hover:bg-black/40 transition"
            ></textarea>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">{error}</p>
          )}

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleGenerateWebsite}
              disabled={!prompt.trim() || loading}
              className={`mt-6 px-14 py-4 rounded-2xl font-semibold text-lg ${prompt.trim() && !loading ? "bg-white text-black" : "bg-white/20 text-zinc-400 cursor-not-allowed"
                }`}
            >{loading ? "Generating..." : "Generate Website"}</motion.button>
          </div>

          {progress > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-xl mx-auto mt-12"
            >
              <div className="flex justify-between mb-2 text-xs text-zinc-400">
                <span>{PHASES[phaseIndex]}</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-linear-to-r from-white to-zinc-300" animate={{ width: `${progress}%` }} transition={{ ease: "easeOut", duration: 0.8 }} />
              </div>

              <div className="text-center text-xs text-zinc-400 mt-4">
                Estimated time remaining:{" "}
                <span className="text-white font-medium">~8-12 minutes</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div >
  )
}

export default Generate