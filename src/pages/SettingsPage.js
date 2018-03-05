import React from 'react'
import {Link} from 'react-router-dom'
import localforage from 'localforage'

export default class SettingsPage extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            server_url: '',
            server_token: '',
        };
    }

    componentDidMount()
    {
        localforage.getItem('ServerUrl').then(value => {
            if(value)
                this.setState({server_url: value});
        });
        localforage.getItem('ServerToken').then(value => {
            if(value)
                this.setState({server_token: value});
        });
        setTimeout(() => {
            if(this.inputUrl)
                this.inputUrl.dispatchEvent(new Event('change', { 'bubbles': true }));
            if(this.inputToken)
                this.inputToken.dispatchEvent(new Event('change', { 'bubbles': true }));
        },200);
    }

    handleServerUrlChange(e)
    {
        const val = e.target.value.trim();
        this.setState({server_url: val});
        localforage.setItem('ServerUrl', val);
    }

    handleServerPasswordChange(e)
    {
        const val = e.target.value.trim();
        this.setState({server_token: val});
        localforage.setItem('ServerToken', val);
    }

    render(){
        return (
            <div>
                <div className='card-panel-header-block'>
                    <div className='row card-panel deep-orange darken-1 white-text card-panel-header'>
                        <div className='col s3'>
                            <Link className='white-text btn-back' to={'/'}><i className='material-icons medium'>navigate_before</i></Link>
                        </div>
                        <div className='col s6 center-align flow-text'>
                            <strong>Settings</strong>
                        </div>
                        <div className='col s3 right-align'>

                        </div>
                    </div>
                </div>

                <div className='content-wrapper'>
                    <div className='card-panel'>
                        <h4 className='center-align'>Sync Server</h4>
                        <br />
                        <form>
                            <div className='input-field'>
                                <input
                                    type='text'
                                    value={this.state.server_url}
                                    onChange={this.handleServerUrlChange.bind(this)}
                                    ref={(input) => this.inputUrl = input}
                                />
                                <label>Url</label>
                            </div>
                            <div className='input-field'>
                                <input
                                    type='text'
                                    value={this.state.server_token}
                                    onChange={this.handleServerPasswordChange.bind(this)}
                                    ref={(input) => this.inputToken = input}
                                />
                                <label>Token</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}