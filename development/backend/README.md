# Node.js Template with Express and TypeScript

This is a boilerplate template for building a scalable REST API using **Node.js**, **Express**, and **TypeScript**. It includes tools and configurations for development, testing, and production, such as **Pino** and **Morgan** for logging, **ESLint** for code linting, **Zod** for schema validation, and **Docker** support. The template ensures consistency with standardized configurations like `.env` formatting and TypeScript setup.

## Features

- **Express** for building RESTful APIs
- **TypeScript** for type safety and scalability
- **Pino** and **Morgan** for efficient logging
- **ESLint** with TypeScript and security plugins for code quality
- **Zod** for runtime schema validation
- **Dotenv** for environment variable management
- **Docker** support for containerized deployment
- Pre-configured `tsconfig.json` and ESLint rules

## Prerequisites

- **Node.js**: v22.13.1 or higher
- **npm**: v10.x or higher
- **Docker**: (optional) for containerized deployment
- **Git**: For cloning the repository

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd nodejs-template
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   This installs both production and development dependencies listed below.

3. **Production dependencies**:

   ```bash
   npm i config dayjs dotenv express lodash morgan pino zod
   ```

4. **Development dependencies**:

   ```bash
   npm i -D @eslint/js @types/config @types/express @types/lodash @types/morgan @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-plugin-import eslint-plugin-no-unsanitized eslint-plugin-security globals pino-pretty ts-node tsconfig-paths tsx typescript typescript-eslint
   ```

## Environment Variables

1. **Create a `.env` file** in the project root:

   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your configuration. All values **must** be enclosed in double quotes (`"`) for consistency:

   ```env
   PORT="3000"
   NODE_ENV="development"
   ACCESS_TOKEN_PRIVATE_KEY="<Private Key>"
   ACCESS_TOKEN_PUBLIC_KEY="<Public Key>"
   REFRESH_TOKEN_PRIVATE_KEY="<Refresh Private Key>"
   REFRESH_TOKEN_PUBLIC_KEY="<Refresh Public Key>"
   ```

3. **Example `.env.example`** (included in the repository):

   ```env
   PORT="3000"
   NODE_ENV="development"
   ACCESS_TOKEN_PRIVATE_KEY=""
   ACCESS_TOKEN_PUBLIC_KEY=""
   REFRESH_TOKEN_PRIVATE_KEY=""
   REFRESH_TOKEN_PUBLIC_KEY=""
   ```

4. **Generate RSA key pairs** for JWT authentication:
   - Use a tool like [JSEncrypt](https://travistidwell.com/jsencrypt/demo/) to generate 2048-bit RSA key pairs.
   - Copy the private and public keys into the `.env` file as shown above.

**Note**: Ensure `.env` is listed in `.gitignore` to keep it out of version control.

## Running the Project

### Development

Run the project in development mode with hot-reloading:

```bash
npm run dev
```

This uses `tsx` to watch and run TypeScript files directly.

### Production

1. Build the project:

   ```bash
   npm run build
   ```

   This compiles TypeScript to JavaScript in the `dist/` folder.

2. Start the server:

   ```bash
   npm start
   ```

### Docker

1. Build the Docker image:

   ```bash
   docker build -t nodejs-template .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:3000 --env-file .env nodejs-template
   ```

The server will be available at `http://localhost:3000` (or the port specified in `.env`).

## Linting and Code Quality

This project uses **ESLint** with TypeScript and security-focused plugins to ensure code quality and consistency.

1. **Run linting** to check for issues:

   ```bash
   npm run lint
   ```

2. **Fix linting issues** automatically (where possible):

   ```bash
   npm run lint:fix
   ```

The ESLint configuration (`eslint.config.mjs`) includes:

- TypeScript-specific rules (`@typescript-eslint`)
- Security best practices (`eslint-plugin-security`, `eslint-plugin-no-unsanitized`)
- Import sorting (`eslint-plugin-import`)

## Project Structure

```
nodejs-template/
├── src/                                  # Source code (TypeScript)
│   ├── config/                           # Configuration files
│   │   └── index.ts                      # Environment and app config
│   ├── middlewares/                      # Express middleware
│   │   └── error-response.middleware.ts  # Error handling middleware
│   ├── routes/                           # API routes
│   │   ├── health.routes.ts              # Health check endpoint
│   │   └── index.ts                      # Route aggregator
│   ├── types/                            # TypeScript type definitions
│   │   ├── config.type.ts                # Config types
│   │   ├── error.type.ts                 # Error types
│   │   └── express.d.ts                  # Custom Express types
│   ├── utils/                            # Utility functions
│   │   ├── error-handling.util.ts        # Error handling utilities
│   │   └── logger.util.ts                # Logging utilities
│   └── main.ts                           # Main entry point
├── dist/                                 # Compiled JavaScript (after build)
├── .env                                  # Environment variables (not committed)
├── .env.example                          # Template for .env
├── .gitattributes                        # Git attributes configuration
├── .gitignore                            # Files to ignore in Git
├── Dockerfile                            # Docker configuration
├── eslint.config.mjs                     # ESLint configuration
├── package.json                          # Dependencies and scripts
├── package-lock.json                     # Dependency lock file
├── README.md                             # Project documentation
└── tsconfig.json                         # TypeScript configuration
```

## Scripts

- `npm run dev`: Run in development mode with hot-reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Run the compiled JavaScript in production
- `npm run lint`: Check code for linting issues
- `npm run lint:fix`: Automatically fix linting issues
- `npm test`: (Placeholder) Add your test script here

## Updating Dependencies

To keep dependencies up-to-date:

1. Check for outdated packages:

   ```bash
   npm outdated
   ```

2. Update dependencies to the latest versions:

   ```bash
   npx npm-check-updates -u
   npm install
   ```

## Testing

Tests are not yet implemented. To add tests, consider using a framework like **Jest** or **Mocha**. Update the `npm test` script in `package.json` accordingly.

## License

This project is licensed under the ISC License. See the `package.json` for details.
