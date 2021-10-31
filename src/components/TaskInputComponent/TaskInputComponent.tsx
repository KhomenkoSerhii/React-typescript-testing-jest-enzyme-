import React from "react";
import { TextField } from "@material-ui/core";

interface InputValueProps {
  inputRef: any;
  keyPressHandler: (event: any) => void;
}

const TaskInputComponent: React.FC<InputValueProps> = (props) => {
  const { inputRef, keyPressHandler } = props;
  return (
    <TextField
      inputRef={inputRef}
      fullWidth
      variant={"outlined"}
      label={"Add todo"}
      name={"text"}
      onKeyPress={keyPressHandler}
    />
  );
};

export default TaskInputComponent;
