import './index.css'

import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer-page">
      <h1 className="footer-logo">
        COVID19<span className="span-logo">INDIA</span>
      </h1>
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
