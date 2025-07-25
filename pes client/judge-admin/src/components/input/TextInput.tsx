import { TextField } from "@mui/material";
import "./input.scss";

interface TextInputProps {
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  touched?: boolean;
  error?: boolean | string;
  name?: string;
  type?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  onChange,
  label,
  touched,
  error,
  type,
  disabled,
}) => {
  return (
    <div id="text-input">
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
          backgroundColor: "#F5F8FF",
          borderRadius:'4px'
        }}
        id="fullWidth"
        name={name}
        fullWidth
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        type={type}
        disabled={disabled}
        
      />
      {touched && error && <div className="error-message">{error}</div>}
    </div>
  );
};
export default TextInput;
