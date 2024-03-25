const { test_users } = require("../models/models.service");
const { referral } = require("../../../models/models.service");

module.exports = {
    add_referral_code: async (req, res) => {
        let userId = req.body.userId;
        let referral_code = req.body.referral_code;

        let code = await test_users.exists({ referral_code: referral_code });

        if (code) {

            let user = await test_users.findById({ _id: userId });

            if(user.referral_code == referral_code){

                return res.status(201).send({ type: "failed", message: "You Cannot Use Your Own Referral Code" });
            } else {

                if (user.used_code.length == 0) {

                    let referral_data = await referral.find();
                    return res.status(200).send({ type: "success", message: "Referral Code Applied Successfully", data: referral_data });
    
                } else {
    
                    return res.status(201).send({ type: "failed", message: "You Have Already Used Referral Code" });
                }
            }
        } else {

            return res.status(201).send({ type: "failed", message: "Invalid Referral Code" });
        }
    },
    user_tracking: async (req, res) => {
        let userId = req.body.userId;

        let user = await test_users.findById({ _id: userId });
        let code = user.referral_code;

        let all_user = await test_users.find();
        var tracking = [];
        for (const [key, value] of Object.entries(all_user)){          
            if(value.used_code.length > 0){
                if(value.used_code[0].code == code){
                    tracking.push({
                        userId: value._id,
                        username: value.first_name,
                        time: value.used_code[0].time
                    })
                }
            }           
        }
        return res.status(200).send({ type: "success", message: "User Tracking Data", data: tracking });
    },
    referral_list: (req, res) => {
        try {            
            const asynchronousFunction = async() => {               
                var data = await referral.findOne();               
                return data
            }
            (async() => {
                return res.status(200).json({
                type: "success",
                message: "Referral List",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};