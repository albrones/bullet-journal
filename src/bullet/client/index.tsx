/// <reference path="../../../typings/tsd.d.ts" />
import ReactDOM = require('react-dom');
import {Bullet} from './components/bullet';

Meteor.startup(() => {
    ReactDOM.render(<Bullet />, document.getElementById('app'));
});
