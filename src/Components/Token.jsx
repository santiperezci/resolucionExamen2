import React, { useState } from 'react';
import {ApolloProvider,ApolloClient,createHttpLink,InMemoryCache} from "@apollo/client";
import { setContext } from "apollo-link-context";
import Github from './Github'
import './Styles.css'
  
function Token(){
    const [token, setToken] = useState(null);
    const [valid, setValid] = useState(null);
    
    if(!token || !valid){
    return (
        <div className="Token">
            <div className="input">
                <input id="token" placeholder='Github token'/>
                <div className='button' onClick={() => {setToken(document.getElementById("token").value);setValid(true)}}>Authenticate</div>
            </div>
            {valid===false?
                <div>
                    <a href="https://api.github.com/graphql">https://api.github.com/graphql</a>
                </div>
            :null}
        </div>
    );
    }else{
        const httpLink = createHttpLink({
            uri: "https://api.github.com/graphql",
        });

        const authLink = setContext((_, { headers }) => {
            return {
                headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
                }
            };
        });

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });

        return (
            <ApolloProvider client={client}>
                <Github setValid={setValid}/>
            </ApolloProvider>
        );
    }
}

export default Token;
