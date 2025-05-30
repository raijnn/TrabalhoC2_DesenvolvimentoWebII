import prisma from "../lib/prisma";

class UserServices {
    constructor() {}

    async listUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createUser(data: { email: string; name?: string }) {
        try {
            const user = await prisma.user.create({ data });
            return user;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateUser(id: number, data: { email?: string; name?: string }) {
        try {
            const updated = await prisma.user.update({
            where: { id },
            data
            });
            return updated;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteUser(id: number) {
        try {
            await prisma.user.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new UserServices();
