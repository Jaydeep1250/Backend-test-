const { test_users } = require("../models/models.service");
/* const { email_otp } = require("../utils/email.util"); */
/* const { referral_code } = require("../utils/otp.util"); */
/* const { generateOTP } = require("../utils/otp.util"); */

module.exports = {
    loginWithPhoneOtp: (req, res, next) => {
        try {
            const body = req.body;
            (async() => {
                const Exist = await test_users.findOne({ phone: body.phone });
                if (!Exist) {
                    let user = await test_users.findOne({ email: body.phone });
                    if (!user) {
                        res.status(201).json({
                            type: "failed",
                            message: "User Not Found..!!"
                        });
                    } else {
                        if (user.phoneOtp !== body.otp) {
                            res.status(201).json({
                                type: "failed",
                                message: "Incorrect OTP..!!"
                            });
                        } else {
                            user.phoneOtp = "";
                            await user.save();
                            res.status(201).json({
                                type: "success",
                                message: "OTP verified successfully",
                                data: user
                            });
                        }
                    }
                } else {
                    res.status(201).json({
                        type: "success",
                        message: "User Verified",
                        data: Exist
                    });
                }
            })()
        } catch (error) {
            next(error);
        }
    },
    verify_login: (req, res, next) => {
        try {
            const body = req.body;
            (async() => {
                /* const Exist = await test_users.findOne({ phone: body.phone });
                if (!Exist) {
                  const email = await test_users.findOne({ email: body.phone });
                  if (!email) {
                      res.status(201).json({
                        type: "failed",
                        message: "Registration Required"
                      });
                    } else {
                      // generate otp
                      const otp = generateOTP(6);

                      // save otp to user collection
                      email.phoneOtp = otp;
                      await email.save();

                      // send otp to Email Id
                      var email_data = {
                        "to": body.phone,
                        "subject": "Email OTP", 
                        "text": "OTP Send to your email id ✔",
                        "html": "<b>Hello Welcome to Cottage Cart ✔ Your Email Login OTP is " + otp + " </b>"
                      };
                      email_otp(email_data);

                      res.status(201).json({
                        type: "success",
                        message: "OTP Send to your registered Email ID",
                        data: email
                      });
                    }
                  } else {
                    res.status(201).json({
                      type: "success",
                      message: "User Verified",
                      data: Exist
                    });
                  }       */
            })()
        } catch (error) {
            next(error);
        }
    },
    registration: (req, res) => {
        try {
            const body = req.body;
            (async() => {
                /* const Exist = await test_users.findOne({ $or: [{ phone: body.phone }, { email: body.email }] });
                if (!Exist) {
                    body.referral_code = referral_code(8);
                    const user = await test_users.create({
                        first_name: body.first_name,
                        last_name: body.last_name,
                        email: body.email,
                        phone: body.phone,
                        referral_code: body.referral_code,
                        used_code: [],
                        promo_code: [],
                        wallet: "0.00",
                        phoneOtp: "",
                        created_at: new Date(),
                        updated_at: new Date()
                    });

                    res.status(201).json({
                        type: "success",
                        message: "User Created Successfully",
                        data: user
                    });

                } else {
                    res.status(201).json({
                        type: "failed",
                        message: "Phone or Email is already registred"
                    });
                } */
            })()
        } catch (error) {
            next(error);
        }
    },
    update_user: (req, res) => {
        const body = req.body;
        const asynchronousFunction = async() => {
                await test_users.findByIdAndUpdate({ _id: body._id }, {
                    $set: {
                        first_name: body.first_name,
                        last_name: body.last_name,
                        email: body.email,
                        dob: body.dob,
                        gender: body.gender,
                        phone: body.phone,
                        address: body.address
                    }
                });
                var data = await test_users.findById(body._id)
                return data
            }
            (async() => {
                return res.status(200).json({
                    type: "success",
                    message: "User Updated Successfully",
                    data: await asynchronousFunction()
                });
            })()
    },
    current_user: async(req, res) => {
        const body = req.body;
        const asynchronousFunction = async() => {
                var data = await test_users.findOne({ _id: body.userId })
                return data
            }
            (async() => {
                return res.status(200).json({
                    type: "success",
                    message: "Fetched Current User",
                    data: await asynchronousFunction()
                });
            })()
    },
    // verify_otp: (req, res, next) => {
    //   try {
    //       const body = req.body;
    //       (async() => {
    //         let user = await test_users.findOne({ email: body.phone });
    //         if (!user) {
    //           res.status(201).json({
    //             type: "failed",
    //             message: "User Not Found..!!"
    //           });
    //         } else {
    //           if (user.phoneOtp !== body.otp) {
    //             res.status(201).json({
    //               type: "failed",
    //               message: "Incorrect OTP..!!"
    //             });
    //           } else {
    //             user.phoneOtp = "";
    //             await user.save();
    //             res.status(201).json({
    //               type: "success",
    //               message: "OTP verified successfully",
    //               data: user
    //             });
    //           }
    //         }      
    //       })()           
    //   } catch (error) {
    //   next(error);
    //   }
    // },
};