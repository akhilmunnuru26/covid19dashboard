import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <img
        src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668418611/Group_7485_zfvjsi.png"
        alt="covid error"
        className="covid-error-image"
      />
      <h1 className="not-found-msg">Page Not Found</h1>
      <p className="not-found-description">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <button type="button" className="home-btn">
        <Link className="links" to="/">
          Home
        </Link>
      </button>
    </div>
  </div>
)

export default NotFound
