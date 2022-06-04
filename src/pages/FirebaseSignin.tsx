import { Card, CardActionArea, CardContent, CardMedia, Container, Button, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

import useAuth from "../hooks/useAuth";
import useStyles from "../hooks/useStyles";
import useAnimations from "../hooks/useAnimations";

const FirebaseSignin = () => {
    const { getFirebaseSigninStyles } = useStyles();
    const { getAnimations } = useAnimations();
    const styles = getFirebaseSigninStyles();
    const animation = getAnimations();
    const auth = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);
    const [failureMessage, setFailureMessage] = useState<string>('');

    const signInWithGoogle = async () : Promise<void> => {
        setIsLoading(true);
        setIsLoginFailed(false);
        setFailureMessage('');
        try {
            const isAuthroized = await auth.signInWithGoogle();
            setIsLoading(false);
            if (isAuthroized) {
                navigate('/', { replace: true });
            } else {
                setIsLoginFailed(true);
                setFailureMessage('Your account is not active.');
            }
        } catch {
            setIsLoading(false);
            setIsLoginFailed(true);
            setFailureMessage('Login sequence interrupted. Please try again.');
        }
    }

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div variants={ animation.pageAnimation } initial='hidden' animate='visible' exit='exit'>
                <Container sx={ styles.container }>
                    <Card>
                        <CardActionArea>
                            <CardMedia component='img' height='230' image='/img/login-header.jpg' 
                                alt='login header' sx={ styles.headerImage } />
                        </CardActionArea>
                        <CardContent sx={ styles.mainContent }>
                            <Typography variant="h5" color="textSecondary" fontWeight='bold'>
                                Sign in to Account
                            </Typography>
                            {
                                isLoading ? (
                                    <CircularProgress sx={{ marginTop: '10px' }} />
                                ) : (
                                    <motion.div variants={ animation.signInButtonAnimation } whileHover='hover'>
                                        <Button type='submit' color='primary' variant='contained' fullWidth 
                                            sx={ styles.googleSignInButton } startIcon={ <SmartToyOutlinedIcon /> }
                                            onClick={ signInWithGoogle }>
                                            Sign in with Google
                                        </Button>
                                    </motion.div>
                                )
                            }
                            {
                                isLoginFailed &&
                                <Typography variant='caption' color='error' sx={{ marginTop: '5px' }}>
                                    { failureMessage }
                                </Typography>
                            }
                        </CardContent>
                    </Card>
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}

export default FirebaseSignin;