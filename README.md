# GitHub: list of repositories with list of issues

## Guide

This app has been bootstrapped using [create-react-app](https://github.com/facebookincubator/create-react-app).
It's automaticly built, tested and deployed using travis-ci and github pages. Accessible on https://mweibel.github.io/react-gh-project/.

### Installation & Run instructions

First clone the code to your local machine.

```bash
# Install deps
$ npm install

# Start local dev server
$ npm start
```

By default the app uses the real GitHub API during development. If you want to switch to using the mock API
which uses fixtures located in the folder `src/api/__fixtures__` , create a file called `.env.development.local` with the following content:

```
REACT_APP_MOCK_API=true
```

### Production

To prepare for a production build, execute `npm run build`.
The `build/` directory contains all necessary files and is ready to be deployed.

You can also serve it with a static server:

```
# auto install npm package `serve` and start it based on the build/ directory.
$ npx serve -s build
```

## Specifications

### Brief

The goal of this task is to create an application consisting of:

#### Client-side

A client-side single-page application which must connect to the github API endpoint (see below) to:

- List the repositories from the `nodejs` organisation, showing the name of each
- When clicking on a repository, expand and make a request to get the open issues from that repository
- Once the issues from the repository are retrieved, show them under the repo as nested items, by title
- Have an intermediate loading state (show "loading..." as the only item during this process)
- Handle errors while requesting the API by logging to the console
- A simple ul-li structure is fine, no styling necessary
- Only request issues once per repository

Github API:

Get repositories by org:
`https://api.github.com/orgs/nodejs/repos`

Get open issues by repository:
`https://api.github.com/repos/nodejs/reponame/issues?state=open`

Example states:

First load of the app, while requesting the repos:

```html
<ul>
  <li>loading...</li>
</ul>
```

After loading the repos:

```html
<ul>
  <li>repo name 1</li>
  <li>repo name 2</li>
  <li>repo name 3</li>
</ul>
```

After clicking on a repo, while loading the issues:

```html
<ul>
  <li>
    repo name 1
    <ul>
      <li>loading...</li>
    </ul>
  </li>
  <li>repo name 2</li>
  <li>repo name 3</li>
</ul>
```

After loading the issues for a repo:

```html
<ul>
  <li>
    repo name 1
    <ul>
      <li>issue title 1</li>
      <li>issue title 2</li>
      <li>issue title 3</li>
    </ul>
  </li>
  <li>repo name 2</li>
  <li>repo name 3</li>
</ul>
```

#### Considerations

- Write tests, but no need for 100% coverage, just the main cases
- The code should be easy to read.
- Feel free to use babel along with any ES features that are stage-3 and up
- Feel free to use any tooling chain you're comfortable with
- Do not use callbacks for async calls - use either promises or async/await
- Feel free to use any UI library such as React, Vue, etc, and any state management library such as Redux, MobX, etc. Also feel free not to use any.
- Provide instructions to install, test and run the app

Please do get in touch at any time if you have any questions. We appreciate you using your personal time to complete this task, so let us know if we can help.
