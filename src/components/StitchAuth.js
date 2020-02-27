import React from 'react';
import {
    hasLoggedInUser,
    loginAnonymous,
    loginGoogle,
    logoutCurrentUser,
    getCurrentUser,
    addAuthenticationListener,
    removeAuthenticationListener,
    handleOAuthRedirects
} from '../stitch/authentication';

const StitchAuthContext = React.createContext();

export function useStitchAuth() {
    const context = React.useContext(StitchAuthContext);
    
    if (!context) {
        throw new Error('useStitchAuth must be used within a StitchAuthProvider');
    }

    return context;
}

export function StitchAuthProvider(props) {
    const [authState, setAuthState] = React.useState({
        isLoggedIn: hasLoggedInUser(),
        currentUser: getCurrentUser()
    });

    React.useEffect(() => {
        const authListener = {
            onUserLoggedIn: (auth, loggedInUser) => {
                if (loggedInUser) {
                    setAuthState(authState => ({
                        ...authState,
                        isLoggedIn: true,
                        currentUser: loggedInUser
                    }));
                }
            },
            onUserLoggedOut: (auth, loggedOutUser) => {
                setAuthState(authState => ({
                    ...authState,
                    isLoggedIn: false,
                    currentUser: null
                }));
            }
        };

        addAuthenticationListener(authListener);
        handleOAuthRedirects();
        setAuthState(state => ({ ...state }));
        return () => {
            removeAuthenticationListener(authListener);
        }
    }, []);

    const handleLogin = async (provider) => {
        if (!authState.isLoggedIn) {
            switch(provider) {
                case 'anonymous': return loginAnonymous()
                case 'google': return loginGoogle()
                default: {}
            }
        }
    };

    const handleLogout = async () => {
        const { isLoggedIn } = authState;

        if (isLoggedIn) {
            await logoutCurrentUser();
            setAuthState({
                ...authState,
                isLoggedIn: false,
                currentUser: null
            });
        } else {
            console.log(`can't handleLogout when no user is logged in`);
        }
    };

    const authInfo = React.useMemo(() => {
        const { isLoggedIn, currentUser } = authState;
        const value = {
            isLoggedIn,
            currentUser,
            actions: { handleLogin, handleLogout }
        };

        return value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authState.isLoggedIn]);

    return (
        <StitchAuthContext.Provider value={authInfo}>
            {props.children}
        </StitchAuthContext.Provider>
    );
}
