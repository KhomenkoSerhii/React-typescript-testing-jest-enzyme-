import React, { useRef } from "react";
import { Box } from "@material-ui/system";
import { Paper } from "@material-ui/core";
import TaskInputComponent from "../TaskInputComponent/TaskInputComponent";

interface TodoComponentProps {
  onAdd: (todo: string) => void;
}

const TodoComponent: React.FC<TodoComponentProps> = (props) => {
  const { onAdd } = props;

  const ref = useRef<HTMLInputElement>(null);

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onAdd(ref.current!.value);
      ref.current!.value = "";
    }
  };

  return (
    <Box p={4} mt={8} className="mainComponent">
      <Paper>
        <Box display={"flex"} alignItems={"center"} mt={2}>
          <TaskInputComponent
            keyPressHandler={keyPressHandler}
            inputRef={ref}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default TodoComponent;
