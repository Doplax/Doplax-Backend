# Doplax Backend - Modular Architecture

Este backend ha sido reestructurado para utilizar una arquitectura modular similar a NestJS, mejorando la mantenibilidad y la separación de responsabilidades.

## Nueva Estructura 

```
src/
├── modules/              # Arquitectura modular (NUEVA)
│   ├── auth/            # Módulo de autenticación
│   │   ├── authController.ts
│   │   ├── authValidator.ts
│   │   ├── auth.ts      # Routes
│   │   └── index.ts     # Exports del módulo
│   ├── products/        # Módulo de productos
│   │   ├── productController.ts
│   │   ├── productValidator.ts
│   │   ├── products.ts  # Routes
│   │   └── index.ts
│   ├── tracks/          # Módulo de tracks
│   ├── email/           # Módulo de email
│   └── images/          # Módulo de imágenes
├── shared/              # Componentes compartidos (NUEVA)
│   ├── config/          # Configuraciones
│   ├── models/          # Modelos de base de datos
│   ├── utils/           # Funciones utilitarias
│   ├── middlewares/     # Middlewares comunes
│   ├── docs/            # Documentación API
│   └── index.ts         # Exports compartidos
└── [estructura original] # Mantenida para compatibilidad
```

## Cómo usar la nueva estructura

### Importar desde módulos:
```typescript
import { authRoutes } from "../modules/auth";
import { productRoutes } from "../modules/products";
```

### Importar desde shared:
```typescript
import { User, handleHttpError, authMiddleware } from "../shared/index";
```

## Alias de Path configurados

En `tsconfig.json` se han configurado los siguientes alias:

```json
{
  "paths": {
    "@/*": ["*"],
    "@shared/*": ["shared/*"],
    "@modules/*": ["modules/*"],
    "@auth/*": ["modules/auth/*"],
    "@products/*": ["modules/products/*"],
    "@tracks/*": ["modules/tracks/*"],
    "@email/*": ["modules/email/*"],
    "@images/*": ["modules/images/*"]
  }
}
```

## Beneficios de la nueva arquitectura

1. **Separación clara de responsabilidades** - Cada módulo maneja su propio dominio
2. **Reutilización de código** - Los elementos compartidos están en `/shared`
3. **Escalabilidad** - Fácil agregar nuevos módulos sin afectar los existentes
4. **Mantenibilidad** - Código más organizado y fácil de mantener
5. **Compatibilidad** - La estructura original se mantiene intacta

## Estado actual

✅ **COMPLETADO** - La aplicación funciona correctamente con ambas estructuras (original y modular)

- TypeScript compila sin errores
- Todas las rutas funcionan
- Modelos y controladores correctamente organizados
- Middlewares y utilidades compartidas
- Documentación Swagger funcional