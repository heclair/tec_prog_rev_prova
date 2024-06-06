import mongoose from "mongoose";
const { Schema } = mongoose;

const EditoraSchema = new Schema({
    razao: { type: String, maxlength: 50, required: true },
    cnpj: {
        type: String,
        minlength: 14,
        maxlength: 14,
        unique: true,
        validate: {
            validator: function (value: string) {
                // expressão regular para validar o formato do e-mail
                var b: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
                var c: string = String(value).replace(/[^\d]/g, '')

                if (c.length !== 14)
                    return false

                if (/0{14}/.test(c))
                    return false

                for (var i = 0, n = 0; i < 12; n += Number(c[i]) * b[++i]);
                if (Number(c[12]) != (((n %= 11) < 2) ? 0 : 11 - n))
                    return false

                for (var i = 0, n = 0; i <= 12; n += Number(c[i]) * b[i++]);
                if (Number(c[13]) != (((n %= 11) < 2) ? 0 : 11 - n))
                    return false

                return true
            },
            message: (props: any) =>
                `${props.value} não é um CNPJ válido`,
        },
    }
});

export default mongoose.model("Editora", EditoraSchema, "editora");