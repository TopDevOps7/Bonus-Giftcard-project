import * as Yup from "yup";

export const validationSchema = Yup.object({
  monto: Yup.number().integer().min(0).max(10000).required(),
  name: Yup.string().max(60).required(),
  email: Yup.string().email().max(60).required(),
  celular: Yup.string().max(10).required(),
  para: Yup.string().max(60),
  friendEmail: Yup.string().email().max(60),
  mensaje: Yup.string().max(500),
});
