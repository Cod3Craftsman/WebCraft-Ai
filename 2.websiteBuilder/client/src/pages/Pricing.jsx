import { ArrowLeft, Check, Coins } from "lucide-react"
import { motion } from "motion/react"
import { useNavigate } from "react-router";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect to explore WebCraft.ai",
    features: [
      "AI website generation",
      "Responsive HTML output",
      "Basic animations"
    ],
    popular: false,
    button: "Get Started"
  },
  {
    key: "pro",
    name: "Pro",
    price: "₹299",
    credits: 500,
    description: "Ideal for growing projects",
    features: [
      "Everything in Free",
      "Advanced animations",
      "Priority support"
    ],
    popular: true,
    button: "Upgrade Now"
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "₹1299",
    credits: 5000,
    description: "Custom solutions for large businesses",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations"
    ],
    popular: false,
    button: "Contact Sales"
  }
]
function Pricing() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <button onClick={() => navigate("/")} className="relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg p-2 transition"><ArrowLeft size={20} /></button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center mb-14"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Flexible pricing for every builder</h1>
        <p className="text-zinc-400">Start free, upgrade anytime as your projects grow.</p>
      </motion.div>



      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ y: -14, scale: 1.03 }}
            className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all ${p.popular ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30" : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"}`}
            
          >
            {p.popular && (
              <span className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full bg-indigo-500">Most popular</span>
            )}
            <h1 className="text-xl font-semibold mb-2">{p.name}</h1>
            <p className="text-xs text-zinc-400 mb-6 font-semibold">{p.description}</p>

            <div className="flex items-end gap-1 mb-4">
              <span className="text-4xl font-bold">{p.price}</span>
              <span className="text-zinc-400 mb-1 text-sm">/one-time</span>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <Coins size={18} color="gold" />
              <span className="text-sm font-semibold text-zinc-300">{p.credits} credits</span>
            </div>


            <ul className="space-y-3 mb-10">
              {p.features.map((f) => (
                <li key={f} className="text-zinc-300 flex items-center gap-2 text-sm ">
                  <Check size={18} className="text-green-400" />
                  {f}
                </li>
              ))}
            </ul>


            <motion.button
              whileTap={{scale : 0.96}}
              className={`w-full py-3 rounded-xl font-semibold transition ${p.popular ? "bg-indigo-500 hover:bg-indigo-600" : "bg-white/10 hover:bg-white/20"} disabled:opacity-60`}>{p.button}</motion.button>
          </motion.div>
        ))}
      </div>
    </div>


  )
}

export default Pricing