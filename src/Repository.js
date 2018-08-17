import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from './Loading'
import './Repository.css'

const Repository = ({ name, index, onClick, active = false, loading = false, issues = []}) => (
  <li>
    <button type="button" className="button button-clear button-link" onClick={(event) => onClick(event, index, name)}>{name}</button>
    {active && (
      <ul>
        {loading ?
          <li><Loading /></li> :
          issues.map(({ id, title, html_url }) =>
            <li key={id}><a href={html_url}>{title}</a></li>
          )
        }
      </ul>
    )}
  </li>
)
Repository.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  issues: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired
  }).isRequired)
}


export default Repository