import prisma from "../lib/prisma";

class PostService {
    static async listPosts() {
        try {
            const posts = await prisma.user.findMany();
            return posts;
        } catch (error) {
            throw new Error("erro ao listar posts");
        }
    }

    static async createPost(title: string, content: string, published: boolean, authorId: number) {
        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    published,
                    authorId
                },
            });
            return newPost;
        } catch (error) {
            throw new Error("erro ao criar post");
        }
    }

    static async updatePost(id: number, title?: string, content?: string, published?: boolean) {
        try {
            const updatedPost = await prisma.post.update({
                where: { id },
                data: {
                    title,
                    content,
                    published
                },
            });
            return updatedPost;
        } catch (error) {
            throw new Error("erro ao atualizar post");
        }
    }

    static async deletePost(id: number) {
        try {
            await prisma.post.delete({
                where: { id },
            });
            return { message: "post deletado" };
        } catch (error) {
            throw new Error("erro ao deletar post");
        }
    }

    static async getPostById(id: number) {
        try {
            const post = await prisma.post.findUnique({
                where: { id },
                include: { author: true },
            });
            return post;
        } catch (error) {
            throw new Error("erro ao buscar post");
        }
    }
}

export default PostService;
