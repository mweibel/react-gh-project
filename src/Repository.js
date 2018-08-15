import React from 'react'
import PropTypes from 'prop-types'

const Repository = ({ name, index, onClick, active = false, loading = false, issues = []}) => (
  <li onClick={(event) => onClick(event, index, name)}>
    {name}
    {active && (
      <ul>
        {loading && <li>Loading</li>}
        {issues.map(({ id, title, html_url }) => <li key={id}><a href={html_url}>{title}</a></li>)}
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