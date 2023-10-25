import { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { contextData } from "./contextApi";
import { ToastContainer } from 'react-toastify';
import Index from './pages/index/index'
import HomePage from './pages/home/home'
import RecordReport from "./pages/report/report";
import 'react-toastify/dist/ReactToastify.css';
import "./sass/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
export const queryClient = new QueryClient();

function App() {
  const [userdata, setUserData] = useState();
  return (
    <QueryClientProvider client={queryClient}>
      <contextData.Provider value={{ userdata, setUserData}}>
        <Suspense>
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={<Index />}
                />
                <Route
                  path="/secure"
                  element={ userdata ? <HomePage /> : <Index />}
                />
                <Route 
                path='/secure/monthly-report'
                element= {<RecordReport />}
                />
              </Routes>
            </Router>
            <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        </Suspense>
      </contextData.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
