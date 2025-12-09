import { createLazyFileRoute } from "@tanstack/react-router";
import App from "../modules/cpf";

export const Route = createLazyFileRoute("/")({
  component: App,
});