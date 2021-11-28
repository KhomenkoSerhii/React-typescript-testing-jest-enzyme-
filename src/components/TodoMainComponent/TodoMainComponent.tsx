import React, { useState } from "react";
import { Box } from "@material-ui/system";
import { Paper, TextField } from "@material-ui/core";

interface TodoComponentProps {
  onAdd: (todo: string) => void;
}

const TodoComponent: React.FC<TodoComponentProps> = (props) => {
  const { onAdd } = props;
  const [title, setTitle] = useState<string>("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setTitle("");
      onAdd(title);
    }
  };

  return (
    <Box p={4} mt={8} className="mainComponent">
      <Paper>
        <Box display={"flex"} alignItems={"center"} mt={2}>
          <TextField
            data-testid="simple-input"
            className="TextField"
            fullWidth
            variant={"outlined"}
            label={"Add todo"}
            name={"text"}
            onChange={changeHandler}
            value={title}
            onKeyPress={keyPressHandler}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default TodoComponent;
