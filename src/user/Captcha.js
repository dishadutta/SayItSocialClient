import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

class Captcha extends Component {
  constructor(props) {
    super(props)

    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    this.state = {
      isVerified: false
    }
  }

  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('You have successfully subscribed!');
    } else {
      alert('Please verify that you are a human!');
    }
  }

  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="App-intro">




          <button
            className="convert"
            onClick={this.handleSubscribe}
          >Subscribe</button>
          <Recaptcha
            sitekey="6Ld-Ha0ZAAAAAGJbSOPh1rjYtgVrxJvIb9w5rwdC"
            render="explicit"
            onloadCallback={this.recaptchaLoaded}
            verifyCallback={this.verifyCallback}
          />
        </div>
      </div>
    );
  }
}

export default Captcha;
