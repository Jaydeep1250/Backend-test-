const { product, region } = require("../models/models.service");

module.exports = {
    product_listing: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var products1 = await product.find({ top_prod: "true" });
                var products2 = await product.find({ top_prod: "false" });
                var products = [...products1, ...products2];
                return JSON.stringify(products)
            }
            (async() => {
                return res.status(200).json({
                type: "success",
                message: "Product Listing",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    product_detail: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var prod_data = await product.findById({_id: body.prod_id});
                var prod_cat = prod_data.product_sub_category;
                var prod_rel = await product.aggregate([
                    { $match: { product_sub_category: prod_cat } },
                    {
                        $project: {
                            _id: 1,
                            product_name: 1,
                            product_id: 1,
                            product_img: 1,
                            price: 1,
                            discount: 1,
                            saving: 1,
                            tags: 1,
                            product_category: 1,
                            product_sub_category: 1
                        }
                    }
                ]);
                return { "prod_list": prod_data, "rel_list": prod_rel }
            }
            (async() => {
                var data = await asynchronousFunction();
                data.rel_list.splice(data.rel_list.findIndex(a => a._id !== body.prod_id) , 1)
                return res.status(200).json({
                type: "success",
                message: "Product Details",
                data: {
                    product: data.prod_list,
                    related_product: data.rel_list
                }
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    product_subscription: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await product.aggregate([
                    { $match: { subscription: "true" } },
                    {
                        $project: {
                            _id: 1,
                            product_name: 1,
                            product_id: 1,
                            product_img: 1,
                            price: 1,
                            discount: 1,
                            saving: 1,
                            tags: 1,
                            sub_plan: 1,
                            sub_price: 1,
                            subscription: 1
                        }
                    }
                ]);
                return data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Product Subscription",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    product_popular: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await product.aggregate([
                    { $match: { tags: "Popular" } },
                    {
                        $project: {
                            _id: 1,
                            product_name: 1,
                            product_id: 1,
                            product_img: 1,
                            price: 1,
                            discount: 1,
                            saving: 1,
                            tags: 1
                        }
                    }
                ]);
                return data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Product Popular",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    product_filter: (req, res) => {
        const body = req.body;
        try {
            const asynchronousFunction = async() => {
                var ids = body.ids;
                var subscription = body.subscription;
                var combo = body.combo;
                var region = body.region;
                var sort_by = body.sort_by;
                var cat_id = body.category_id;
                var combo_id = body.combo_id;
                var discount = parseInt(body.discount);

                if(cat_id){
                    var data = await product.aggregate([
                        { $match: { $and: [ { product_category: cat_id }, { discount: { $lte: discount } } ] } },
                    ]);
                    
                    return data;
                }

                if(combo_id){
                    var data = await product.find({ _id: combo_id })

                    return data;
                }

                if(combo){
                    var data = await product.find({ tags: combo })

                    return data;
                }

                var query = {};

                if(ids.length > 0)
                {
                    query["product_sub_category"] = {$in : ids};
                } 
                if(subscription == "true")
                {
                    query["subscription"] = subscription;
                } 
                if(region.length > 0)
                {
                    query["city_origin"] = {$in : region};
                }
                if(sort_by)
                {
                    query["tags"] = sort_by;
                }
                
                if(query)
                {

                const pipeline = [
                    { $match: query }
                ];
                var data = await product.aggregate(pipeline);
                return data;
                }
                else {
                    var products = await product.find();
                    var data = JSON.stringify(products);
                    return JSON.parse(data)
                } 
                
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Product By Filter",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    related_product: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var datas = await product.findById({_id: body.prod_id});
                var prod_cat = datas.product_sub_category;
                var data = await product.aggregate([
                    { $match: { product_sub_category: prod_cat } },
                    {
                        $project: {
                            _id: 1,
                            product_name: 1,
                            product_id: 1,
                            product_img: 1,
                            price: 1,
                            discount: 1,
                            saving: 1,
                            tags: 1,
                            product_category: 1,
                            product_sub_category: 1
                        }
                    }
                ]);
                return data
            }
            (async() => {
                const rel_product=await asynchronousFunction();
                rel_product.splice(rel_product.findIndex(a => a._id !== body.prod_id) , 1)
                return res.status(200).json({
                type: "success",
                message: "Related Product Details",
                data: rel_product
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    trending_product: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await product.aggregate([
                    { $match: { tags: "Trending" } }
                ]);
                return data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Product Trending",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    product_tags_list: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var products1 = await product.find({ top_prod: "true" });
                var trend_data = await product.aggregate([
                    { $match: { tags: "Trending" } }
                ]);
                var pop_data = await product.aggregate([
                    { $match: { tags: "Popular" } }
                ]);
                var new_data = await product.aggregate([
                    { $match: { tags: "New Arrivals" } }
                ]);
                var data = [
                    trend_data[0],trend_data[1],trend_data[2],
                    pop_data[0],pop_data[1],pop_data[2],
                    new_data[0],new_data[1],new_data[2]
                    ];
                var products = [...products1, ...data]  
                 
                return products
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Product Tags Listing",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};