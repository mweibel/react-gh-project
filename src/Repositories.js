import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getIssues, getRepos } from './api/github'
import Repository from './Repository'
import { immutableUpdateObjectInList } from './immutableHelpers'

class Repositories extends Component {
  constructor (props) {
    super(props);

    this.state = {
      repos: props.repos,
      loading: true
    };
    this.abortController = new window.AbortController();
  }

  async componentDidMount() {
    const { organization } = this.props
    const { signal } = this.abortController
    const response = await getRepos(organization, { signal })

    // if the component is in the process of being unmounted but the response
    // has already arrived, ensure it doesn't call `setState()`.
    if (signal.aborted) {
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

  /**
   * Handles clicking on a repository.
   *
   * Either loads the list of issues, hides or shows the list of issues.
   *
   * @param {Event} event
   * @param {Number} index
   * @param {String} name
   * @returns {*}
   */
  handleClick(event, index, name) {
    // prevent toggle of issue list when click happens the sub-ul
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

  /**
   * Loads a list of issues based on the organization and the repository name.
   *
   * Updates the component state in an immutable way,
   * enabling future shouldComponentUpdate usage (e.g. by inheriting from PureComponent).
   *
   * @param {Number} index
   * @param {String} name
   */
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
