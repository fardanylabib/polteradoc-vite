import Logo from '../../assets/logo.png'
import { FieldLabel } from '../../lib/common/Labels'
import { Button } from '../../lib/controls/Button'
import { TextField } from '../../lib/controls/TextField'
import RegisterImage from '../../assets/register.jpg'
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../AppContext';
import { useNavigate } from "react-router";
import { IUsersPermissionsRegisterInput, UsersPermissionsRegisterInput } from '../../models/user'
import { useMutation } from '@apollo/client'
import {  USER_REGISTER } from '../../graphql/mutations/users'
import { routes } from '../../constants/menu'

export default function Register() {
  const {removeUserAuth, setUserWithExpiryDate} = useContext(AppContext);
  const navigate = useNavigate();
  const [register, {loading, error, data}] = useMutation(USER_REGISTER);
  const formik = useFormik<IUsersPermissionsRegisterInput>({
    initialValues:UsersPermissionsRegisterInput(),
    onSubmit: async (_input) => {
      register({variables: _input});
    }
  });

  useEffect(()=>{
    if(error){
      console.log(JSON.stringify(error));
      window.pushToast("Username atau email sudah digunakan", "error");
    }
  },[error]);

  useEffect(()=>{
    if(data){
      console.log(data);
    }
  },[data]);

  return (
    <form onSubmit={formik.handleSubmit} className="fixed inset-0 bg-slate-100 flex flex-col justify-center">
      <div className="w-full h-full md:w-3/5 md:h-auto mx-auto md:rounded-2xl bg-white shadow-xl flex overflow-hidden">
        <div className="w-1/2 overflow-hidden">
          <div className="flex items-center mb-5 font-semibold rounded-br-full bg-brand-300 p-3">
            <img src={Logo} height={40} width={40} alt="brand"/>
            <span className="ml-3 text-white ">Sistem Informasi Manajemen <br/>On Job Training</span>
          </div>
          <div className="p-6">
            <div className="font-semibold mb-10">Registrasi Akun</div>
            <div className="mb-4">
              <FieldLabel label="Username"/>
              <TextField name="username" type="text" placeholder="Masukkan username" onChange={formik.handleChange} value={formik.values.username}/>
            </div>
            <div className="mb-4">
              <FieldLabel label="Email"/>
              <TextField name="email" type="text" placeholder="email@saya.com" onChange={formik.handleChange} value={formik.values.email}/>
            </div>
            <div className="mb-8">
              <FieldLabel label="Password"/>
              <TextField name="password" type="password" placeholder="Masukkan password" onChange={formik.handleChange} value={formik.values.password}/>
            </div>
            <div className="flex items-center justify-between">
              <Button title="Register" type="submit" icon="UserPlusIcon"
                loading={loading}
              />
              <div>
                <div className="text-xs">
                  Sudah punya akun?
                </div>
                <Button title="Login" icon="ArrowRightOnRectangleIcon" onClick={()=>navigate("/")}
                      customClass="text-brand-300 hover:text-brand-100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-white">
          <img src={RegisterImage} alt="register" className = "w-full h-full object-cover"/>
        </div>
      </div>
    </form>
  )
}
  