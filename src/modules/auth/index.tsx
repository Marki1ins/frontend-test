import "./index.css";

import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import PageTitle from "../../components/page-title";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginPayload = {
  user: string;
  pass: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState("");

  const loginSchema = z.object({
    user: z.string().min(1, "Informe o usuário"),
    pass: z.string().min(1, "Informe a senha"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: LoginPayload) => {
    const { user, pass } = data;
    const success = login(user, pass);
    if (success) navigate({ to: "/news" });
    else setError("Usuário ou senha inválidos");
  };

  return (
    <form
      className="login"
      onSubmit={handleSubmit((data) => handleLogin(data))}
    >
      <PageTitle title="Entre" />

      <input placeholder="Usuário" {...register("user")} />
      {errors.user && <p>{errors.user.message}</p>}

      <input type="password" placeholder="Senha" {...register("pass")} />
      {errors.pass && <p>{errors.pass.message}</p>}

      {error && <p>{error}</p>}

      <button type="submit">Entrar</button>
    </form>
  );
}
