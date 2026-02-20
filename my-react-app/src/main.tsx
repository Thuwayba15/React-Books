import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import 'antd/dist/reset.css'
import './index.css'
import App from './App.tsx'

import { AuthProvider } from "./providers/auth";
import { BooksProvider } from "./providers/books";
import { WishlistProvider } from "./providers/wishlist";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <BooksProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </BooksProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>,
);
