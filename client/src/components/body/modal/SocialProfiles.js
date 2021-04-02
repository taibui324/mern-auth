import React, { Component } from 'react'

export class SocialProfiles extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, inputChange } = this.props;

        return (
            <div className="form-container">
                <h1 className="mb-5"> Touch Share Links </h1>
                <div className="form-group">
                    <label for = "link"></label>
    <div className = "mb-5">
              <select id="link" name="link">
        <option value="facebook">Facebook</option>
        <option value="instagram">Instagram</option>
        <option value="zalo">Zalo</option>
      </select>
      </div>
                    <label htmlFor="facebook">Facebook URL</label>
                    <input type="text" className="form-control" name="facebook" onChange={inputChange('facebook')} value={values.facebook} />
                </div>
                <div className="form-group">
                    <label htmlFor="instagram">Instagram URL</label>
                    <input type="text" className="form-control" name="twitter" onChange={inputChange('instagram')} value={values.instagram} />
                </div>
                <div className="form-group">
                    <label htmlFor="zalo">Github URL</label>
                    <input type="text" className="form-control" name="zalo" onChange={inputChange('zalo')} value={values.zalo} />
                </div>

                <br />

                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-danger" onClick={this.back}>Back</button>
                    </div>
                    <div className="col-6 text-right">
                        <button className="btn btn-primary" onClick={this.continue}>Continue</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SocialProfiles