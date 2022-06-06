import { Avatar, Card, CardContent, CardHeader, Container, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { motion, AnimatePresence } from "framer-motion";

import useStyles from "../hooks/useStyles";
import useAnimations from "../hooks/useAnimations";

const About = () => {
    const { getAboutPageStyles } = useStyles();
    const { getAnimations } = useAnimations();
    const styles = getAboutPageStyles();
    const animation = getAnimations();

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div variants={ animation.pageAnimation } initial='hidden' animate='visible' exit='exit'>
                <Container>
                    <Card sx={ styles.card }>
                        <CardHeader 
                            avatar={
                                <Avatar sx={ styles.headerAvatar1 }>
                                    <FavoriteIcon />
                                </Avatar>
                            }
                            title='What is DreamBig?'
                            subheader='What DreamBig does?'
                            />
                        <CardContent>
                            <Typography>
                                DreamBig is a future brand that builds various kinds of applications. From React, Flutter, to .NET MAUI, from Android, macOS, iOS, to Windows Desktop, from frontend UI/UX to backend data services (APIs), from Web 2.0 to Web 3.0 (with Ehtereum blockchain), DreamBig can provide excellent solutions that meets different kinds of needs.
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={ styles.card }>
                        <CardHeader 
                            avatar={
                                <Avatar sx={ styles.headerAvatar2 }>
                                    <MilitaryTechIcon />
                                </Avatar>
                            }
                            title='About Terry Chen'
                            subheader='Senior Full Stack Software Engineer'
                            />
                        <CardContent>
                            <Typography>
                                Terry has 10+ years of experiences designing and developing mobile, web, and desktop applications on mordern operating systems/platforms. React and .NET MAUI are the two major technologies Terry uses. Other than those, Terry also has experiences in Vue, Angular, Xamarin, and Flutter frameworks/libraries.
                            </Typography>
                            <Typography>
                                <a href='https://github.com/azthrun' target='_blank' rel='noreferrer' style={ styles.cardContentLink }>
                                    GitHub
                                </a>
                                <a href='https://twitter.com/azthrunzalao0o' target='_blank' rel='noreferrer' style={ styles.cardContentLink }>
                                    Twitter
                                </a>
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}

export default About;