import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import  {authenticationReducer} from '../Reducers/authenticationReducer';



export default function configureStore(initialState,history) {  

    // const middleware = [
    //     thunk     
    // ];   

    // const rootReducer = combineReducers({
    //     authenticationReducer
    // });

    // return createStore(
    //     rootReducer,       
    //     compose(applyMiddleware(...middleware))
    // );
    const reducers = {
        authentication: authenticationReducer      
    };

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
