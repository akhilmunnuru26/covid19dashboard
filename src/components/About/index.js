import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class About extends Component {
  state = {
    lastUpdatedDateTime: '',
    faqData: '',
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getFaqs()
    //   this.getLastUpdatedTime()
  }

  renderApiViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {faqData /* lastUpdatedDateTime */} = this.state

    // const date = new Date(lastUpdatedDateTime)
    // const updatedDate = date.toDateString()
    return (
      <div>
        <h1 className="about-page-main-heading">About</h1>
        {/* <p className="last-updated-time">Last update on {updatedDate}</p> */}
        <h1 className="about-vaccine-distribution">
          COVID-19 vaccines be ready for distribution
        </h1>

        <ul /* testid="faqsUnorderedList" */ className="faqs-container">
          {faqData.map(item => {
            const {qno, question, answer} = item
            const formattedAnswer = answer.split('<a')[0]
            const urlStartIndex = answer.indexOf('https:')
            const urlLastIndex = answer.lastIndexOf('.org')
            const url = answer
              .slice(urlStartIndex, urlLastIndex)
              .split('" target')[0]

            return (
              <li className="faq-item" key={qno}>
                <h1 className="faq-question">{question}</h1>
                <p className="faq-answer">{formattedAnswer}</p>
                <a className="url" href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <h1>Hello</h1>

  renderLoadingView = () => (
    <div /* testid="aboutRouteLoader" */ className="loader-spinner">
      <Loader height={50} width={50} type="Oval" color="#007BFF" />
    </div>
  )

  /* getLastUpdatedTime = async () => {
    const apiUrl = `https://apis.ccbp.in/covid19-state-wise-data/`
    const responseObject = await fetch(apiUrl)
    if (responseObject.ok === true) {
      const dataObject = await responseObject.json()
      const stateObject = dataObject.AP
      const lastUpdatedDateTime = stateObject.meta.last_updated
      this.setState({
        lastUpdatedDateTime,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
*/

  getFaqs = async () => {
    const faqApiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(faqApiUrl)

    if (response.ok === true) {
      const data = await response.json()

      const {faq} = data
      this.setState({
        faqData: faq,
        apiStatus: apiStatusConstants.success,
      })
    } else this.setState({apiStatus: apiStatusConstants.failure})
  }

  render() {
    return (
      <div className="about-page">
        <Header />
        <div className="about-content">
          {this.renderApiViews()}
          <Footer />
        </div>
      </div>
    )
  }
}

export default About
