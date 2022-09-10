import React from 'react'
import styled from 'styled-components'
import logo from '../img/logo.svg'
import { useQuery, gql  } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom'

import ButtonAsLink from './ButtonAsLink';

//local query
const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const HeaderBar = styled.header`
width: 100%;
padding: 0.5em 1em;
display: flex;
height: 64px;
position: fixed;
align-items: center;
background-color: #fff;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
z-index: 1;
`;

const LogoText = styled.h1`
margin: 0;
padding: 0;
display: inline;
`;

const UserState = styled.div`
    marging-left: auto;
`;




const Header = props => {
    // query hook for user logged in state
    const { data, client } = useQuery(IS_LOGGED_IN)


    return (
        <HeaderBar>
            <img src={logo} alt="Notedly Logo" height="40" />
            <LogoText>Notedly</LogoText>
            <UserState>
                {data.isLoggedIn ? (
                    <ButtonAsLink
                    
                        onClick={() => {
                            // remove the token
                            localStorage.removeItem('token')

                            // clean the application's cache
                            client.resetStore() 

                            // update local state
                            client.writeData({ data: { idLoggedIn: false }})

                            // redirect the user to the home page
                            props.history.push('/')
                        }}
                    >
                        Log Out
                    </ButtonAsLink>
                ) : (
                    <p>
                        <Link to={'/signin'}>Sign In</Link>
                        <Link to={'/signup'}>Sign up</Link>
                    </p>
                )
                }
            </UserState>
        </HeaderBar>
    )
}

// we wrap our component in the withRouter higher-order component
export default withRouter(Header)


