const useAnimations = () => {
    const getAnimations = () => ({
        pageAnimation: {
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
                 transition: { ease: 'easeInOut', duration: 0.5, },
            },
            exit: {
                opacity: 0,
                transition: { ease: 'easeInOut', duration: 0.5, },
            },
        },
        navbarTitleAnimation: {
            hidden: {
                y: -80,
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
                x: 80,
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