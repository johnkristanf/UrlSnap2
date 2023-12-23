import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';

const shortUrlScreen = React.lazy(() => import('./pages/shortUrlScreen'));

const qrCodeScreen = React.lazy(() => import('./pages/qrCodeScreen'));

const ConverterScreen = React.lazy(() => import('./pages/ConverterScreen'));

const App = () => {

  return(

    <>
      <BrowserRouter basename="/">

        <Suspense fallback={<div>Loading....</div>}>

            <Routes>
               <Route path="/" Component={shortUrlScreen} />
               <Route path="/qrcode-generator" Component={qrCodeScreen} />
               <Route path="/yt-converter" Component={ConverterScreen} />

            </Routes>

        </Suspense>

      </BrowserRouter>

    </>

  )
}

export default App;