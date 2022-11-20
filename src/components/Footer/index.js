import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-page">
      <Link to="/" className="links">
        <div className="footer-logo">
          <span className="app-logo"> COVID19</span>
          <span className="span-logo">INDIA</span>
        </div>
      </Link>
      <p className="motto">
        we stand with everyone fighting on the front lines
      </p>
      <div className="footer-logo-containers">
        <VscGithubAlt className="social-media-icons" />
        <FiInstagram className="social-media-icons" />
        <FaTwitter className="social-media-icons" />
      </div>
    </div>
  )
}
