import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { serverUrl } from "../App"

function LiveSite() {
  const [html, setHtml] = useState("")
  const [error, setError] = useState("")
  const { id } = useParams()

  useEffect(() => {
    const handleGetWebsite = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/website/get-by-slug/${id}`,
          { withCredentials: true }
        )

        setHtml(result?.data?.latestCode || "")
      } catch (err) {
        setError("Oops! 404 Site not found")
      }
    }

    handleGetWebsite() 
  }, [id])

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    )
  }

  return (
    <iframe
      title="Live Site"
      srcDoc={html}
      className="w-screen h-screen border-none"
      sandbox="allow-scripts allow-same-origin allow-forms"
    />
  )
}

export default LiveSite