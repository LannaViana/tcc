import { z } from "zod";

const MyJobSchema = z.object({
    usuarioId: z.number().int().positive(),
    skinId: z.number().int().positive(),
    dataCriacao: z.string().datetime(),
    status: z.enum(["ativo", "revisao", "rejeitado"]).default("revisao"),
});

const MyJobsController = {
    async createMyJob(req, res) {
        try {
            const { usuarioId, skinId, dataCriacao, status } = req.body;
            MyJobSchema.parse({ usuarioId, skinId, dataCriacao, status });

            console.log({ usuarioId, skinId, dataCriacao, status });

            res.status(201).json({ message: "Job criado com sucesso!" });
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

    async updateMyJob(req, res) {
        try {
            const { id } = req.params;
            const { usuarioId, skinId, dataCriacao, status } = req.body;
            MyJobSchema.parse({ usuarioId, skinId, dataCriacao, status });

            res.status(200).json({
                message: "Job atualizado com sucesso!",
                data: { id, usuarioId, skinId, dataCriacao, status }
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", errors: error.errors });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async deleteMyJob(req, res) {
        try {
            const { id } = req.params;

            // lógica para deletar
            res.status(200).json({ message: "Job deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    },
};

export default MyJobsController;
