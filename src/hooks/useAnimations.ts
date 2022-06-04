const useAnimations = () => {
    const getAnimations = () => ({
        pageAnimation1: {
            hidden: {
                x: '100vw',
            },
            visible: {
                x: 0,
                transition: { ease: 'easeInOut', duration: 0.5, },
            },
            exit: {
                x: '-100vw',
                transition: { ease: 'easeInOut', duration: 0.5, },
            },
        },
        pageAnimation2: {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                 transition: { ease: 'easeInOut', },
            },
            exit: {
                opacity: 0,
                transition: { ease: 'easeInOut', },
            },
        },
        navbarTitleAnimation: {
            hidden: {
                y: -100,
            },
            visible: {
                y: 0,
                transition: { type: 'spring', mass: 1, damping: 8 },
            },
            hover: {
                scale: 1.08, 
                x: 10,
                originX: 0,
                color: '#ffc0cb',
                transition: { type: 'spring', mass: 1, damping: 8 },
            },
        },
        navbarButtonAnimation: {
            hidden: {
                x: 100,
            },
            visible: {
                x: 0,
                transition: { type: 'spring', mass: 1, damping: 8 },
            },
            hover: {
                scale: 1.5, 
                color: '#ffc0cb',
                transition: { type: 'spring', mass: 1, damping: 8 },
            },
        },
        itemCardAnimation: {
            hover: {
                scale: 1.02, 
                originX: 0,
                transition: { type: 'spring', stiffness: 300 },
            },
        },
        addButtonAnimation: {
            hover: {
                scale: 1.2, 
                rotate: 360,
            },
        },
        signInButtonAnimation: {
            hover: {
                scale: 1.02,
            }
        },
        saveButtonAnimation: {
            hover: {
                scale: 1.02,
            }
        },
    });

    return {
        getAnimations,
    }
}

export default useAnimations;