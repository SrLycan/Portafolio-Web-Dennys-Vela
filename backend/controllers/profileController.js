import Profile from '../models/Profile.js';

// @desc    Obtener perfil público
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Crear o actualizar perfil
// @route   PUT /api/profile
// @access  Private/Admin
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (profile) {
      // Actualizar perfil existente
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      // Crear nuevo perfil
      profile = await Profile.create(req.body);
    }

    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Agregar educación
// @route   POST /api/profile/educacion
// @access  Private/Admin
export const addEducacion = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    profile.educacion.push(req.body);
    await profile.save();

    res.json({
      success: true,
      message: 'Educación agregada exitosamente',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Eliminar educación
// @route   DELETE /api/profile/educacion/:id
// @access  Private/Admin
export const deleteEducacion = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    profile.educacion = profile.educacion.filter(
      item => item._id.toString() !== req.params.id
    );

    await profile.save();

    res.json({
      success: true,
      message: 'Educación eliminada exitosamente',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Agregar proyecto
// @route   POST /api/profile/proyectos
// @access  Private/Admin
export const addProyecto = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    profile.proyectos.push(req.body);
    await profile.save();

    res.json({
      success: true,
      message: 'Proyecto agregado exitosamente',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Eliminar proyecto
// @route   DELETE /api/profile/proyectos/:id
// @access  Private/Admin
export const deleteProyecto = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    profile.proyectos = profile.proyectos.filter(
      item => item._id.toString() !== req.params.id
    );

    await profile.save();

    res.json({
      success: true,
      message: 'Proyecto eliminado exitosamente',
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
