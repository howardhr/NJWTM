import  {Router} from "express";
import * as productsCtrl from "../controllers/products.controllers";
import { authjwt } from "../middlewares";
const router = Router()

router.get('/', productsCtrl.getProducts)
router.post('/', [authjwt.verifyToken,authjwt.isModerator, authjwt.isAdmin  ], productsCtrl.creteProduct)
router.get('/:productId', productsCtrl.getProductById)
router.delete('/:productId', [authjwt.verifyToken, authjwt.isModerator, authjwt.isAdmin ], productsCtrl.deleteProductById)
router.put('/:productId', [authjwt.verifyToken, authjwt.isModerator, authjwt.isAdmin ], productsCtrl.updateProductById)


export default router