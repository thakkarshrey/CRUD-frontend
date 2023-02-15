import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import AppApiConfig from "../../assets/config/AppApiConfig";
import AppRoutingConfig from "../../assets/config/AppRoutingConfig";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import axios from "axios";
import UserSessionService from '../../common/UserSessionService';
import {Header, PopUpContainer, Input, Button, MainContainer, SignInForm, InputContainer, ErrorContainer } from "./SignIn.styled";
import Snackbar from "../../components/snackbar/Snackbar";

export default function SignIn() {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { isAuthenticated, userAuthenticated } = useAppContext();
  const { userName, setUserName } = useAppContext();
  const { userEmail, setUserEmail } = useAppContext();
  const { authenticatedToken, setAuthenticatedToken } = useAppContext();

  /*Snackbar rendering */
  const [showToast,setShowToast] = useState(false)
  const [toastMessage,setToastMessage] = useState("")
  const [toastColor,setToastColor] = useState("")
  /*Snackbar rendering */

  const navigate = useNavigate();
  /* Dependencies for default values and validation */
  const defaultValues = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email('Please enter a valid email'),
    password: yup.string().required("Password is required"),
  });

  const { handleSubmit, control, formState, getValues, setValue } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, errors, dirtyFields } = formState;
  /* Dependencies for default values and validation */

  const checkIsSubmitDisabled = () => {
    var tempIsSubmitDisabled = false;
    if (!isValid || !dirtyFields) {
      tempIsSubmitDisabled = true;
    }
    setIsSubmitDisabled(tempIsSubmitDisabled);
  };

  useEffect(() => {
    console.log(isAuthenticated, "isAuhenticated");
    if (isAuthenticated === true) {
      navigate(AppRoutingConfig.APP_USER_LIST_PATH_URL);
      return;
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    checkIsSubmitDisabled();
  }, [isValid, dirtyFields]);

  const onSubmit = (formData) => {
    if (isSubmitDisabled) {
      return;
    }

    const dataToBeSent = formData;
    console.log('dataToBeSent',dataToBeSent)

    axios.post(AppApiConfig.API_SIGN_IN_URL, dataToBeSent).then((resp) => {
      const res = resp.data;
      console.log('res.status',res.status);
      console.log('res.data',res);

      if (res.status > 0) {
        const usrName = res.name;
        const usrEmail = res.email;
        const token = res.authtoken;

        UserSessionService.setUser(usrName,usrEmail,token)
        userAuthenticated(true);
        setUserName(usrName);
        setUserEmail(usrEmail);
        setAuthenticatedToken(token);

        navigate(AppRoutingConfig.APP_USER_LIST_PATH_URL)

      }
      setShowToast(true)
      setToastMessage(res?.message)
      setToastColor(res.status > 0 ? 'green' : 'red' )
      
      setTimeout(()=>{
        setShowToast(false)
        setToastMessage("")
        setToastColor("")
      },3000)
      
    });
  };

  console.log('errors?.email',errors)

  return (
    <>
      <MainContainer>
    <SignInForm
    id="signinForm"
    name="signinForm"
    onSubmit={handleSubmit(onSubmit)}
    >
      <Header>Sign In</Header>
      <InputContainer>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
        <Input {...field} active={!!errors?.email} id="email" type="email" placeholder="Email" onError={"error"} />
        )}
        />
        <ErrorContainer>
        {errors && errors?.email && errors?.email?.message}
        </ErrorContainer>
      </InputContainer>

      <InputContainer>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input {...field} active={!!errors?.password} id="password" type="password" placeholder="Password" />
        )}
        />
        <ErrorContainer>
        {errors && errors?.password && errors?.password?.message}
        </ErrorContainer>
      </InputContainer>
      
      <Button type="submit" id="signinForm" form="signinForm" disabled={isSubmitDisabled}>Sign In</Button>
      <Link style={{
        color:'black',
        fontSize:'15px'
      }} 
      to={'/register'}>Don't have an account? Register</Link>
    </SignInForm>
    </MainContainer>
    <Snackbar showToast={showToast} message={toastMessage} backgroundColor={toastColor}/>
    </>
  );
}


const showToastMessage = () => {
  
}