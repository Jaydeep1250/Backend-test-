const { category, product, subcategory } = require("../models/models.service");

module.exports = {
    category_list: (req, res) => {
        try {
            var datas = [];
            const asynchronousFunction = async() => {
            
            var cat_data = await category.aggregate([
                { $sort: { "category_seq_no": 1 } }
            ]);
            cat_data.sort((a, b) => Number(a.category_seq_no) - Number(b.category_seq_no));
            for (const [key, value] of Object.entries(cat_data)){
                var sub_data = await subcategory.aggregate([
                    {
                        $match: {
                            "category": value['_id'].valueOf()
                        }
                    },
                    { $sort: { "subcategory_seq_no": 1 } }
                ]);
                
                cat_data[key]['sub_data'] = sub_data;
                // datas.push(sub_data[0].subcategory_name);
            }
            return cat_data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Category Listing",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    category_detail_page: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var price_data = await product.find( { price: { $gte: body.start_price, $lte: body.end_price } } );
                var cat_data = await product.find( { product_category: { $in: [ body.cat_id ] } } );
                var discount_data = await product.find( { discount: { $in: [ body.discount ] } } );
                var tags_data = await product.find( { tags: { $in: [ body.tags ] } } );

                return { "price_list": price_data, "cat_list": cat_data, "discount_list": discount_data, "tags_list": tags_data }
            }
            (async() => {
                var data = await asynchronousFunction();
                return res.status(200).json({
                type: "success",
                message: "Category Detail Page",
                data: {
                    user_price: data.price_list,
                    user_cat: data.cat_list,
                    user_discount: data.discount_list,
                    user_tags: data.tags_list,
                }
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    category_product: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var data = await product.aggregate([
                    { $match: { product_category: body.cat_id } }
                ]);
                return data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Category Product",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};




    