const { user_address } = require("../models/models.service");

module.exports = {
    address_listing: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var data = await user_address.find({ userID: body.userID }).sort( { "create_at": -1 } );
                return data
            }
            (async() => {
                return res.status(200).json({
                type: "success",
                message: "Address Listing",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    add_address: (req, res) => {
        const body = req.body;
        var ids = [];
        const asynchronousFunction = async() => {
            if(body.default_status == "on"){
                var default_data = await user_address.find({ userID: body.userID });
                default_data.forEach(res => {
                    ids.push(res._id);  
                })
                await user_address.updateMany({ _id: { $in: ids } }, {
                    $set: {
                      default_status: "off"
                    }
                });
                const data = await user_address.create({
                    userID: body.userID,
                    fullname: body.fullname,
                    mobno: body.mobno,
                    pincode: body.pincode,
                    address1: body.address1,
                    address2: body.address2,
                    default_status: body.default_status,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                return data
            } else {
                const data = await user_address.create({
                    userID: body.userID,
                    fullname: body.fullname,
                    mobno: body.mobno,
                    pincode: body.pincode,
                    address1: body.address1,
                    address2: body.address2,
                    default_status: body.default_status,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                return data 
            }
            
        }
        (async() => {
          return res.status(200).json({
            type: "success",
            message: "Address Added Successfully",
            data: await asynchronousFunction()
          });
        })()
    },
    edit_address: (req, res) => {
        const id = req.params.id;
        const asynchronousFunction = async() => {
            var data = await user_address.findById(id);
            return data
        }
        (async() => {
            return res.status(200).json({
                type: "success",
                message: "Address Edit",
                data: await asynchronousFunction()
            });
        })()
    },
    delete_address: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const asynchronousFunction = async() => {
            await user_address.deleteOne({ _id: id });
            var data = await user_address.find({ userID: body._id });
            return data
        }
        (async() => {
            return res.status(200).json({
                type: "success",
                message: "Address Delete Successfully",
                data: await asynchronousFunction()
            });
        })()
    },
    update_address: (req, res) => {
        const body = req.body;
        const asynchronousFunction = async() => {
          await user_address.findByIdAndUpdate({ _id: body._id }, {
              $set: {
                fullname: body.fullname,
                mobno: body.mobno,
                pincode: body.pincode,
                address1: body.address1,
                address2: body.address2,
                default_status: body.default_status
              }
          });
          var data = await user_address.find({ userID: body.userID });
          return data
        }
        (async() => {
          return res.status(200).json({
            type: "success",
            message: "Address Updated Successfully",
            data: await asynchronousFunction()
          });
        })()
    },
};