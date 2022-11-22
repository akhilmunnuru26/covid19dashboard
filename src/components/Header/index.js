import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {showNavbarTabs: false}

  showNavbar = () => {
    this.setState({showNavbarTabs: true})
  }

  closeNavbarTabs = () => {
    this.setState({showNavbarTabs: false})
  }

  render() {
    const {showNavbarTabs} = this.state

    return (
      <div>
        <nav className="nav-bar">
          <div className="">
            <Link to="/" className="links">
              <h1 className="app-logo">
                COVID19<span className="span-logo">INDIA</span>
              </h1>
            </Link>
          </div>

          <div className="mobile-icon">
            <button
              type="button"
              className="menu-button"
              onClick={this.showNavbar}
            >
              <img
                src="https://res.cloudinary.com/dstuhdad3/image/upload/v1667988573/add-to-queue_1-12_k0qunm.png"
                className="hamburger-menu-icon"
                alt="hamburgerMenuIcon"
              />
            </button>
          </div>
          <ul className="desktop-section">
            <li className="desktop-nav-link-items">
              <Link className="links" to="/">
                Home
              </Link>
            </li>
            <li className="desktop-nav-link-items">
              <Link className="links" to="/about">
                About
              </Link>
            </li>
          </ul>
        </nav>
        {showNavbarTabs && (
          <div className="nav-links-tabs-section">
            <div className="nav-bar-tabs-container">
              <ul className="nav-links-container">
                <li className="nav-link-items">
                  <Link className="links" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-link-items">
                  <Link className="links" to="/about">
                    About
                  </Link>
                </li>
              </ul>
              <div>
                <button
                  className="close-button"
                  onClick={this.closeNavbarTabs}
                  type="button"
                >
                  <img
                    src="https://res.cloudinary.com/dstuhdad3/image/upload/v1668066322/Solid_lgj73h.png"
                    alt="close icon"
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Header
