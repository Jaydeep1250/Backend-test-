const { aboutUs, director } = require("../../../models/models.service");

module.exports = {
    aboutus_list: (req, res) => {
        try {
        const asynchronousFunction = async() => {
            var about_data = await aboutUs.findOne();
            var dir_data = await director.find();

            return { "about_data": about_data, "dir_data": dir_data }
            }
            (async() => {
                var data = await asynchronousFunction();
                return res.status(200).json({
                type: "success",
                message: "About Us Listing",
                data: data.about_data,
                dir_data: data.dir_data
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};