import { z } from "zod";

const UserSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    bio: z.string().optional(),
});

const UserController = {
    async createUser(req, res) {
        try {
            const { username, email, password, bio } = req.body;
            UserSchema.parse({ username, email, password, bio });

            // Aqui vai a lógica pra salvar no banco
            console.log({ username, email, password, bio });

            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: error.errors.map(err => ({
                        field: err.path[0],
                        message: err.message
                    }))
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { username, email, password, bio } = req.body;
            UserSchema.parse({ username, email, password, bio });

            // Atualização no banco
            res.status(200).json({ message: "User updated", data: { id, username, email, bio } });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Validation error", errors: error.errors });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            // Lógica para deletar
            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },
};

export default UserController;
