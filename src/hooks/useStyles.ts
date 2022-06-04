import { createTheme } from "@mui/material";

const useStyles = () => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#834bff',
                main: '#651fff',
                dark: '#4615b2',
                contrastText: '#f4f4f4',
            },
            secondary: {
                light: '#8561c5',
                main: '#673ab7',
                dark: '#482880',
                contrastText: '#ffffff',
            }
        },
        typography: {
            fontFamily: 'Montserrat',
            fontWeightLight: 400,
            fontWeightRegular: 500,
            fontWeightMedium: 600,
            fontWeightBold: 700,
        }
    });

    const getAppBasicStyles = () => ({
        mainContent: {
            marginTop: theme.spacing(10),
        }
    });

    const getNavBarStyles = () => ({
        profile: {
            marginRight: '10px',
        },
        logoutButton: {
            padding: '5px 20px',
        },
        title: {
            cursor: 'pointer',
            wordWrap: 'break-word',
        },
        navLink: {
            cursor: 'pointer',
        },
    });

    const getFirebaseSigninStyles = () => ({ 
        container: {
            textAlign: 'center',
            marginTop: theme.spacing(5),
            maxWidth: '80%',
        },
        headerImage: {
            objectFit: 'cover',
        },
        mainContent: {
            backgroundColor: '#c0caca',
        },
        fieldControl: {
            width: '60%',
            marginBottom: '30px',
        },
        submitButton: {
            width: '60%',
        },
        googleSignInButton: {
            width: '60%',
            marginTop: '20px',
        },
    });

    const getToDoCardStyles = () => ({
        backgroundColorOptions: ['#c1d7ff', '#ffe5b7', '#b9d9d6', '#ffe4e8'],
        cardHeader: {
            paddingBottom: 0,
            '& .MuiCardHeader-content': {
                borderBottom: '1px solid #c3c3c3',
            },
            '& .MuiCardHeader-title': {
                fontSize: 'large',
            },
        },
        avatarComplete: {
            backgroundColor: theme.palette.success.main,
            cursor: 'pointer',
        },
        avatarPending: {
            backgroundColor: '#aaaaaa',
            cursor: 'pointer',
        },
        headerAction: {
            marginRight: '15px',
            cursor: 'pointer',
        },
    });

    const getHomePageStyles = () => ({
        rectangularSkeleton: {
            borderRadius: '10px',
        },
        headerRow: {
            display: 'flex',
            marginBottom: '30px',
            alignItems: 'center',
        },
        filterSelect: {
            width: '280px',
            backgroundColor: '#f4f4f4',
            borderRadius: '8px',
        },
        addButton: {
            cursor: 'pointer',
            backgroundColor: theme.palette.success.main,
        },
        paper: {
            backgroundColor: '#f6f6f6',
            borderRadius: '10px',
        },
        gridContainer: {
            padding: '0 10px 10px 10px',
        },
        emptyMessage: {
            width: '100%',
            marginTop: '10px',
        },
    });

    const getItemDetailPageStyles = () => ({
        headerRow: {
            display: 'block',
            marginBottom: '10px',
            textAlign: 'center',
        },
        paper: {
            backgroundColor: '#f6f6f6',
            borderRadius: '10px',
            padding: '10px',
        },
        inputField: {
            margin: '5px auto',
        },
    });

    const getAboutPageStyles = () => ({
        card: {
            backgroundColor: theme.palette.secondary.light,
            color: '#f4f4f4',
            marginBottom: '20px',
        },
        headerAvatar1: {
            backgroundColor: 'crimson',
        },
        headerAvatar2: {
            backgroundColor: theme.palette.primary.main,
        },
        cardContentLink: {
            marginLeft: '20px',
            color: 'lightskyblue',
        },
    });

    return {
        theme,
        getAppBasicStyles,
        getNavBarStyles,
        getToDoCardStyles,
        getFirebaseSigninStyles,
        getHomePageStyles,
        getItemDetailPageStyles,
        getAboutPageStyles,
    };
}

export default useStyles;