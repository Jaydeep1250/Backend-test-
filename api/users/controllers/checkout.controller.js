const { test_users, category, product, Cart, order, user_address } = require("../models/models.service");
const { isValidObjectId } = require("mongoose");

module.exports = {
    addItemToCart: async (req, res) => {
        let userId = req.params.userId;
        let user = await test_users.exists({ _id: userId });

        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ type: "failed", message: "Invalid user ID" });

        let productId = req.body.productId;
        let qty = req.body.quantity;
        let total = req.body.total;
        let sub_plan = req.body.sub_plan;

        let prod = await product.findById({_id: req.body.productId});
        let prod_img = prod.product_img;
        let prod_title = prod.product_name;
        let prod_variant = prod.variants;
        let prod_price = prod.price;
        let prod_discount = prod.discount;
        let prod_saving = prod.saving;
        let prod_sub_price = prod.sub_price;
        
        if (!productId)
            return res.status(400).send({ type: "failed", message: "Invalid product" });

        let cart = await Cart.findOne({ userId: userId });

        if (cart) {

            if(sub_plan !== ""){
                cart.products.push({ 
                    productId: productId, 
                    product_img: prod_img, 
                    product_name: prod_title, 
                    variants: prod_variant, 
                    price: prod_price, 
                    quantity: qty,
                    discount: prod_discount,
                    saving: prod_saving,
                    sub_plan: sub_plan,
                    sub_price: prod_sub_price
                });
                cart = await cart.save();
                return res.status(200).send({ type: "success", updatedCart: cart });
            } else {
                let itemIndex = cart.products.findIndex((p) => p.productId == productId);

                if (itemIndex > -1) {
                    let productItem = cart.products[itemIndex];
                    productItem.quantity += qty;
                    cart.products[itemIndex] = productItem;
                } else {
                    cart.products.push({ 
                        productId: productId, 
                        product_img: prod_img, 
                        product_name: prod_title, 
                        variants: prod_variant, 
                        price: prod_price, 
                        quantity: qty,
                        discount: prod_discount,
                        saving: prod_saving
                    });
                }
                cart = await cart.save();
                return res.status(200).send({ type: "success", updatedCart: cart });
            }
        } else {
            if(sub_plan !== ""){
                const newCart = await Cart.create({
                    userId,
                    products: [{ 
                        productId: productId, 
                        product_img: prod_img, 
                        product_name: prod_title, 
                        variants: prod_variant, 
                        price: prod_price, 
                        quantity: qty,
                        discount: prod_discount,
                        saving: prod_saving,
                        sub_plan: sub_plan,
                        sub_price: prod_sub_price
                    }],
                    total: total
                });
                return res.status(201).send({ type: "success", newCart: newCart });
            } else {
                const newCart = await Cart.create({
                    userId,
                    products: [{ 
                        productId: productId, 
                        product_img: prod_img, 
                        product_name: prod_title, 
                        variants: prod_variant, 
                        price: prod_price, 
                        quantity: qty,
                        discount: prod_discount,
                        saving: prod_saving 
                    }],
                    total: total
                });
                return res.status(201).send({ type: "success", newCart: newCart });
            }
        }
    },
    addToCart_without_usr: async (req, res) => {
        let cartId = req.body.cart_id;
        let productId = req.body.productId;
        let qty = req.body.quantity;
        let total = req.body.total;
        let sub_plan = req.body.sub_plan;

        
        let prod = await product.findById({_id: req.body.productId});
        let prod_img = prod.product_img;
        let prod_title = prod.product_name;
        let prod_variant = prod.variants;
        let prod_price = prod.price;
        let prod_discount = prod.discount;
        let prod_saving = prod.saving;
        let prod_sub_price = prod.sub_price;

        if (!productId)
        return res.status(400).send({ type: "failed", message: "Invalid product" });
        
        if(cartId){
            let cart = await Cart.findOne({ _id: cartId });

            if(sub_plan){
                cart.products.push({ 
                    productId: productId, 
                    product_img: prod_img, 
                    product_name: prod_title, 
                    variants: prod_variant, 
                    price: prod_price, 
                    quantity: qty,
                    discount: prod_discount,
                    saving: prod_saving,
                    sub_plan: sub_plan,
                    sub_price: prod_sub_price
                });
                cart = await cart.save();
                return res.status(200).send({ type: "success", updatedCart: cart });
            } else {
                let itemIndex = cart.products.findIndex((p) => p.productId == productId);

                if (itemIndex > -1) {
                    let productItem = cart.products[itemIndex];
                    productItem.quantity += qty;
                    cart.products[itemIndex] = productItem;
                } else {
                    cart.products.push({ 
                        productId: productId, 
                        product_img: prod_img, 
                        product_name: prod_title, 
                        variants: prod_variant, 
                        price: prod_price, 
                        quantity: qty,
                        discount: prod_discount,
                        saving: prod_saving
                    });
                }
                cart = await cart.save();
                return res.status(200).send({ type: "success", updatedCart: cart });
            }
        } else {
            if(sub_plan){
                const newCart = await Cart.create({
                    products: [{ 
                        productId: productId, 
                        product_img: prod_img, 
                        product_name: prod_title, 
                        variants: prod_variant, 
                        price: prod_price, 
                        quantity: qty,
                        discount: prod_discount,
                        saving: prod_saving,
                        sub_plan: sub_plan,
                        sub_price: prod_sub_price
                    }],
                    total: total
                });
                return res.status(201).send({ type: "success", newCart: newCart });
            } else {
                const newCart = await Cart.create({
                    products: [{ 
                        productId: productId, 
                        product_img: prod_img, 
                        product_name: prod_title, 
                        variants: prod_variant, 
                        price: prod_price, 
                        quantity: qty,
                        discount: prod_discount,
                        saving: prod_saving 
                    }],
                    total: total
                });
                return res.status(201).send({ type: "success", newCart: newCart });
            }
        }
    },
    getCart: async (req, res) => {
        let userId = req.params.userId;
        let user = await test_users.exists({ _id: userId });

        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ type: "failed", message: "Invalid user ID" });

        let cart = await Cart.findOne({ userId: userId });
        if (!cart)
            return res
                .status(404)
                .send({ type: "failed", message: "Cart not found for this user" });

        res.status(200).send({ type: "success", cart: cart });
    },
    getCart_id: async (req, res) => {
        let cartId = req.params.cartId;

        if (!cartId || !isValidObjectId(cartId) || !cartId)
            return res.status(400).send({ type: "failed", message: "Invalid cart ID" });

        let cart = await Cart.findById(cartId);
        if (!cart)
            return res
                .status(404)
                .send({ type: "failed", message: "Cart not found for this user" });

        res.status(200).send({ type: "success", cart: cart });
    },
    removeItem: async (req, res) => {
        let userId = req.params.userId;
        let user = await test_users.exists({ _id: userId });
        let productId = req.body.productId;

        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ type: "failed", message: "Invalid user ID" });

        let cart = await Cart.findOne({ userId: userId });
        if (!cart)
            return res
                .status(404)
                .send({ type: "failed", message: "Cart not found for this user" });

        let itemIndex = cart.products.findIndex((p) => p.productId == productId);
        if (itemIndex > -1) {
            cart.products.splice(itemIndex, 1);
            cart = await cart.save();
            return res.status(200).send({ type: "success", updatedCart: cart });
        }
        res
            .status(400)
            .send({ type: "failed", message: "Item does not exist in cart" });
    },
    removeItem_id: async (req, res) => {
        let cartId = req.params.cartId;
        let productId = req.body.productId;

        if (!cartId || !isValidObjectId(cartId) || !cartId)
        return res.status(400).send({ type: "failed", message: "Invalid cart ID" });

        let cart = await Cart.findById(cartId);
        if (!cart)
            return res
                .status(404)
                .send({ type: "failed", message: "Cart not found for this user" });

        let itemIndex = cart.products.findIndex((p) => p.productId == productId);
        if (itemIndex > -1) {
            cart.products.splice(itemIndex, 1);
            cart = await cart.save();
            return res.status(200).send({ type: "success", updatedCart: cart });
        }
        res
            .status(400)
            .send({ type: "failed", message: "Item does not exist in cart" });
    },
    empty_cart: async (req, res) => {
        let userId = req.params.userId;
        let user = await test_users.exists({ _id: userId });

        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ type: "failed", message: "Invalid user ID" });

        let cart = await Cart.findOne({ userId: userId });
        if (!cart)
            return res
                .status(404)
                .send({ type: "failed", message: "Cart not found for this user" });

        let itemIndex = cart.products;
        if (itemIndex) {
            itemIndex.splice(0,itemIndex.length);
            cart = await cart.save();
            return res.status(200).send({ type: "success", updatedCart: cart });
        }
        res
            .status(400)
            .send({ type: "failed", message: "Item does not exist in cart" });
    },
    updateCart: async (req, res) => {
        let userId = req.params.userId;
        let user = await test_users.exists({ _id: userId });
        let productId = req.body.productId;
        let scope = req.body.scope;
      
        if (!userId || !isValidObjectId(userId) || !user)
          return res.status(400).send({ type: "failed", message: "Invalid user ID" });
      
        let cart = await Cart.findOne({ userId: userId });
        if (!cart)
          return res
            .status(404)
            .send({ type: "failed", message: "Cart not found for this user" });
      
        let itemIndex = cart.products.findIndex((p) => p.productId == productId);
      
        if (itemIndex > -1) {
          let productItem = cart.products[itemIndex];
          if(scope == "inc"){
            productItem.quantity += 1;
          } else if(scope == "dec"){
            if(productItem.quantity > 1){
                productItem.quantity -= 1;
            }
          }        
          cart.products[itemIndex] = productItem;
          cart = await cart.save();
          return res.status(200).send({ type: "success", updatedCart: cart });
        }
        res
        .status(400)
        .send({ type: "failed", message: "Item does not exist in cart" });
    },
    updateCart_id: async (req, res) => {
        let cartId = req.params.cartId;
        let productId = req.body.productId;
        let scope = req.body.scope;
      
        if (!cartId || !isValidObjectId(cartId) || !cartId)
            return res.status(400).send({ type: "failed", message: "Invalid cart ID" });
      
        let cart = await Cart.findById(cartId);
        if (!cart)
          return res
            .status(404)
            .send({ type: "failed", message: "Cart not found for this user" });
      
        let itemIndex = cart.products.findIndex((p) => p.productId == productId);
      
        if (itemIndex > -1) {
          let productItem = cart.products[itemIndex];
          if(scope == "inc"){
            productItem.quantity += 1;
          } else if(scope == "dec"){
            if(productItem.quantity > 1){
                productItem.quantity -= 1;
            }          
          }         
          cart.products[itemIndex] = productItem;
          cart = await cart.save();
          return res.status(200).send({ type: "success", updatedCart: cart });
        }
        res
        .status(400)
        .send({ type: "failed", message: "Item does not exist in cart" });
    },
    update_cart_details: (req, res) => {
        const body = req.body;
        const cartId = body.cartId;
        const userId = body.userId;
        const asynchronousFunction = async() => {
            const cart = await Cart.findOne({ userId: userId });

            if (cart) {
                const cart_data = await Cart.findById(cartId);
                const arr1 = cart_data.products;
                const arr2 = cart.products;
                var arr3 = [...new Set([...arr1 ,...arr2])];             
                await Cart.updateOne({ userId: userId }, {
                    $set: {
                        products: arr3
                    }
                });
                return await Cart.find({ userId: userId });
            } else {
                await Cart.findByIdAndUpdate({ _id: cartId }, {
                    $set: {
                      userId: userId
                    }
                });
                return await Cart.find({ userId: userId });
            }
        }
        (async() => {
          return res.status(200).json({
            type: "success",
            message: "Cart Updated Successfully",
            data: await asynchronousFunction()
          });
        })()
    },
    // decreaseQuantity: async (req, res) => {
    //     // use add product endpoint for increase quantity
    //     let userId = req.params.userId;
    //     let user = await test_users.exists({ _id: userId });
    //     let productId = req.body.productId;

    //     let prod = await product.findById({_id: req.body.productId});
    //     let prod_price = prod.price;
      
    //     if (!userId || !isValidObjectId(userId) || !user)
    //       return res.status(400).send({ type: "failed", message: "Invalid user ID" });
      
    //     let cart = await Cart.findOne({ userId: userId });
    //     if (!cart)
    //       return res
    //         .status(404)
    //         .send({ type: "failed", message: "Cart not found for this user" });
      
    //     let itemIndex = cart.products.findIndex((p) => p.productId == productId);
      
    //     if (itemIndex > -1) {
    //       let productItem = cart.products[itemIndex];
    //       productItem.quantity -= 1;
    //       productItem.price -= prod_price;
    //       cart.products[itemIndex] = productItem;
    //       cart = await cart.save();
    //       return res.status(200).send({ type: "success", updatedCart: cart });
    //     }
    //     res
    //       .status(400)
    //       .send({ type: "failed", message: "Item does not exist in cart" });
    // },
};