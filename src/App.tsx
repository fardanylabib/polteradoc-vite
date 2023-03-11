import { Suspense, lazy} from 'react';
import "flatpickr/dist/themes/material_green.css";
import { AppContext, AppProvider,IAppContextValue } from "./AppContext";
import { ApolloProvider } from '@apollo/client';
import {secureClient, openClient} from './graphql/apolloClient';
import {Toast} from './lib/common/Toast';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { LoadingOverlay } from './lib/common/Loading';
import NotFound from './pages/NotFound';
import { Layout } from './lib/navigation/Layout';
import { routes } from './constants/menu';
import { ROLE_MAHASISWA } from './constants/common';
import ProfileMahasiswa from './pages/profile/ProfileMahasiswa';
import ProfileManager from './pages/profile/ProfileManager';

const Activity = lazy(() => import('./pages/activity/Activity'));
const Mitra = lazy(() => import('./pages/mitra/Mitra'));
const Student = lazy(() => import('./pages/student/Student'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

function App() {
  return (
    <AppProvider>
      <AppContext.Consumer>
      {({
        userAuth,
        removeUserAuth,
        setUserAuth,
        setUserWithExpiryDate
      }:IAppContextValue)=>(
          <div>
            <BrowserRouter>
            {
              !userAuth?.user?.id ?
              <ApolloProvider client={openClient}>
                <Routes>
                  <Route path={"/"}
                    element={
                      <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                        <Login/>
                      </Suspense>
                    }
                  />
                  <Route path={`/${routes.REGISTER}`}
                    element={
                      <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                        <Register/>
                      </Suspense>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ApolloProvider>
              :
              <ApolloProvider client={secureClient}>
                <Layout>
                  <Routes>
                    <Route path={"/"} 
                      element={
                        <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                          <Dashboard/>
                        </Suspense>
                      }
                    />
                    <Route path={`/${routes.HOME}`} 
                      element={
                        <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                          <Dashboard/>
                        </Suspense>
                      }
                    />
                    <Route path={`/${routes.ACTIVITY}`} 
                      element={
                        <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                          <Activity/>
                        </Suspense>
                      }
                    />
                    <Route path={`/${routes.MITRA}`}
                      element={
                        <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                          <Mitra/>
                        </Suspense>
                      }
                    />
                    <Route path={`/${routes.STUDENT}`}
                      element={
                        <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                          <Student/>
                        </Suspense>
                      }
                    />
                    <Route path={`/${routes.PROFILE}`}
                      element={
                        <Suspense fallback={<div className="w-fit mx-auto"><LoadingOverlay/></div>}>
                          {
                            userAuth.user.role?.data.attributes.name === ROLE_MAHASISWA ? 
                            <ProfileMahasiswa/> : <ProfileManager/>
                          }
                        </Suspense>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ApolloProvider>
            }
            </BrowserRouter>
            <Toast/>
          </div>
      )}
      </AppContext.Consumer>
    </AppProvider>
  )
}

export default App
