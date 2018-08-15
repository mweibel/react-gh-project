import 'abortcontroller-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'milligram';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
