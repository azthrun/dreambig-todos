import { AppBar, Avatar, Box, Button, Popover, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { motion } from "framer-motion";

import useStyles from "../hooks/useStyles";
import useAnimations from "../hooks/useAnimations";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { getNavBarStyles } = useStyles();
    const { getAnimations } = useAnimations();
    const styles = getNavBarStyles();
    const animation = getAnimations();

    const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
    const [popElement, setPopElement] = useState<Element | null>(null);

    useEffect(() => {
        const setWidthValue = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', setWidthValue);

        return () => window.removeEventListener('resize', setWidthValue);
    }, []);

    const openProfileOptions = (event : React.MouseEvent) => {
        setPopElement(event.currentTarget as Element);
    }

    const closeProfileOptions = () => setPopElement(null);

    const open = Boolean(popElement);
    const id = open ? 'profilePop' : undefined;

    const gotoHomePage = () => {
        navigate('/');
    }

    const gotoAboutPage = () => {
        navigate('/about');
    }

    const goBack = () => {
        navigate(-1);
    }

    const signOut = async () : Promise<void> => {
        await auth.signOut();
    }

    return (
        <AppBar>
            <Toolbar>
                {
                    auth.isLoggedIn &&
                    <>
                        <motion.div whileTap={{ scale: 1.2 }}>
                            <Avatar src={ auth.profileImg } sx={ styles.profile } onClick={ openProfileOptions }>
                                {auth.displayName[0]}
                            </Avatar>
                        </motion.div>
                        <Popover id={ id } open={ open } anchorEl={ popElement } onClose={ closeProfileOptions }
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
                            <Button variant='contained' color='error' endIcon={ <ExitToAppOutlinedIcon /> } 
                                sx={ styles.logoutButton } onClick={ signOut }>
                                Logout
                            </Button>
                        </Popover>
                    </>
                }
                <motion.div variants={ animation.navbarTitleAnimation } initial='hidden' animate='visible' whileHover='hover'>
                    <Typography variant={ windowWidth && windowWidth <= 450 ? 'h6' : 'h5' } fontWeight='700' 
                        sx={ styles.title } onClick={ gotoHomePage }>
                        DreamBig To-Dos
                    </Typography>
                </motion.div>
                {
                    auth.isLoggedIn &&
                    <Box sx={{ marginLeft: 'auto' }}>
                        <motion.div variants={ animation.navbarButtonAnimation } initial='hidden' animate='visible' whileHover='hover'>
                            <HomeOutlinedIcon sx={ styles.navLink } onClick={ gotoHomePage } />
                        </motion.div>
                    </Box>
                }
                {
                    location.pathname === '/about' ? (
                        <Box sx={{ marginLeft: auth.isLoggedIn ? '20px' : 'auto' }}>
                            <motion.div variants={ animation.navbarButtonAnimation } initial='hidden' animate='visible' whileHover='hover'>
                                <CloseOutlinedIcon sx={ styles.navLink } onClick={ goBack } />
                            </motion.div>
                        </Box>
                    ) : (
                        <Box sx={{ marginLeft: auth.isLoggedIn ? '20px' : 'auto' }}>
                            <motion.div variants={ animation.navbarButtonAnimation } initial='hidden' animate='visible' whileHover='hover'>
                                <HelpOutlineIcon sx={ styles.navLink } onClick={ gotoAboutPage } />
                            </motion.div>
                        </Box>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;