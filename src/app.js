import express from "express";
import cors from "cors";
import morgan from "morgan";
import pkg from "../package.json";
import { createRoles } from "./libs/initialSetups";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
const app = express()
createRoles()
app.set('pkg', pkg)
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json())
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})

const corsOptions = {
    // origin: "http://localhost:3000",
  };

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


export default app

