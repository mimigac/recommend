import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { BrowserHistory } from 'history'
import './App.css'
import Recommend from 'Recommend'

const defaultHistory = createBrowserHistory()

const App: React.FC<{ history: BrowserHistory }> = ({
  history = defaultHistory,
}) => {
  //historyの渡し方が正しいかわからない
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/recommend/:ids"
          element={<Recommend history={history} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
