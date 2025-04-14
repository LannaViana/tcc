import { z } from "zod";

const FavSchema = z.object({
    usuarioId: z.number().int().positive(),
    skinId: z.number().int().positive(),
    data: z.string().datetime(),
});

const FavController = {
    async createFav(req, res) {
        try {
            const { usuarioId, skinId, data } = req.body;
            FavSchema.parse({ usuarioId, skinId, data });

            console.log({ usuarioId, skinId, data });

            res.status(201).json({ message: "Favorito criado com sucesso!" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors.map(err => ({
                        campo: err.path[0],
                        mensagem: err.message
                    }))
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async updateFav(req, res) {
        try {
            const { id } = req.params;
            const { usuarioId, skinId, data } = req.body;
            FavSchema.parse({ usuarioId, skinId, data });

            res.status(200).json({
                message: "Favorito atualizado com sucesso!",
                data: { id, usuarioId, skinId, data }
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", errors: error.errors });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async deleteFav(req, res) {
        try {
            const { id } = req.params;

            // lógica para deletar
            res.status(200).json({ message: "Favorito deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    },
};
 
export default FavController;
