import React, {useEffect} from "react";
import {
  Box,
  Button,
  CardContent,
  TextField,
  Card,
  Typography,
} from "@mui/material";
import Center from "./Center";
import useForm from "../hooks/useForm";
import { ENDPOINT, createAPIEndpoint } from "../api";
import useStateContex from "../hooks/useStateContex";
import {useNavigate} from "react-router-dom"

const getFreshModelObject = () => ({
  participantEmail: "",
  participantName: "",
});

const Login = () => {
  const { values, setValues, errors, setErrors, handleInputChange } =
    useForm(getFreshModelObject);
  const { context, setContext, resetContext } = useStateContex();
  const navigate = useNavigate();

  useEffect(() => {
    resetContext();
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINT.participant)
        .post(values)
        .then((res) => {
          setContext({participantId: res.data.participantId});
          navigate("/quiz");
        })
        .catch((err) => console.log(err));
    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.participantEmail)
      ? ""
      : "Email is invalid!";
    temp.name = values.participantName != "" ? "" : "This field is required!";
    setErrors(temp);
    return Object.values(temp).every((x) => x == "");
  };
  return (
    <Center>
      
      <Card sx={{ width: 400 }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={login}>
              <TextField
                label="Email"
                name="participantEmail"
                variant="outlined"
                type="email"
                value={values.email}
                onChange={handleInputChange}
                {...(errors.email && { error: true, helperText: errors.email })}
              />
              <TextField
                label="Name"
                name="participantName"
                variant="outlined"
                type="text"
                value={values.name}
                onChange={handleInputChange}
                {...(errors.name && { error: true, helperText: errors.name })}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%", m: 1 }}
              >
                Login
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
};

export default Login;
