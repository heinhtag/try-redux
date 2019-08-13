import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

var store = createStore(function(state=[], action) {
    if(action.type === 'add') {
        return [
            action.data,
            ...state
        ];
    }

    return state;
});

class App extends React.Component {
    constructor() {
        super();
        this.input = React.createRef();
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.input} />
                <button onClick={()=> {
                    this.props.add(this.input.current.value)
                }}>+</button>
                <ul>
                    {this.props.data.map((item) => {
                        return <li>{item}</li>
                    })}
                </ul>
            </div>
        )
    }
}

var ReduxApp = connect(function(state) {
    return {
        data: state
    }
}, function(dispatch) {
    return {
        add: function(data) {
            dispatch({type: 'add', data: data});
        }
    }
})(App);

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);