import mongoose from "mongoose";
import Livros from "./Livros";
import Autor from "./Autor";
const { Schema } = mongoose;

const AutorLivroSchema = new Schema({
    livro: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Livro', required: true,
        validate: {
            validator: async function (id: string) {
                const livro = await Livros.findById(id); // verifica se id existe na coleção livros
                return !!livro; // true se o livro existir
            },
            message: 'O Livro fornecido não existe!',
        }
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true,
        validate: {
            validator: async function (id: string) {
                const autor = await Autor.findById(id); // verifica se id existe na coleção autores
                return !!autor; // true se o autor existir
            },
            message: 'O Autor fornecido não existe!',
        }
    }
});

export default mongoose.model("Autor_Livro", AutorLivroSchema, "autor_livro");
