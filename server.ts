import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env antes de importar Prisma

import { PrismaClient } from '@prisma/client';
import { generateToken, verifyToken, hashPassword, comparePassword } from './src/lib/auth';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mentha-bd.vercel.app'  // ← Agrega tu URL de Vercel
  ],
  credentials: true
}));
app.use(express.json()); 

// Interfaces
interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    rol: string;
  };
}

// Middleware de autenticación
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(403).json({ success: false, message: 'Token inválido o expirado' });
  }

  req.user = payload;
  next();
};

const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.rol !== 'admin') {
    return res.status(403).json({ success: false, message: 'Acceso denegado. Solo administrador' });
  }
  next();
};

const requireStaff = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.rol !== 'staff' && req.user?.rol !== 'admin') {
    return res.status(403).json({ success: false, message: 'Acceso denegado' });
  }
  next();
};

// Inicializar servicios de ejemplo
const initializeServices = async () => {
  try {
    const count = await prisma.servicio.count();
    if (count === 0) {
      await prisma.servicio.createMany({
        data: [
          {
            nombre: 'Corte de Cabello',
            descripcion: 'Corte profesional personalizado',
            duracion_minutos: 30,
            precio: 25,
            activo: true
          },
          {
            nombre: 'Coloración',
            descripcion: 'Cambio de color con tinte profesional',
            duracion_minutos: 60,
            precio: 60,
            activo: true
          },
          {
            nombre: 'Tratamiento Capilar',
            descripcion: 'Hidratación y regeneración del cabello',
            duracion_minutos: 45,
            precio: 50,
            activo: true
          },
          {
            nombre: 'Manicura',
            descripcion: 'Cuidado completo de manos',
            duracion_minutos: 30,
            precio: 20,
            activo: true
          },
          {
            nombre: 'Pedicura',
            descripcion: 'Cuidado completo de pies',
            duracion_minutos: 40,
            precio: 30,
            activo: true
          }
        ]
      });
      console.log('✓ Servicios inicializados correctamente');
    }

    // Crear usuario admin por defecto si no existe
    const adminExists = await prisma.usuario.findUnique({
      where: { email: 'admin@mentha.com' }
    });
    
    if (!adminExists) {
      const hashedPassword = await hashPassword('admin123456');
      await prisma.usuario.create({
        data: {
          email: 'admin@mentha.com',
          password: hashedPassword,
          nombre: 'Administrador',
          rol: 'admin',
          activo: true
        }
      });
      console.log('✓ Usuario admin creado: admin@mentha.com / admin123456');
    }
  } catch (error) {
    console.error('Error initializing:', error);
  }
};

// Rutas API

// Obtener servicios
app.get('/api/servicios', async (req, res) => {
  try {
    const servicios = await prisma.servicio.findMany({
      where: { activo: true }
    });

    res.json({
      success: true,
      data: servicios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener servicios'
    });
  }
});

// Rutas API
app.post('/api/citas', async (req, res) => {
  try {
    const { nombre, telefono, correo, servicio_id, fecha, hora, notas } = req.body;

    // Validación básica
    if (!nombre || !telefono || !correo || !servicio_id || !fecha || !hora) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    // Crear cliente
    let cliente = await prisma.cliente.findUnique({
      where: { email: correo }
    });

    if (!cliente) {
      const [first, ...rest] = nombre.split(' ');
      cliente = await prisma.cliente.create({
        data: {
          nombre: first,
          apellido: rest.join(' ') || first,
          email: correo,
          telefono
        }
      });
    }

    // Crear cita
    const fechaHora = new Date(`${fecha}T${hora}:00`);
    const cita = await prisma.cita.create({
      data: {
        cliente_id: cliente.id,
        servicio_id: parseInt(servicio_id),
        fecha_hora: fechaHora,
        estado: 'pendiente',
        notas: notas || null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Cita creada exitosamente',
      data: {
        cita_id: cita.id
      }
    });
  } catch (error) {
    console.error('Error creating cita:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear la cita'
    });
  }
});

// Obtener todas las citas
app.get('/api/citas', async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      include: {
        cliente: true,
        servicio: true
      }
    });

    res.json({
      success: true,
      data: citas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Obtener cita por ID
app.get('/api/citas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await prisma.cita.findUnique({
      where: { id: parseInt(id) },
      include: {
        cliente: true,
        servicio: true
      }
    });

    if (!cita) {
      return res.status(404).json({
        success: false,
        message: 'Cita no encontrada'
      });
    }

    res.json({
      success: true,
      data: cita
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Actualizar cita
app.put('/api/citas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notas } = req.body;

    const cita = await prisma.cita.update({
      where: { id: parseInt(id) },
      data: {
        ...(estado && { estado }),
        ...(notas !== undefined && { notas })
      },
      include: {
        cliente: true,
        servicio: true
      }
    });

    res.json({
      success: true,
      message: 'Cita actualizada exitosamente',
      data: cita
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Eliminar cita
app.delete('/api/citas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cita.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Cita eliminada exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ============= ENDPOINTS DE AUTENTICACIÓN =============

// Login
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña requeridos'
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const validPassword = await comparePassword(password, usuario.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    const token = generateToken({
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    });

    res.json({
      success: true,
      token,
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al login'
    });
  }
});

// ============= ENDPOINTS DE USUARIOS (ADMIN ONLY) =============

// Obtener todos los usuarios
app.get('/api/usuarios', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nombre: true,
        rol: true,
        activo: true,
        createdAt: true
      }
    });

    res.json({
      success: true,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener usuarios'
    });
  }
});

// Crear usuario (ADMIN ONLY)
app.post('/api/usuarios', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, nombre, rol } = req.body;

    if (!email || !password || !nombre) {
      return res.status(400).json({
        success: false,
        message: 'Email, contraseña y nombre requeridos'
      });
    }

    const existingUser = await prisma.usuario.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    const hashedPassword = await hashPassword(password);
    const usuario = await prisma.usuario.create({
      data: {
        email,
        password: hashedPassword,
        nombre,
        rol: rol || 'staff',
        activo: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear usuario'
    });
  }
});

// Actualizar usuario (ADMIN ONLY)
app.put('/api/usuarios/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, rol, activo, password } = req.body;

    const updateData: any = {};
    if (nombre) updateData.nombre = nombre;
    if (rol) updateData.rol = rol;
    if (activo !== undefined) updateData.activo = activo;
    if (password) updateData.password = await hashPassword(password);

    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: updateData,
      select: {
        id: true,
        email: true,
        nombre: true,
        rol: true,
        activo: true
      }
    });

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar usuario'
    });
  }
});

// Eliminar usuario (ADMIN ONLY)
app.delete('/api/usuarios/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar usuario'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 API servidor ejecutándose en http://localhost:${PORT}`);
  await initializeServices();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
