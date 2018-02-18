import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class InputNamePage extends Component
{
    constructor() {
        super();
        this.state = {
            results: [],
        };
    }

    componentDidMount()
    {
        this.input.focus();
    }

    onKeyUp(evt) {

        const q = evt.target.value;
        const results = this.props.variants.filter((item) => {
            return q.length > 0 && item.match(new RegExp('^' + q, 'i')) !== null
        });
        this.setState({results: results});

    }

    onSubmit(evt) {
        evt.preventDefault();

        this.props.callback(this.input.value);
    }

    render() {

        const res = this.state.results.map((item) => {
            return <li><a href='#'>{item}</a></li>;
        });

        return (
            <div>
                <div className="row">
                    <div className="col s10">
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <input
                                name="name"
                                onKeyUp={this.onKeyUp.bind(this)}
                                ref={ (input) => { this.input = input } }
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

InputNamePage.propTypes = {
    backUrl: PropTypes.string,
    variants: PropTypes.array,
    callback: PropTypes.func,
};

InputNamePage.defaultProps = {
    backUrl: '/',
    variants: [],
};