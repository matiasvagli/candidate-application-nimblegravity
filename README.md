# Candidate Application

> Aplicación React para postularse a posiciones de trabajo mediante una API REST

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-green)

## Características

-  **Lista de posiciones** - Visualización de trabajos disponibles
-  **Gestión de candidatos** - Obtención de datos por email  
-  **Postulaciones** - Envío de aplicaciones con validación
-  **Estados dinámicos** - Loading, errores y mensajes de éxito
-  **UI** - Interfaz limpia y responsive

## Inicio rápido

```bash
# Clonar repositorio
git clone <repo-url>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción  
npm run build
```

## Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| **React 18** | Biblioteca de UI con hooks |
| **TypeScript** | Tipado estático y mejor DX |
| **Vite** | Build tool y dev server rápido |
| **ESLint** | Linting y calidad de código |

## API Integration

**Base URL:** `https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net`

### Endpoints

```bash
GET  /api/candidate/get-by-email    # Obtener datos del candidato
GET  /api/jobs/get-list            # Lista de posiciones
POST /api/candidate/apply-to-job   # Enviar postulación
```

## Estructura del proyecto

```
src/
├── components/
│   └── JobItem.tsx          # Componente de posición
├── types/
│   ├── job.interface.ts     # Tipos de trabajos
│   ├── candidate.interface.ts # Tipos de candidato  
│   └── application.interface.ts # Tipos de postulación
├── api/
│   └── client.ts            # Cliente API
├── App.tsx                  # Componente principal
└── main.tsx                 # Entry point
```

##  Funcionalidades

- **Validación de formularios** - URLs de GitHub requeridas
- **Manejo de errores** - Feedback claro al usuario
- **Estados de carga** - UX fluida durante requests
- **Tipos seguros** - TypeScript en toda la app

---

<div align="center">
  <sub>Built with ❤️ using React & TypeScript</sub>
</div>

```

