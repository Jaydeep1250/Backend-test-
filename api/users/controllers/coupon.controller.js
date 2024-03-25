const { test_users } = require("../models/models.service");
const { coupon } = require("../../../models/models.service");

module.exports = {
    add_coupon_code: async (req, res) => {
        let userId = req.body.userId;
        let coupon_code = req.body.coupon_code;

        let code = await coupon.exists({ coupon_code: coupon_code });

        if (code) {

            let user = await test_users.findById({ _id: userId });
            let promo = user.promo_code;

            if(promo.length == 0){

                let promo_data = await coupon.findOne({ coupon_code: coupon_code });
                return res.status(200).send({ type: "success", message: "Coupon Code Applied Successfully", data: promo_data });

            } else {
                for (const [key, value] of Object.entries(promo)){
                    if(value.code == coupon_code){
                        
                        return res.status(201).send({ type: "failed", message: "You Have Already Used Coupon Code" });
                    } else {
  
                        let promo_data = await coupon.findOne({ coupon_code: coupon_code });
                        return res.status(200).send({ type: "success", message: "Coupon Code Applied Successfully", data: promo_data });
                    }
                }
            }
        } else {

            return res.status(201).send({ type: "failed", message: "Invalid Coupon Code" });
        }
    },
    coupon_list: (req, res) => {
        try {            
            const asynchronousFunction = async() => {               
                var data = await coupon.find({ coupon_status: "1" });               
                return data
            }
            (async() => {
                return res.status(200).json({
                type: "success",
                message: "Coupon List",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};
