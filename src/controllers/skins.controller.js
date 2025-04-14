import { z } from "zod";

const SkinSchema = z.object({
    nome: z.string().min(2),
    tipo: z.enum(["raro", "epico", "lendario", "comum"]), // exemplo, você pode mudar
    preco: z.number().nonnegative(),
    disponivel: z.string(),
    descricao: z.string().optional(),
});

const SkinsController = {
    async createSkin(req, res) {
        try {
            const { nome, tipo, preco, disponivel, descricao } = req.body;
            SkinSchema.parse({ nome, tipo, preco, disponivel, descricao });

            console.log({ nome, tipo, preco, disponivel, descricao });

            res.status(201).json({ message: "Skin criada com sucesso!" });
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

    async updateSkin(req, res) {
        try {
            const { id } = req.params;
            const { nome, tipo, preco, disponivel, descricao } = req.body;
            SkinSchema.parse({ nome, tipo, preco, disponivel, descricao });

            res.status(200).json({
                message: "Skin atualizada com sucesso",
                data: { id, nome, tipo, preco, disponivel, descricao }
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", errors: error.errors });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async deleteSkin(req, res) {
        try {
            const { id } = req.params;

            // lógica para deletar
            res.status(200).json({ message: "Skin deletada com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    },
};

export default SkinsController;
