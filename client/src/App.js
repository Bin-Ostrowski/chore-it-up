import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import YourChores from './pages/YourChores';
import Login from './pages/Login';

// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';

import './App.css';

// Import apollo from @apollo/client

// set token context
// import { setContext } from "@apollo/client/link/context";

// establish new link to GraphQL

// define authLink

// define client and initiate a new cashe object using new InMemoryCache()

export default function App() {
    return (
        <ChakraProvider>
            {/* // wrap all in ApolloProvider */}
            <Router>
                <div>
                    <Header />
                    <div>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/chores">
                                <Route
                                    path=":username"
                                    element={<YourChores />}
                                />
                                <Route path="" element={<YourChores />} />
                            </Route>
                            {/* <Route path="/login" element={<Login />} /> */}
                            {/* <Route path="/signup" element={<Signup />} /> */}
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ChakraProvider>
    );
}
