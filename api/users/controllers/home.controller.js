const { terms, test, aboutUs, mission_Vision, blog, refund_return, shipping_policy, faqs, product, cms, category, subcategory, region, carousel, privacy, Testimonials } = require("../../../models/models.service");

module.exports = {
    home: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var cms_data = await cms.find();
                var cat_data = await category.aggregate([
                    { $sort: { "create_at": -1 } }
                ]);
                
                for (const [key, value] of Object.entries(cat_data)){
                    // console.log(value)
                    var sub_data = await subcategory.aggregate([
                        {
                            $match: {
                                "category": value['_id'].valueOf()
                            }
                        }
                    ]);
                    
                    cat_data[key]['sub_data'] = sub_data;
                    
                }
               
                return { "cms_list": cms_data, "cat_list": cat_data }
            }
            (async() => {
                var data = await asynchronousFunction();
                return res.status(200).json({
                type: "success",
                message: "Home Page",
                home_data: {
                    cms: data.cms_list,
                    category: data.cat_list
                }
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    cms_region: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await region.find();
                return data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "CMS Region",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    cms_carousel: (req, res) => {
        try {            
            const asynchronousFunction = async() => {
                
                var data = await test.find();               
                return data
            }
            (async() => {
                var carousel_images =[];
                var row1 = [];
                var row2 = [];
                const carousel= await asynchronousFunction();
                console.log(carousel)
                carousel.forEach(data => {
                    if(data.img_type == "long_img" && data.row_type == "row1"){
                        row1.push(data.long);
                    }else if(data.img_type == "short_img" && data.row_type == "row1"){
                        row1.push(data.short);
                    }if(data.img_type == "long_img" && data.row_type == "row2"){
                        row2.push(data.long);
                    }else if(data.img_type == "short_img" && data.row_type == "row2"){
                        row2.push(data.short);
                    }
                })
                console.log(row2)
                carousel_images.push({row1:row1,row2:row2})  
              return res.status(200).json({
                type: "success",
                message: "CMS Carousel Slider Images",
                data: carousel_images
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    combo_offer: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await product.aggregate([
                    { $match: { tags: "Combo Offer" } },
                    {
                        $project: {
                            _id: 1,
                            product_id: 1,
                            product_name: 1,
                            prod_list: 1,
                            qty: 1,
                            product_img: 1,
                            product_gallery: 1,
                            price: 1,
                            description: 1,
                            status: 1
                        }
                    }
                ]);
                return data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Combo Offers Product lists",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    privacy_policy: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await privacy.find();
                return JSON.stringify(data[0])
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Privacy Policy",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    faqs: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await faqs.find();
                return JSON.stringify(data[0])
            }
            (async() => {
                var faqs = [];
                const data = JSON.parse(await asynchronousFunction())
                data.policy_title.forEach((el,i) => {
                    faqs.push({title: el, sub_title: data.policy_sub_title[i]})
                });
                data.faqs = faqs;
              return res.status(200).json({
                type: "success",
                message: "Faqs",
                data: data
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    term_condition: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await terms.find();
                return JSON.stringify(data[0])
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Terms & Conditions",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    about_us: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await aboutUs.find();
                return JSON.stringify(data[0])
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "About Us",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    mission_vision: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await mission_Vision.find();
                return JSON.stringify(data[0])
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "About Us",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    blog: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await blog.find();
                return JSON.stringify(data[0])
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "About Us",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    return_policy: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await refund_return.find();
                return JSON.stringify(data[0])
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "About Us",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    shipping_policy: (req, res) => {
        try {
            const asynchronousFunction = async() => {
                var data = await shipping_policy.find();
                return JSON.stringify(data[0])
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "About Us",
                data: JSON.parse(await asynchronousFunction())
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    search: (req, res) => {
        try {
            const body = req.body;
            const asynchronousFunction = async() => {
                var data = await product.find({
                    "$or": [{ "product_name": { "$regex": body.key, '$options': 'si' }}]
                });
                return data
            }
            (async() => {
              return res.status(200).json({
                type: "success",
                message: "Search Data",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
    testimonial: (req, res) => {
        try {            
            const asynchronousFunction = async() => {               
                var data = await Testimonials.find();               
                return data
            }
            (async() => {
                return res.status(200).json({
                type: "success",
                message: "Testimonial List",
                data: await asynchronousFunction()
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};