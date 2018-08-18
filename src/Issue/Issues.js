import React from 'react'
import PropTypes from 'prop-types'

export const Issue = ({ title, html_url }) => (
  <a href={html_url}>{title}</a>
)
Issue.propTypes = {
  title: PropTypes.string.isRequired,
  html_url: PropTypes.string.isRequired
}