import {configureStore} from '@reduxjs/toolkit';
import reducers from './Slices';


export default configureStore({
    reducer: reducers
});
