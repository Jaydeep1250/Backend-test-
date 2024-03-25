const { test_users, WishList, product, Cart, order, user_address } = require("../models/models.service");
const { isValidObjectId } = require("mongoose");

module.exports = {
    add_to_wishlist: async (req, res) => {
        let userId = req.body.userId;
        let user = await test_users.exists({ _id: userId });

        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ type: "failed", message: "Invalid user ID" });

        let productId = req.body.productId;

        let prod = await product.findById({_id: productId});
        let prod_img = prod.product_img;
        let prod_title = prod.product_name;
        let prod_variant = prod.variants;
        let prod_price = prod.price;
        let prod_discount = prod.discount;
        let prod_saving = prod.saving;
        
        if (!productId)
            return res.status(400).send({ type: "failed", message: "Invalid product" });

        let wish = await WishList.findOne({ userId: userId });

        if (wish) {
            let itemIndex = wish.products.findIndex((p) => p.productId == productId);

            if (itemIndex > -1) {
                wish.products.splice(itemIndex, 1);
            } else {
                wish.products.push({ 
                    productId: productId, 
                    product_img: prod_img, 
                    product_name: prod_title, 
                    variants: prod_variant, 
                    price: prod_price, 
                    discount: prod_discount,
                    saving: prod_saving
                });
            }
            wish = await wish.save();
            return res.status(200).send({ type: "success", updatedWish: wish });
        } else {
            const newWish = await WishList.create({
                userId,
                products: [{ 
                    productId: productId, 
                    product_img: prod_img, 
                    product_name: prod_title, 
                    variants: prod_variant, 
                    price: prod_price, 
                    discount: prod_discount,
                    saving: prod_saving
                }]
            });

            return res.status(201).send({ type: "success", newWish: newWish });
        }
    },
    get_Wishlist: async (req, res) => {
        let userId = req.body.userId;
        let user = await test_users.exists({ _id: userId });

        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ type: "failed", message: "Invalid user ID" });

        let wish = await WishList.findOne({ userId: userId });
        if (!wish)
            return res
                .status(404)
                .send({ type: "failed", message: "Wishlist not found for this user" });

        res.status(200).send({ type: "success", wishlist: wish });
    },
    item_remove: async (req, res) => {
        let userId = req.body.userId;
        let user = await test_users.exists({ _id: userId });
        let productId = req.body.productId;

        if (!userId || !isValidObjectId(userId) || !user)
            return res.status(400).send({ type: "failed", message: "Invalid user ID" });

        let wish = await WishList.findOne({ userId: userId });
        if (!wish)
            return res
                .status(404)
                .send({ type: "failed", message: "Wishlist not found for this user" });

        let itemIndex = wish.products.findIndex((p) => p.productId == productId);
        if (itemIndex > -1) {
            wish.products.splice(itemIndex, 1);
            wish = await wish.save();
            return res.status(200).send({ type: "success", updatedWish: wish });
        }
        res
            .status(400)
            .send({ type: "failed", message: "Item does not exist in wishlist" });
    },
};