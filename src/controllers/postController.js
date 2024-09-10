const Post = require('../models/postModel');

// Listar todos os posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar posts' });
    }
};

// Criar novo post
exports.createPost = async (req, res) => {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar post' });
    }
};

// Atualizar post
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content, author }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar post' });
    }
};

// Deletar post
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar post' });
    }
};

// Buscar post por palavra-chave
exports.searchPosts = async (req, res) => {
    const { query } = req.query;
    try {
        const posts = await Post.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { content: { $regex: query, $options: 'i' } }] });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erro na busca' });
    }
};
