import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { BrowserHistory } from 'history'
import { ApolloProvider } from '@apollo/client'
import client from 'apollo/apollo-client'
import { AuthProvider } from 'context/AuthContext'
import './App.css'
import Recommend from 'Recommend'

const defaultHistory = createBrowserHistory()

const App: React.FC<{ history: BrowserHistory }> = ({
  history = defaultHistory,
}) => {
  //historyの渡し方が正しいかわからない
  return (
    <ApolloProvider client={client}>
      <AuthProvider loading={false}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/recommend/:ids"
              element={<Recommend history={history} />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
