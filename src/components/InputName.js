import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class InputName extends Component
{
    constructor()
    {
        super();
        this.state = {
            results: [],
            value: "",
        };
    }

    onChange(evt)
    {
        const q = evt.target.value;

        const results = this.props.variants.filter((item) => {
            return q.length > 0 && item.match(new RegExp('^' + q, 'i')) !== null
        });
        this.setState({results: results, value: q});
    }

    onSubmit(evt)
    {
        evt.preventDefault();

        this.props.onSubmit(this.state.value);
    }

    onSelectResult(e)
    {
        e.preventDefault();
        this.setState({value: e.target.innerText});
        this.input.focus();
    }

    render() {

        const res = this.state.results.map((item, index) => {
            return <li key={index}><a href='#' onClick={this.onSelectResult.bind(this)}>{item}</a></li>;
        });

        return (
            <div>
                <div className="row">
                    <div className="col s8">
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <input
                                onChange={this.onChange.bind(this)}
                                value={this.state.value}
                                autoFocus={true}
                                ref={(input) => this.input = input}
                            />
                        </form>
                    </div>
                    <div className="col s2">
                        <Link to={this.props.backUrl} className="btn">Cancel</Link>
                    </div>
                </div>
                <ul>
                    {res}
                </ul>
            </div>
        );
    }
}

InputName.propTypes = {
    backUrl: PropTypes.string,
    variants: PropTypes.array,
    onSubmit: PropTypes.func,
};

InputName.defaultProps = {
    backUrl: '/',
    variants: [],
    onSubmit: (value) => {},
};