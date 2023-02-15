import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import AppApiConfig from "../../assets/config/AppApiConfig";
import AppRoutingConfig from "../../assets/config/AppRoutingConfig";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import axios from "axios";
// import UserSessionService from '../common/UserSessionService';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {Header, PopUpContainer, Input, Button, MainContainer, SignInForm, InputContainer, ErrorContainer } from "./Register.styled";
import UserSessionService from '../../common/UserSessionService';

function Register(){
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { isAuthenticated, userAuthenticated } = useAppContext();
  const { userName, setUserName } = useAppContext();
  const { userEmail, setUserEmail } = useAppContext();
  const { authenticatedToken, setAuthenticatedToken } = useAppContext();

  const navigate = useNavigate();
  /* Dependencies for default values and validation */
  const defaultValues = {
    name:"",
    email: "",
    password: "",
    confirmPassword:""
  };

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email('Please enter a valid email'),
    password: yup.string().required("Password is required"),
    confirmPassword : yup.string().required('Confirm your password').test('Unique password','Passwords does not match',async function(value){
      if(value && value !== undefined && value !== ""){
        return value === this.parent.password
      }
      return false
    })
  });

  const { handleSubmit, watch, control, formState, getValues, setValue } = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const form = watch()
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

    const dataToBeSent = {};
    dataToBeSent.name = form.name;
    dataToBeSent.email = form.email;
    dataToBeSent.password = form.password;


    axios.post(AppApiConfig.API_REGISTER_URL, dataToBeSent).then((resp) => {
      const res = resp.data;
      console.log(res.data);

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
    });
  };

    return (
        <>
    <MainContainer>
    <SignInForm
    id="registerForm"
    name="registerForm"
    onSubmit={handleSubmit(onSubmit)}
    >
      <Header>Register</Header>
      <InputContainer>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
        <Input {...field} active={!!errors?.name} id="name" type="text" placeholder="Name" />
        )}
        />
        <ErrorContainer>
        {errors && errors?.name && errors?.name?.message}
        </ErrorContainer>
      </InputContainer>

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

      <InputContainer>
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input {...field} active={!!errors?.confirmPassword} id="confirmPassword" type="password" placeholder="Confirm Password" />
        )}
        />
        <ErrorContainer>
        {errors && errors?.confirmPassword && errors?.confirmPassword?.message}
        </ErrorContainer>
      </InputContainer>
      
      <Button type="submit" id="registerForm" form="registerForm" disabled={isSubmitDisabled}>Register</Button>
      <Link style={{
        color:'black',
        fontSize:'15px'
      }} 
      to={'/sign-in'}>Already have an account? Sign In</Link>
    </SignInForm>
    </MainContainer>
        </>
    )
}

export default Register