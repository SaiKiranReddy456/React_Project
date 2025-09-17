import {Link} from "react-router-dom"

const Sidebar = () => {
  return (
    <div id="sidebar">
      <Link to="managehospitals">Add Hospital</Link>
      <Link to="managedoctors">Add Doctor</Link>
      <Link to="appointments">Appointments</Link>

    </div>
  )
}

export default Sidebar
