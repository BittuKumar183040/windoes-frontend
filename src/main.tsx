import { createRoot } from 'react-dom/client'
import './index.css'
import Pipeline from './Windows/Pipeline'
import { Provider } from 'react-redux'
import { store } from "../store"

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Pipeline />
    </Provider>

)