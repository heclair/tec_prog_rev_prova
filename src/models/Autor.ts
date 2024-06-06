import mongoose, { now } from "mongoose";
const { Schema } = mongoose;

const AutorSchema = new Schema(
  {
    nome: {
      type: String,
      maxlength: [50, "O nome pode ter no máximo 50 caracteres"],
      required: true,
    },
    cpf: {
      type: String,
      maxlenght: 11,
      minLenght: 11,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          if (typeof value !== "string") {
            return false;
          }
          value = value.replace(/[^\d]+/g, "");
          if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
            return false;
          }
          const values = value.split("").map((el) => +el);
          const rest = (count: number) =>
            ((values
              .slice(0, count - 12)
              .reduce((soma, el, index) => soma + el * (count - index), 0) *
              10) %
              11) %
            10;
          return rest(10) === values[9] && rest(11) === values[10];
        },
        message: (props: any) => `${props.value} não é um CPF válido!`,
      },
    },
    data_nasc: { type: Date },
    email: {
      type: String,
      maxlength: [60, "O e-mail pode ter no máximo 60 caracteres"],
      unique: true,
      required: [true, "O e-mail é obrigatório"],
      validate: {
        validator: function (value: string) {
          // expressão regular para validar o formato do e-mail
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(value);
        },
        message: (props: any) =>
          `${props.value} não é um formato de e-mail válido`,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Autor", AutorSchema, "autor");
