import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { serverUrl } from "../App"
import { ArrowLeft, BackpackIcon, Code2, MessageCircle, MessageSquare, Monitor, Rocket, Send, Square, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Editor from "@monaco-editor/react"
function WebsiteEditor() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [website, setWebsite] = useState(null)
  const [error, setError] = useState("")
  const [code, setCode] = useState("")
  const [messages, setMessages] = useState([])
  const [prompt, setPrompt] = useState("")
  const iframeRef = useRef(null)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [thinkingIndex, setThinkingIndex] = useState(0)
  const controllerRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [showCode, setShowCode] = useState(false)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const thinkingSteps = [
    "Understanding your request...",
    "Planning layout changes...",
    "Improving responsiveness...",
    "Applying animations...",
    "Finalizing updates...",
  ]

  const handleDeploy = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/website/deploy/${website._id}`, { withCredentials: true })
      window.open(`${result.data.url}`, "_blank")
    } catch (error) {
      console.log(error)
    }
  }


  const handleUpdate = async () => {
    if (!prompt) return
    controllerRef.current = new AbortController()
    setUpdateLoading(true)
    const text = prompt
    setPrompt("")
    setMessages((m) => [...m, { role: "user", content: text }])
    try {
      const result = await axios.put(`${serverUrl}/api/website/update/${id}`, { prompt: text }, { withCredentials: true, signal: controllerRef.current.signal })
      setUpdateLoading(false)
      setMessages((m) => [...m, { role: "ai", content: result.data.message }])
      setCode(result.data.code)
    } catch (error) {
      console.log(error)
      setUpdateLoading(false)
    }
  }


  const handleStopUpdate = () => {
    controllerRef.current?.abort()
    controllerRef.current = null
    setUpdateLoading(false)
  }


  useEffect(() => {
    if (!updateLoading) return
    const intervalId = setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % thinkingSteps.length)
    }, 3000)
    return () => clearInterval(intervalId)
  }, [updateLoading])




  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
        setWebsite(result.data)
        setCode(result.data.latestCode)
        setMessages(result.data.conversation || [])
      } catch (error) {
        console.log(error)
        setError(error?.response?.data?.message || "Something went wrong")
      }
    }

    handleGetWebsite()
  }, [id])


  useEffect(() => {
    if (!iframeRef.current || !code) return;
    const blob = new Blob([code], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url

    return () => URL.revokeObjectURL(url)
  }, [code])

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    )
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, updateLoading])


  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    )
  }

  return (

    <div className="h-screen w-screen flex bg-black text-white ">

      {/* left-side */}
      <ArrowLeft size={25} className="rounded-xl mt-5 ml-2 hover:bg-white/10 transition cursor-pointer" onClick={() => navigate("/")} />
      <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80 overflow-y-auto custom-scrollbar">
        <Header onClose={() => setShowChat(false)} />

        {/* chat-section */}
        <>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"
                  }`}>

                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? "bg-white text-black" : "bg-white/5 border border-white/10 text-zinc-200"}`}>
                  {m.content}

                </div>

              </div>
            ))}

            {updateLoading &&
              <div className="max-w-[85%] mr-auto">
                <div className="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-medium text-zinc-400 bg-zinc-900/40 animate-pulse">
                  {thinkingSteps[thinkingIndex]}
                </div>
              </div>
            }
            <div ref={messagesEndRef}></div>
          </div>


          <div className="p-3 border-t border-white/10">
            {/* input box */}
            <div className="flex gap-2">
              <input disabled={updateLoading} onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder="Describe changes..." className="flex-1 rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none" />
              <button onClick={updateLoading ? handleStopUpdate : handleUpdate} className="bg-white px-4 py-3 rounded-2xl text-black hover:bg-white/80 transition cursor-pointer">{updateLoading ? <Square size={18} /> : <Send size={18} />}</button>
            </div>
          </div>
        </>
      </aside>


      {/* right side */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          {/* LIVE PREVIEW */}
          <span className="text-xs text-zinc-400">LIVE PREVIEW</span>
          <div className="flex gap-2">
            {website.deployed ? "" : (
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition" onClick={handleDeploy}><Rocket size={14} />Deploy</button>
            )}
            <button className="lg:hidden p-2 hover:bg-white/10 transition rounded-lg" onClick={() => setShowChat(true)}><MessageSquare size={18} /></button>
            <button className="p-2 hover:bg-white/10 transition rounded-lg" onClick={() => setShowCode(true)}><Code2 size={18} /></button>
            <button className="p-2 hover:bg-white/10 transition rounded-lg" onClick={() => setShowFullPreview(true)}><Monitor size={18} /></button>
          </div>

        </div>
        <iframe ref={iframeRef} className="flex-1 w-full bg-white" />
      </div>


      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col"
          >
            <Header onClose={() => setShowChat(false)} />
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"
                      }`}>

                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? "bg-white text-black" : "bg-white/5 border border-white/10 text-zinc-200"}`}>
                      {m.content}

                    </div>

                  </div>
                ))}

                {updateLoading &&
                  <div className="max-w-[85%] mr-auto">
                    <div className="inline-flex items-center px-4 py-2.5 rounded-2xl text-xs font-medium text-zinc-400 bg-zinc-900/40 animate-pulse">
                      {thinkingSteps[thinkingIndex]}
                    </div>
                  </div>
                }
                <div ref={messagesEndRef}></div>
              </div>


              <div className="p-3 border-t border-white/10">
                {/* input box */}
                <div className="flex gap-2">
                  <input disabled={updateLoading} onChange={(e) => setPrompt(e.target.value)} value={prompt} placeholder="Describe changes..." className="flex-1 rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none" />
                  <button onClick={updateLoading ? handleStopUpdate : handleUpdate} className="bg-white px-4 py-3 rounded-2xl text-black hover:bg-white/80 transition cursor-pointer">{updateLoading ? <Square size={18} /> : <Send size={18} />}</button>
                </div>
              </div>
            </>

          </motion.div>
        )}
      </AnimatePresence>


      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col"
          >
            <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
              <span className="text-sm font-medium">index.html</span>
              <button onClick={() => setShowCode(false)}><X size={18} /></button>
            </div>
            <Editor theme="vs-dark"
              value={code}
              language="html"
              onChange={(v) => setCode(v)}
            />

          </motion.div>)
        }
      </AnimatePresence>





      <AnimatePresence>
        {showFullPreview && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black"
          >
            <iframe className="w-full h-full bg-white" srcDoc={code} sandbox="allow-scripts allow-same-origin allow-forms" />
            <button className="absolute top-4 right-6 p-2 bg-black/70 rounded-lg hover:bg-black/80 transition cursor-pointer" onClick={() => setShowFullPreview(false)}><X size={14} /></button>

          </motion.div>)
        }
      </AnimatePresence>

    </div>
  )

  function Header({ onClose }) {
    return (
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
        <span className="font-semibold truncate text-purple-500">{website.title}</span>
        {onClose && <button onClick={onClose} className="lg:hidden"><X size={18} color="white" /></button>}

      </div>
    )
  }


}




export default WebsiteEditor