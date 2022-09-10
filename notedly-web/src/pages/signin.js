import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useMutation, useApolloClient, gql } from "@apollo/client"

import UserForm from "../components/UserForm"

const SIGNIN_USER = gql`
    mutation signIn($email: String!,  $password: String!){
        signIn(email: $email, password: $password)
    }
`


// include the props passed to the component for later user
const SignIn = props => {
    useEffect(() => {
        // update the document title
        document.title = 'Sign ip - Notedly'
    })

    // Apollo Client 
    const client = useApolloClient()

    //add the mutation hook
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // console.log the JSON web token when the mutation is complete
            localStorage.setItem('token', data.signIn)

            // update the local cache
            client.writeData({ data: { isLoggedIn: true }})

            // redirect the user to the homepage
            props.history.push('/')
        }
    })

    
    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {/* if the data is loading, display a loading message*/}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message*/}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    )
}


export default SignIn