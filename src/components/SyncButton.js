import React from 'react'
import {connect} from 'react-redux'
import localforage from 'localforage'
import axios from 'axios'
import {downloadFromServerAction} from "../actions/syncActions";

@connect(store => {
    return {
        products: store.products.products,
        recipes: store.recipes.recipes,
    };
})
export default class SyncButton extends React.Component
{
    constructor()
    {
        super();

        this.state = {
            sync_enabled: false,
            is_syncing: false,
            icon: 'sync',
        };

        this.serverUrl = '';
        this.serverToken = '';
        this.serverSynced = '';
    }

    componentDidMount()
    {
        localforage.getItem('ServerUrl').then((value) => {
            if(value)
            {
                this.setState({sync_enabled: true});
                this.serverUrl = value;
            }
            return localforage.getItem('ServerToken');
        }).then((value) => {
            this.serverToken = value;
            return localforage.getItem('ServerSynced');
        }).then((value) => {
            this.serverSynced = value;
        }).then(() => {
            this.synchronize();
        });
    }

    synchronize()
    {
        if(!this.state.sync_enabled) return;

        this.setState({is_syncing: true, icon: 'sync'});
        if(this.serverSynced === this.serverUrl)
        {
            axios.post(this.serverUrl, {
                type: 'upload',
                token: this.serverToken,
                data: {
                    recipes: this.props.recipes,
                    products: this.props.products,
                }
            }).then(() => {
                this.setState({is_syncing: false});
            });
        }else
        {
            axios.post(this.serverUrl, {
                type: 'sync',
                token: this.serverToken,
                data: {
                    recipes: this.props.recipes,
                    products: this.props.products,
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.setState({is_syncing: false});
                    this.props.dispatch(downloadFromServerAction(response.data));
                    this.serverSynced = this.serverUrl;
                    localforage.setItem('ServerSynced', this.serverUrl);
                })
                .catch(error => {
                    this.setState({is_syncing: false, icon: 'sync_problem'});
                });
        }

    }

    handleClick(e)
    {
        e.preventDefault();

        this.synchronize();
    }

    render() {

        if(this.state.sync_enabled)
            return (
                <a className='white-text btn-control' href='#' onClick={this.handleClick.bind(this)}>
                    <i className={'material-icons small' + (this.state.is_syncing?' spin':'')}>{this.state.icon}</i>
                </a>
            );
        else
            return <div />
    }
}