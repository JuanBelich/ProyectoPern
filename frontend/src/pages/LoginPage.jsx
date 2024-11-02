import { Link, useNavigate } from "react-router-dom";
import {Card, Input, Button, Label, Container} from "../components/ui";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";



function LoginPage() {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signin, errors: loginErrors} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async(data) => {
    const user = await signin(data); //Si el usuario existe, redirigilo, sino no hagas nada, quedate ahi
    if(user) {
      navigate("/tareas");
    }
    
  });


  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {loginErrors && 
          loginErrors.map((error) => (
            // eslint-disable-next-line react/jsx-key
            <p className="bg-red-500  text-white  p-2"> {error}</p> //tuve que agregar la palabra key={1} para que esa linea no me diera error, no sale en el codigo original
        ))}
        <h1 className="text-4xl font-bold my-2 text-center"> Iniciar sesión </h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email"> Email</Label>
          <Input 
            type="email" 
            placeholder="Ingrese su email" 
            {...register("email",{
              required: true,
          })}
          ></Input>
          {
            errors.email && <p className="text-red-500">Este campo es requerido</p>
          }
          <Label htmlFor="password"> Contraseña </Label>
          <Input 
            type="password"
            placeholder="Ingrese su contraseña"
            {...register("password",{
              required: true,
            })}
            ></Input>
            {
            errors.password && <p className="text-red-500">Este campo es requerido</p>
          }
          <Button> Ingresar </Button>
        </form>
        <div className="flex justify-between my-4">
          <p className="mr-4"> ¿No tienes cuenta? </p>
          <Link to="/register"> Registrate </Link>
        </div>
      </Card>

    </Container>
  );
}

export default LoginPage