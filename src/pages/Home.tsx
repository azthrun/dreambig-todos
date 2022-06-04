import { Container, Box, Grid, Paper, Avatar, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem, Typography, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { motion, AnimatePresence } from "framer-motion";

import useFirestore from "../hooks/useFirestore";
import TodoItem from "../models/TodoItem";
import ToDoCard from "../components/ToDoCard";
import useStyles from "../hooks/useStyles";
import useAnimations from "../hooks/useAnimations";

const Home = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [filter, setFilter] = useState<string>('Pending Items');

    const navigate = useNavigate();
    const { getTodoItems, updateTodoItem, deleteTodoItem } = useFirestore();
    const { getHomePageStyles } = useStyles();
    const { getAnimations } = useAnimations();
    const styles = getHomePageStyles();
    const animation = getAnimations();

    useEffect(() => {
        setIsLoading(true);
        getTodoItems().then(data => {
            const filtered = data.filter(item => {
                if (filter === 'Pending Items') {
                    return !item.isComplete;
                } else if (filter === 'Completed') {
                    return item.isComplete;
                } else {
                    return item;
                }
            });
            setTodoItems(filtered);
            setIsLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    const handleFilterChange = (event : SelectChangeEvent) => {
        setFilter(event.target.value);
    }

    const toggleItemComplateState = (event : React.MouseEvent, item : TodoItem) => {
        event.stopPropagation();
        setIsLoading(true);

        updateTodoItem(item).then(() => {
            let newSet : TodoItem[] = [];
            todoItems.forEach(i => {
                if (i.id !== item.id) {
                    newSet.push(i);
                } else {
                    if ((filter === 'Pending Items' && !item.isComplete) 
                        || (filter === 'Completed' && item.isComplete)
                        || (filter === 'All Items')) {
                        newSet.push(item);
                    }
                }
            });
            setTodoItems(newSet);
            setIsLoading(false);
        });
    }

    const deleteItem = (event : React.MouseEvent, item : TodoItem) => {
        event.stopPropagation();
        setIsLoading(true);

        deleteTodoItem(item).then(() => {
            let newSet : TodoItem[] = [];
            todoItems.forEach(i => {
                if (i.id !== item.id) newSet.push(i);
            });
            setTodoItems(newSet);
            setIsLoading(false);
        });

    }

    const openAddItemDialog = () => {
        navigate('/details');
    }

    const openEditItemDialog = (item : TodoItem) => {
        navigate('/details', { state: item });
    }

    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div variants={ animation.pageAnimation } initial='hidden' animate='visible' exit='exit'>
                <Container>
                    {
                        isLoading &&
                        <>
                            <Box sx={{ ...styles.headerRow, marginBottom: '20px' }}>
                                <Skeleton variant='rectangular' width='280px' height='60px' animation='wave'
                                    sx={ styles.rectangularSkeleton } />
                                <Skeleton variant='circular' width='50px' height='50px' animation='wave'
                                    sx={{ marginLeft: 'auto' }} />
                            </Box>
                            <Skeleton variant='rectangular' width='100%' height='200px' animation='wave'
                                sx={ styles.rectangularSkeleton } />
                        </>
                    }
                    {
                        !isLoading &&
                        <>
                            <Box sx={ styles.headerRow }>
                                <FormControl variant='filled' sx={ styles.filterSelect }>
                                    <InputLabel id='todo-item-filters'>Category</InputLabel>
                                    <Select labelId='todo-item-filters' variant='filled' value={ filter } label='category'
                                        onChange={ handleFilterChange }>
                                        <MenuItem value='Pending Items'>Pending Items</MenuItem>
                                        <MenuItem value='Completed'>Completed</MenuItem>
                                        <MenuItem value='All Items'>All Items</MenuItem>
                                    </Select>
                                </FormControl>
                                <motion.div style={{ marginLeft: 'auto' }} variants={ animation.addButtonAnimation }
                                    whileHover='hover'>
                                    <Avatar sx={ styles.addButton } onClick={ openAddItemDialog }>
                                        <AddIcon />
                                    </Avatar>
                                </motion.div>
                            </Box>
                            <Paper sx={ styles.paper }>
                                <Grid container rowSpacing={ 2 } columnSpacing={ 2 } sx={ styles.gridContainer }>
                                    {
                                        todoItems.map((item, idx) => (
                                            <Grid item xs={ 12 } md={ 6 } key={ item.id } onClick={ () => openEditItemDialog(item) }>
                                                <ToDoCard todo={ item } colorIndex={ idx % 4} 
                                                    toggleItemComplateState={ toggleItemComplateState } 
                                                    deleteItem={ deleteItem } 
                                                    />
                                            </Grid>
                                        ))
                                    }
                                    {
                                        todoItems.length === 0 &&
                                        <Typography variant='h6' color='textSecondary' textAlign='center' sx={ styles.emptyMessage }>
                                            No Items available in this "{filter}" category
                                        </Typography>
                                    }
                                </Grid>
                            </Paper>
                        </>
                    }
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}

export default Home;