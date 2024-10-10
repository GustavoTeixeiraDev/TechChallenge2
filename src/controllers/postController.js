const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar posts." });
    }
  };

exports.getPostById = async (req, res) => {
try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post não encontrado." });
    res.status(200).json(post);
} catch (error) {
    res.status(500).json({ message: "Erro ao buscar o post." });
}
};

exports.createPost = async (req, res) => {
try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json(newPost);
} catch (error) {
    res.status(500).json({ message: "Erro ao criar o post." });
}
};


exports.updatePost = async (req, res) => {
try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
    return res.status(404).json({ message: "Post não encontrado." });
    }
    res.status(200).json(updatedPost);
} catch (error) {
    console.error("Erro ao atualizar o post:", error);
    res.status(500).json({ message: "Erro ao atualizar o post." });
}
};


exports.deletePost = async (req, res) => {
try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post não encontrado." });
    res.status(200).json({ message: "Post excluído com sucesso." });
} catch (error) {
    res.status(500).json({ message: "Erro ao excluir o post." });
}
};

exports.searchPosts = async (req, res) => {
    const searchTerm = req.query.q;

    // Verificar se o termo de busca foi fornecido
    if (!searchTerm) {
      console.log("Termo de busca não fornecido");
      return res.status(400).json({ message: "Por favor, forneça um termo de busca." });
    }

    console.log(`Termo de busca recebido: ${searchTerm}`);

    try {
      // Verificar a consulta antes de rodá-la
      const posts = await Post.find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { content: { $regex: searchTerm, $options: 'i' } }
        ]
      });

      console.log(`Posts encontrados: ${posts.length}`);

      if (posts.length === 0) {
        return res.status(404).json({ message: "Nenhum post encontrado com esse termo." });
      }

      res.status(200).json(posts);
    } catch (error) {
      console.error("Erro ao buscar posts:", error); // Mostrar erro exato
      res.status(500).json({ message: "Erro ao buscar posts.", error: error.message });
    }
  };
