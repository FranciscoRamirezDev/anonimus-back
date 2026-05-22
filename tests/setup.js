const mockModel = {
  create: jest.fn(),
  findAll: jest.fn(),
  findAndCountAll: jest.fn(),
  findByPk: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  hasMany: jest.fn(),
  belongsTo: jest.fn(),
  hasOne: jest.fn(),
  belongsToMany: jest.fn(),
};

jest.mock('../src/config/db', () => ({
  define: jest.fn(() => ({ ...mockModel })),
  authenticate: jest.fn().mockResolvedValue(true),
  sync: jest.fn().mockResolvedValue(true),
}));

jest.mock('../src/models', () => ({
  Usuario: { ...mockModel },
  Comunidad: { ...mockModel },
  Publicacion: { ...mockModel },
  Comentario: { ...mockModel },
  Reaccion: { ...mockModel },
  Reto: { ...mockModel },
  Notificacion: { ...mockModel },
  Administrador: { ...mockModel },
  Reporte: { ...mockModel },
}));
