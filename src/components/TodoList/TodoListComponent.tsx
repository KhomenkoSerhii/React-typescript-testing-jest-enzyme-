import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import { ITodo } from "../../interfaces/interfaces";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box } from "@material-ui/system";

interface TodoListProps {
  todoList: ITodo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  onToggle,
  onRemove,
}) => {
  if (todoList.length === 0) {
    return (
      <Typography align="center" variant="h4">
        No Tasks
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <List>
        {todoList.map((todo) => {
          const classes = [];
          if (todo.completed) {
            classes.push(true);
          }
          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => onRemove(todo.id)}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton onClick={() => onToggle(todo.id)}>
                <ListItemIcon>
                  <Checkbox edge="start" checked={todo.completed} />
                </ListItemIcon>
                <ListItemText
                  primary={todo.title}
                  style={{
                    textDecoration: classes.length ? "line-through" : "",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default TodoList;
