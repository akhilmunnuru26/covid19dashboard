import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-page">
      <div className="footer-logo">
        <h1 className="app-logo">COVID19INDIA</h1>
      </div>

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
