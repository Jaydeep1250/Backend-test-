const { test_users, product, Cart, order, user_address } = require("../models/models.service");
const moment = require('moment');

module.exports = {
    create_order: (req, res) => {
        const body = req.body;
        if(body.coupon_code == ""){
            body.coupon_code = "0"
        }
        if(body.discount == ""){
            body.discount == "0"
        }
        function randomString(len, charSet) {
            charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var randomString = '';
            for (var i = 0; i < len; i++) {
                var randomPoz = Math.floor(Math.random() * charSet.length);
                randomString += charSet.substring(randomPoz,randomPoz+1);
            }
            return randomString;
        }
        const orderid = randomString(6);
        const delivered_status = "Inprogress";
        const order_date = moment().format("DD MMM, YYYY hh:mm A");
        const code_date = moment().format("DD MMM, YYYY hh:mm A");
        const asynchronousFunction = async() => {
            const customer_data = await test_users.findById({ _id: body.userId });
            const product_data = JSON.stringify(await Cart.findOne({ userId: body.userId })) 
            const address_data = await user_address.findById({ _id: body.Address });
            const product = JSON.parse(product_data) 
            const address = address_data._id;
            const customer = customer_data.first_name;
            const data = await order.create({
                orderid: orderid,
                userID: body.userId,
                customer: customer,
                product: product.products,
                address: address,
                amount: (body.amount).toFixed(2),
                paymentId: body.paymentId,
                order_date: order_date,
                delivered_status: delivered_status,
                referral_code: body.referral_code,
                coupon_code: body.coupon_code,
                discount: body.discount,
                saving: body.saving
            });

            product.products.forEach(async ele => {
                if(ele.sub_plan){
                    if(ele.sub_plan == "Every 1 months"){
                        var end_date = moment().add(1, 'months').format("DD MMM, YYYY hh:mm A");
                    }
                    if(ele.sub_plan == "Every 2 months"){
                        var end_date = moment().add(2, 'months').format("DD MMM, YYYY hh:mm A");
                    }
                    if(ele.sub_plan == "Every 3 months"){
                        var end_date = moment().add(3, 'months').format("DD MMM, YYYY hh:mm A");
                    }
                    if(ele.sub_plan == "Every 4 months"){
                        var end_date = moment().add(4, 'months').format("DD MMM, YYYY hh:mm A");
                    }
                    if(ele.sub_plan == "Every 5 months"){
                        var end_date = moment().add(5, 'months').format("DD MMM, YYYY hh:mm A");
                    }
                    if(ele.sub_plan == "Every 6 months"){
                        var end_date = moment().add(6, 'months').format("DD MMM, YYYY hh:mm A");
                    }
                    await test_users.updateOne({
                        _id : body.userId
                    }, {
                      $push: {
                          "subscription": {
                                productId: ele.productId,
                                product_name: ele.product_name,
                                sub_plan: ele.sub_plan,
                                sub_price: ele.sub_price,
                                quantity: ele.quantity,
                                order_date: order_date,
                                end_date: end_date,
                                delivered_status: delivered_status
                            }
                        }
                    });
                }
            });

            if(body.referral_code){
                await test_users.findByIdAndUpdate({ _id: body.userId }, {
                    $set: {
                        used_code: [{
                            code: body.referral_code,
                            time: code_date
                        }]
                    }
                });
    
                let code = await test_users.findOne({ referral_code: body.referral_code });
                const e_wallet = parseFloat(code.wallet) + parseFloat(body.discount);
                await test_users.findByIdAndUpdate({ _id: code._id}, {
                    $set: {
                        wallet: e_wallet.toFixed(2)
                    }
                });
            }
            if(body.coupon_code){
                await test_users.updateOne({
                    _id : body.userId
                }, {
                  $push: {
                      "promo_code": {
                        code: body.coupon_code,
                        time: code_date
                      }
                  }
                });               
            }

            return data 
            
        }      
        (async() => {
            return res.status(200).json({
            type: "success",
            message: "Order Created Successfully",
            data: await asynchronousFunction()
          });
        })()
    },
    list_order: (req, res) => {       
    try {
        const body = req.body;
        const asynchronousFunction = async() => {
                var data = await order.find({ userID: body.userId }).sort( { "create_at": -1 } );               
                return data
            }
            (async() => {
                return res.status(200).json({
                    type: "success",
                    message: "Order List",
                    data: await asynchronousFunction()
                });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    subscription_list: (req, res) => {       
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var datas = await test_users.findOne({ _id: body.userId })
                var data = datas.subscription;
                return data
            }
            (async() => {
                return res.status(200).json({
                    type: "success",
                    message: "Subscription List",
                    data: await asynchronousFunction()
                });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};