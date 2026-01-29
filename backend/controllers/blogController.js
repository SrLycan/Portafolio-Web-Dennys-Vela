import BlogPost from '../models/BlogPost.js';

// @desc    Obtener todos los posts públicos
// @route   GET /api/blog
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const { categoria, etiqueta, page = 1, limit = 10 } = req.query;

    const query = { publicado: true };

    if (categoria) {
      query.categoria = categoria;
    }

    if (etiqueta) {
      query.etiquetas = etiqueta;
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-contenido');

    const count = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener post por slug
// @route   GET /api/blog/:slug
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug,
      publicado: true 
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Incrementar vistas
    post.vistas += 1;
    await post.save();

    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Obtener todos los posts (incluyendo no publicados)
// @route   GET /api/blog/admin/all
// @access  Private/Admin
export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Crear nuevo post
// @route   POST /api/blog
// @access  Private/Admin
export const createPost = async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Post creado exitosamente',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Actualizar post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Post actualizado exitosamente',
      data: updatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Eliminar post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: 'Post eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Publicar/Despublicar post
// @route   PATCH /api/blog/:id/toggle-publish
// @access  Private/Admin
export const togglePublish = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    post.publicado = !post.publicado;
    await post.save();

    res.json({
      success: true,
      message: `Post ${post.publicado ? 'publicado' : 'despublicado'} exitosamente`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
