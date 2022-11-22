import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <img
        src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668418611/Group_7485_zfvjsi.png"
        alt="not-found-pic"
        className="covid-error-image"
      />
      <h1 className="not-found-msg">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found
      </p>
      <Link className="links" to="/">
        <button type="button" className="home-btn">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
