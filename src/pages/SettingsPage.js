import React from 'react'
import {Link} from 'react-router-dom'

export default class SettingsPage extends React.Component
{
    render(){
        return (
            <div>
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

                <div className='center-align'>
                    <i>Coming soon...</i>
                </div>
            </div>
        );
    }
}