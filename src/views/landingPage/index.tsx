import Drop from '@/assets/login/drop.png'
import './index.css'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="landing-page bg-[#F6F6F6] h-svh w-svw relative">
      <img
        src={Drop}
        className="absolute top-20 left-1/2 transform -translate-x-1/2 object-contain"
      />
      <div className="flex justify-center gap-x-4 absolute bottom-[30svh] w-full">
        <div
          className="bg-[#4461F2] text-white px-4 py-1 rounded-3xl"
          onClick={() => navigate('/login')}
        >
          Sign In
        </div>
        <div className="text-[#4461F2] bg-white  px-4 py-1 rounded-3xl">
          Register
        </div>
      </div>
    </div>
  )
}
export default LandingPage
