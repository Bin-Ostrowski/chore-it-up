import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import YourChores from './pages/YourChores';
import Login from './pages/Login';
import auth from './utils/auth';

// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';

import './App.css';

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';

// set token context
import { setContext } from '@apollo/client/link/context';

const isLoggedin = auth.loggedIn();

// establish new link to GraphQL
const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
});

// define authLink
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// define client and initiate a new cashe object using new InMemoryCache()
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <ChakraProvider>
                {/* // wrap all in ApolloProvider */}
                <Router>
                    <div>
                        {isLoggedin && <Header />}

                        <div>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/home" element={<Home />}></Route>
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
        </ApolloProvider>
    );
}
