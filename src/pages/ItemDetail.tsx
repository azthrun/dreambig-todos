import { Container, Paper, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import useFirestore from "../hooks/useFirestore";
import useStyles from "../hooks/useStyles";
import useAnimations from "../hooks/useAnimations";
import TodoItem from "../models/TodoItem";

const ItemDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addNewTodoItem, updateTodoItem } = useFirestore();
    const { getItemDetailPageStyles } = useStyles();
    const { getAnimations } = useAnimations();
    const styles = getItemDetailPageStyles();
    const animation = getAnimations();
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [todo, setTodo] = useState<TodoItem>(null!);
    const [emptyNotes, setEmptyNotes] = useState<boolean>(false);

    useEffect(() => {
        if (state) {
            setTodo(state as TodoItem);
        } else {
            setTodo({
                id: 'tempId',
                notes: '',
                modifiedDate: new Date(),
                isComplete: false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const saveTodoItem = (event : FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setEmptyNotes(false);
        
        if (todo.notes === '') setEmptyNotes(true);

        if (todo.notes) {
            if (todo.id === 'tempId') {
                addNewTodoItem(todo).then(() => {
                    setIsLoading(false);
                    navigate(-1);
                });
            } else {
                updateTodoItem(todo).then(() => {
                    setIsLoading(false);
                    navigate(-1);
                });
            }
        } else {
            setIsLoading(false);
        }
    }

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div variants={ animation.pageAnimation1 } initial='hidden' animate='visible' exit='exit'>
                <Container>
                    <Typography variant='h4' sx={ styles.headerRow }>
                        { todo ? 'Add New' : 'Edit' } Item
                    </Typography>
                    <Paper sx={ styles.paper }>
                        {
                            todo &&
                            <form noValidate autoComplete='off' onSubmit={ saveTodoItem }>
                                <TextField label='Notes' minRows={ 5 } multiline fullWidth required
                                    disabled={ isLoading }
                                    sx={ styles.inputField } value={ todo.notes } error={ emptyNotes }
                                    onChange={ (e) => setTodo({ ...todo, notes: e.target.value })} />
                                <motion.div variants={ animation.saveButtonAnimation } whileHover='hover'>
                                    <Button variant='contained' color='secondary' type='submit' fullWidth 
                                        sx={styles.inputField } disabled={ isLoading }>
                                        { isLoading ? <CircularProgress size={ 25 } /> : 'Save' }
                                    </Button>
                                </motion.div>
                            </form>
                        }
                    </Paper>
                </Container>
            </motion.div>
        </AnimatePresence>
    )
}

export default ItemDetail;