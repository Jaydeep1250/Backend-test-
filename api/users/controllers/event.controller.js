const { event, eventcms } = require("../../../models/models.service");

module.exports = {
    event_list: (req, res) => {
        try {
        const asynchronousFunction = async() => {
            var event_data = await event.find({ event_status: "1" });
            var cms_data = await eventcms.findOne();

            return { "event_data": event_data, "cms_data": cms_data }
            }
            (async() => {
                var data = await asynchronousFunction();
                return res.status(200).json({
                type: "success",
                message: "Event Listing",
                data: data.event_data,
                banner: data.cms_data
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    event_detail: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var data = await event.findById({ _id: body.event_id });
                var datas = await event.find({ event_status: "1" });

                return { "data": data, "datas": datas }
            }
            (async() => {
                var data = await asynchronousFunction();
                data.datas.splice(data.datas.findIndex(a => a._id !== body.event_id) , 1)
                return res.status(200).json({
                type: "success",
                message: "Event Detail Page",
                data: data.data,
                list: data.datas
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};