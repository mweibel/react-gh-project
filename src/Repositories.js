import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getIssues, getRepos } from './api/github'
import Repository from './Repository'

function immutableUpdateObjectInList(list, index, obj) {
  return [
    ...list.slice(0, index),
    {...list[index], ...obj},
    ...list.slice(index + 1)
  ]
}

class Repositories extends Component {
  constructor (props) {
    super(props);

    this.state = {
      repos: null,
      loading: true
    };
    this.abortController = new window.AbortController();
  }

  async componentDidMount() {
    const { organization } = this.props
    const response = await getRepos(organization, { signal: this.abortController.signal })

    if (this.abortController.signal.aborted) {
      return
    }

    this.setState({
      repos: response,
      loading: false
    })
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  handleClick(event, index, name) {
    if (event.target !== event.currentTarget) {
      return
    }

    const { repos } = this.state
    const repo = repos[index]
    if (repo.active) {
      return this.setState({
        repos: immutableUpdateObjectInList(repos, index, { active: false })
      })
    }
    if (repo.issues) {
      return this.setState({
        repos: immutableUpdateObjectInList(repos, index, { active: true })
      })
    }
    this.loadIssues(index, name)
  }

  async loadIssues(index, name) {
    const { repos } = this.state
    const { organization } = this.props
    this.setState({
      repos: immutableUpdateObjectInList(repos, index, { loading: true, active: true })
    })

    const response = await getIssues(organization, name, 'open')
    this.setState((state) => ({
      repos: immutableUpdateObjectInList(state.repos, index, {
        loading: false,
        issues: response
      })
    }))
  }

  render() {
    const { repos, loading } = this.state

    if (loading) {
      return <div>Loading</div>
    }
    if (!repos) {
      return null
    }

    return (
      <ul>
        {repos.map((repo, index) => (
          <Repository
            key={repo.id}
            index={index}
            {...repo}
            onClick={(event, index, name) => this.handleClick(event, index, name)}
          />
        ))}
      </ul>
    );
  }
}
Repositories.propTypes = {
  organization: PropTypes.string.isRequired
}

export default Repositories;
