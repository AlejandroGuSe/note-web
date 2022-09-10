import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useMutation, useApolloClient, gql } from "@apollo/client"

import UserForm from "../components/UserForm"

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!){
        signUp(email: $email, username: $username, password: $password)
    }
`



// include the props passed to the component for later user
const SignUp = props => {
    
        // Apollo Client 
        const client = useApolloClient()

        //add the mutation hook
        const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
            onCompleted: data => {
                // console.log the JSON web token when the mutation is complete
                localStorage.setItem('token', data.signUp)
    
                // update the local cache
                client.writeData({ data: { isLoggedIn: true }})
    
                // redirect the user to the homepage
                props.history.push('/')
            }
        })
        
    useEffect(() => {
        // update the document title
        document.title = 'Sign up - Notedly'
    })



    
    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* if the data is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message*/}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    )
}


export default SignUp