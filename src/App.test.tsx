import React from 'react';
import ReactDOM from 'react-dom'
import ReactJSApp from './App';

test('Renders without crashing', () => {
 const div = document.createElement('div');
 ReactDOM.render(<ReactJSApp/>,div)
 ReactDOM.unmountComponentAtNode(div);
});
