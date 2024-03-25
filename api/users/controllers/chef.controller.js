const user = require("../../../models/user.service");
const { product } = require("../models/models.service");

module.exports = {
    chef_list: (req, res) => {
        try {
        const asynchronousFunction = async() => {
            var data = await user.aggregate([
            { $match: { chef_status: "1" } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    sub_title: 1,
                    avatar: 1
                }
            }]);

            return data
            }
            (async() => {
                return res.status(200).json({
                type: "success",
                message: "Chef Listing",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    chef_detail: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var data = await user.findById({_id: body.chef_id});

                return data
            }
            (async() => {
                return res.status(200).json({
                type: "success",
                message: "Chef Detail Page",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    best_product: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var data = await product.aggregate([
                    { $match: { chef_name: body.chef_id } },
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
                message: " Best Product",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};