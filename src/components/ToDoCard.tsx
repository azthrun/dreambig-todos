import { Card, CardHeader, Avatar, CardContent, Typography, SxProps } from "@mui/material";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { motion } from "framer-motion";

import useStyles from "../hooks/useStyles";
import TodoItem from "../models/TodoItem";
import useAnimations from "../hooks/useAnimations";

interface Props {
    todo : TodoItem,
    colorIndex : number,
    toggleItemComplateState : (event : React.MouseEvent, item : TodoItem) => void,
    deleteItem : (event : React.MouseEvent, item : TodoItem) => void,
}

const ToDoCard = ({ todo, colorIndex, toggleItemComplateState, deleteItem } : Props) => {
    const { getToDoCardStyles } = useStyles();
    const { getAnimations } = useAnimations();
    const styles = getToDoCardStyles();
    const animation = getAnimations();

    const [avatartStyle, setAvatarStyle] 
        = useState<SxProps>(todo.isComplete ? styles.avatarComplete : styles.avatarPending);
    
    const toggleComplateState = (event : React.MouseEvent) => {
        todo.isComplete = !todo.isComplete;
        toggleItemComplateState(event, todo);
        setAvatarStyle(todo.isComplete ? styles.avatarComplete : styles.avatarPending);
    }

    const formatDate = () : string => {
        const year = todo.modifiedDate.getFullYear();
        const month = todo.modifiedDate.getMonth() + 1 >= 10 ? todo.modifiedDate.getMonth() + 1 : `0${todo.modifiedDate.getMonth() + 1}`;
        const day = todo.modifiedDate.getDate() >= 10 ? todo.modifiedDate.getDate() : `0${todo.modifiedDate.getDate()}`;
        const hour = todo.modifiedDate.getHours() >= 10 ? todo.modifiedDate.getHours() : `0${todo.modifiedDate.getHours()}`;
        const minute = todo.modifiedDate.getMinutes() >= 10 ? todo.modifiedDate.getMinutes() : `0${todo.modifiedDate.getMinutes()}`;
        const amPm = hour >= 12 ? 'pm' : 'am';
        return `${year}-${month}-${day} ${hour}:${minute} ${amPm}`;
    }

    return (
        <motion.div variants={ animation.itemCardAnimation } whileHover='hover'>
            <Card sx={{ backgroundColor: styles.backgroundColorOptions[colorIndex]}}>
                <CardHeader 
                    avatar={
                        <Avatar sx={ avatartStyle }
                            onClick={ toggleComplateState }>
                            <CheckIcon />
                        </Avatar>
                    }
                    action={
                        <DeleteForeverIcon fontSize='medium' color="error" sx={ styles.headerAction } 
                            onClick={ (event) => deleteItem(event, todo) }/>
                    }
                    title={ formatDate() }
                    sx={ styles.cardHeader }
                    />
                <CardContent>
                    <Typography>
                        { todo.notes }
                    </Typography>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default ToDoCard;