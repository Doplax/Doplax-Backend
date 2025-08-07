# Common Backend for Projects (NestJS)

This project is a **common backend** designed to serve as a unified backend for multiple applications, avoiding the need to develop a separate backend for each project. By centralizing backend logic, maintenance, scalability, and development efficiency are improved.

**🎉 Recently migrated from Express.js to NestJS!**

Currently, this backend serves the following projects:
- [NodePop Frontend](https://github.com/Doplax/NodePop-Frontend)
- [Spotify Angular](https://github.com/Doplax/Spotify-Angular)

---

## Migration Notes

This project has been successfully migrated from Express.js to NestJS while maintaining the modular structure:

### ✅ Migrated Modules
- **Auth Module**: Authentication with register, login, and JWT guards
- **Tracks Module**: Music tracks management with full REST API
- **Email Module**: Contact email functionality

### 🔄 In Progress
- **Wallapop Module**: Products and images management
- **Swagger Module**: API documentation system
- **Locales Module**: Internationalization

### New Structure
```
src/
├── main.ts              # NestJS entry point
├── app.module.ts        # Root module
└── modules/
    ├── auth/           # Authentication module
    ├── tracks/         # Music tracks module
    ├── email/          # Email module
    └── ...
```

---

## Key Features

- **NestJS Framework**: Modern, scalable Node.js backend framework
- **Data Validation**: Using class-validator and DTOs for type safety
- **MongoDB Connection**: Uses MongoDB with Mongoose ODM
- **Swagger Documentation**: Automatic API documentation generation
- **Modular Architecture**: Clean separation of concerns with NestJS modules
- **Docker Support**: Enables running the backend in containers using `docker-compose`

---

## Technologies Used

### Core Dependencies
- **Node.js**: Runtime environment.
- **Express.js**: Framework for building fast and scalable APIs.
- **Mongoose**: ODM for interacting with MongoDB.
- **JWT (jsonwebtoken)**: Used for token-based authentication.
- **Swagger**: For dynamic API documentation generation.
- **i18n**: For internationalization.

### Development Tools
- **ESLint**: Linter to maintain clean and consistent code.
- **Nodemon**: Development tool for automatic server restarts.
- **Cross-Env**: For configuring environment variables.
- **Docker**: To run the backend in containers.
- **EJS**: Template engine.

---

## Installation and Configuration

1. **Clone this repository**:
   ```bash
   git clone https://github.com/Doplax/NodePop-Backend.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and add the following variables:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<databaseName>
   ```

4. **Start the server**:
   ```bash
   # Development mode with hot reload
   npm run start:dev
   
   # Production mode
   npm run build && npm start
   ```
   The server will be available at [http://localhost:4000](http://localhost:4000).

5. **Optional: Run in Docker mode**:
   ```bash
   npm run init-docker
   ```

---

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

---

## API Documentation

API documentation is available via Swagger. Once the server is running, you can access it at:
[http://localhost:4000/api/swaggerDocs/swagger-ui](http://localhost:4000/api/swaggerDocs/swagger-ui)

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users

#### Tracks
- `GET /api/tracks` - Get all music tracks
- `GET /api/tracks/:id` - Get track by ID
- `POST /api/tracks` - Create new track
- `PATCH /api/tracks/:id` - Update track
- `DELETE /api/tracks/:id` - Delete track

#### Email
- `POST /api/email/contactMe` - Send contact email

---

## License

This project is distributed under the **ISC** license. For more details, see the `LICENSE` file.

---

## Author

**Pol Valle**  
- [LinkedIn](https://www.linkedin.com/in/pol-valle-montes/)  
- [GitHub](https://github.com/Doplax)  

---
