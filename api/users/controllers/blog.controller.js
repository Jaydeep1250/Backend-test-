const { bloggers, blog } = require("../../../models/models.service");

module.exports = {
    blog_list: (req, res) => {
        try {
        const asynchronousFunction = async() => {
            var data = await bloggers.findOne({ blog_status: "1" });
            var datas = await bloggers.find({ blog_status: "1" });
            var cms_data = await blog.findOne();

            return { "data": data, "datas": datas, "cms_data": cms_data }
            }
            (async() => {
                var data = await asynchronousFunction();
                var id = data.data._id;
                data.datas.splice(data.datas.findIndex(a => a._id !== id) , 1)
                return res.status(200).json({
                type: "success",
                message: "Blogs Listing",
                banner: data.cms_data,
                data: data.data,
                list: data.datas
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    blog_detail: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var data = await bloggers.findById({ _id: body.blog_id });
                var datas = await bloggers.find({ blog_status: "1" });

                return { "data": data, "datas": datas }
            }
            (async() => {
                var data = await asynchronousFunction();
                data.datas.splice(data.datas.findIndex(a => a._id !== body.blog_id) , 1)
                return res.status(200).json({
                type: "success",
                message: "Blogs Detail Page",
                data: data.data,
                list: data.datas
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};