import { AnimatePresence, motion } from "motion/react"
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react"
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router";
function Home() {

  const highlights = [
    { id: "ai-builder", title: "AI-Powered Builder", description: "Create websites effortlessly with smart AI tools." },
    { id: "responsive", title: "Responsive Design", description: "Your site looks perfect on any device." },
    { id: "launch", title: "Launch Instantly", description: "Go live in minutes without code." },
  ];

  const [openLogin, setOpenLogin] = useState(false)

  const { userData } = useSelector(state => state.user)
  const [openProfile, setOpenProfile] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials : true})
      dispatch(setUserData(null))
      setOpenProfile(false)
    } catch (error) {
      console.log("handleLogout error: ", error)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      {/* HEADER */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">
            WebCraft AI
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer" onClick={()=>navigate("/pricing")}>Pricing</div>

            {/* CREDITS */}
            {userData &&
              <div onClick={()=>navigate("/pricing")} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
                <Coins size={14} className="text-yellow-400" />
                <span className="text-zinc-400">Credits: </span>
                <span>{userData.credits}</span>
                <span className="font-semibold">+</span>
              </div>
            }


            {!userData ?
              <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm transition" onClick={() => setOpenLogin(true)}>Get Started</button>
              :
              <div className="relative">
                <button className="flex items-center cursor-pointer" onClick={() => setOpenProfile(!openProfile)}>
                  <img referrerPolicy="no-referrer" src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt="avatar" className="w-9 h-9 rounded-full border border-white/20 object-cover" />
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium truncate">{userData.name}</p>
                          <p className="text-xs text-zinc-500 truncate">{userData.email}</p>
                        </div>



                        <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5 transition">
                          <Coins size={14} className="text-yellow-400" />
                          <span className="text-zinc-400">Credits: </span>
                          <span>{userData.credits}</span>
                          <span className="font-semibold">+</span>
                        </button>


                        <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 transition cursor-pointer" onClick={()=>navigate("/dashboard")}>Dashboard</button>
                        <button className="w-full px-4 py-3 text-center text-sm text-red-400 hover:bg-white/5 hover:text-red-700 transition cursor-pointer" onClick={handleLogout}>Logout</button>

                      </motion.div>

                    </>
                  )}
                </AnimatePresence>
              </div>

            }



          </div>





        </div>
      </motion.div>

      {/* HERO SECTION */}
      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >
          Your Website, Crafted by<br></br>
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">WebCraft AI</span>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg font-semibold tracking-wide"
          >
            Build stunning websites in minutes with AI.
            Fast, simple, and code-free — your ideas, online instantly.
          </motion.p>
        </motion.h1>


        <motion.button
          initial={{ y: 190, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-10 py-4  rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12 cursor-pointer" onClick={()=>navigate("/dashboard")}>{userData ? "Go to Dashboard" : "Get Started"}</motion.button>
      </section>

      {/* CARD SECTION (HIGHLIGHTS) */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {highlights.map((h) => (
            <motion.div key={h.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 m-4"
            >
              <h1 className="text-xl font-semibold mb-3">{h.title}</h1>
              <p className="text-sm text-zinc-400">{h.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} WebCraft AI
      </footer>

      {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}

    </div>
  )
}

export default Home