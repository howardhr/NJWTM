import Product from "../model/Product";
export const creteProduct = async (req, res) => {

    try {
        const { name, category, price, imgURL } = req.body;
        if (await Product.findOne({ name })) {
            return res.status(500).json({ message: "este producto ya se encuentra registrado" });
        }
        const newProduct = new Product({ name, category, price, imgURL })
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getProducts = async (req, res) => {
    const product = await Product.find()
    res.json(product)

}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ message: "Producto no Encontrado" });
    }
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })

    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.productId)
      res.json({message: "Producto Eliminado" })
    } catch (error) {
        res.status(500).json({message: "Error al Eliminar en Producto" })
    } 
   
}