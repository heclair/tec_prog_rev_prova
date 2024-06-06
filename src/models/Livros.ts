import mongoose from "mongoose";
import Editora from "./Editora";
const { Schema } = mongoose;

const LivroSchema = new Schema({
    editora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editora',
        required: true,
        validate: {
            validator: async function (id: string) {
                const editora = await Editora.findById(id); // verifica se id existe na coleção editoras
                return !!editora; // true se a editora existir
            },
            message: 'A Editora fornecida não existe!',
        }
    },
    titulo: { type: String, maxlength: 100, required: true },
    paginas: { type: Number, required: true }
});

export default mongoose.model("Livros", LivroSchema, "livro");
