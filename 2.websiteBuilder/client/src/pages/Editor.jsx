import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { serverUrl } from "../App"
import { Code2, Monitor, Rocket, Send } from "lucide-react"
function Editor() {
  const { id } = useParams()
  const [website, setWebsite] = useState(null)
  const [error, setError] = useState("")
  const iframeRef = useRef(null)


  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
        setWebsite(result.data)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }

    handleGetWebsite()
  }, [id])


  useEffect(() => {
    if (!iframeRef.current || !website?.latestCode) return;
    const blob = new Blob([website?.latestCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url

    return () => URL.revokeObjectURL(url)
  }, [website?.latestCode])

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    )
  }


  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    )
  }

  return (

    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">

      {/* left-side */}
      <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80">
        <Header />
        <Chat />
      </aside>


      {/* right side */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          {/* LIVE PREVIEW */}
          <span className="text-xs text-zinc-400">LIVE PREVIEW</span>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"><Rocket size={14} />Deploy</button>
            <button className="p-2 hover:bg-white/10 transition rounded-lg"><Code2 size={18} /></button>
            <button className="p-2 hover:bg-white/10 transition rounded-lg"><Monitor size={18} /></button>
          </div>

        </div>
        <iframe ref={iframeRef} className="flex-1 w-full bg-white" />
      </div>
    </div>
  )

  function Header() {
    return (
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
        <span className="font-semibold truncate text-purple-500">{website.title}</span>
      </div>
    )
  }

  function Chat() {

    return (
      <>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {website.conversation.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"
                }`}>

              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? "bg-white text-black" : "bg-white/5 border border-white/10 text-zinc-200"}`}>
                {m.content}
              </div>

            </div>
          ))}
        </div>


        <div className="p-3 border-t border-white/10">
          {/* input box */}
          <div className="flex gap-2">
            <textarea rows="1" placeholder="Describe changes..." className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none"></textarea>
            <button className="bg-white px-4 py-3 rounded-2xl text-black hover:bg-white/80 transition cursor-pointer"><Send size={18}/></button>
          </div>
        </div>
      </>
    )
  }
}




export default Editor