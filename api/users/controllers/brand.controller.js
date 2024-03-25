const { brand, vahical, Image } = require("../models/models.service");

module.exports = {
    brand_list: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                    var data = await brand.find();

                    return data
                }
                (async() => {
                    return res.status(200).json({
                        type: "success",
                        message: "Brand List",
                        data: await asynchronousFunction()
                    });
                })()
        } catch (error) {
            res.send(error)
        }
    },
    add_vahical: (req, res) => {
        try {
            const body = req.body;

            const asynchronousFunction = async() => {
                    if (req.file) {

                        const filename = req.file.filename;
                        const imagePath = req.file.path;
                        const image = new Image({
                            filename: filename,
                            path: imagePath
                        });
                        await image.save();
                    }
                    var data = await vahical.create({
                        brand_id: body.brand_id,
                        car_name: body.name,
                        price: body.price,
                        color: body.color

                    });

                    return data
                }
                (async() => {
                    return res.status(200).json({
                        type: "success",
                        message: "Vahical Added",
                        data: await asynchronousFunction()
                    });
                })()
        } catch (error) {
            res.send(error)
        }
    },
};