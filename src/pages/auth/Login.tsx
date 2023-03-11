import Logo from '../../assets/logo.png'
import { FieldLabel } from '../../lib/common/Labels'
import { Button } from '../../lib/controls/Button'
import { TextField } from '../../lib/controls/TextField'
import LoginImage from '../../assets/study.jpg'
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { AppContext } from '../../AppContext';
import { useNavigate } from "react-router";
import { IUsersPermissions, IUsersPermissionsLoginInput, UsersPermissionsLoginInput } from '../../models/user'
import { useMutation } from '@apollo/client'
import { USER_LOGIN } from '../../graphql/mutations/users'
import { routes } from '../../constants/menu'

export default function Login() {
  const { setUserWithExpiryDate} = useContext(AppContext);
  const navigate = useNavigate();
  const [login, {loading, error, data}] = useMutation(USER_LOGIN);
  const formik = useFormik<IUsersPermissionsLoginInput>({
      initialValues:UsersPermissionsLoginInput(),
      onSubmit: (_input) => {
        login({variables: _input});
      }
  });

  useEffect(()=>{
    if(error){
      window.pushToast("Username, email, atau password salah", "error");
    }
  },[error]);

  useEffect(()=>{
    if(data && data.login){
      const _authData:IUsersPermissions = data.login;
      if(_authData){
        setUserWithExpiryDate(_authData);
      }
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
            <div className="font-semibold mb-10">Masukkan username/email dan password</div>
            <div className="mb-4">
              <FieldLabel label="Username/Email"/>
              <TextField name="identifier" type="text" placeholder="Masukkan username/email" onChange={formik.handleChange} value={formik.values.identifier}/>
            </div>
            <div className="mb-8">
              <FieldLabel label="Password"/>
              <TextField name="password" type="password" placeholder="Masukkan password" onChange={formik.handleChange} value={formik.values.password}/>
            </div>
            <div className="flex items-center justify-between">
              <Button title="Log In" type="submit" icon="ArrowRightOnRectangleIcon"
                  loading={loading}
              />
              <div>
                <div className="text-xs">
                  Belum punya akun?
                </div>
                <Button title="Registrasi" icon="UserPlusIcon" onClick={()=>navigate(`/${routes.REGISTER}`)}
                    customClass="text-brand-300 hover:text-brand-100"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-white">
          <img src={LoginImage} alt="login" className = "w-full h-full object-cover"/>
        </div>
      </div>
    </form>
  )
}
  