import { Outlet } from 'react-router-dom'
import Navigation from '../Components/navigation'

export default function Root() {
  return (
    <div className="container">
      <Navigation />
      <Outlet />
    </div>
  )
}
