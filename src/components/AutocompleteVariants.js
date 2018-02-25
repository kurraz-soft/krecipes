import React from 'react'
import PropTypes from 'prop-types'

const AutocompleteVariants = ({variants, onSelectResult, search}) => {
    const filtered_variants = variants.filter((item) => {
            return search.length > 0 && item.match(new RegExp('^' + search, 'i')) !== null
        });
    return (
        <ul>
            {filtered_variants.map((v, i) => {
                return <li key={i}>
                    <a href='#' onClick={(e) => {e.preventDefault(); onSelectResult(e.target.innerText)}}>{v}</a>
                </li>
            })}
        </ul>
    );
};

AutocompleteVariants.propTypes = {
    variants: PropTypes.array,
    onSelectResult: PropTypes.func,
    search: PropTypes.string,
};

export default AutocompleteVariants