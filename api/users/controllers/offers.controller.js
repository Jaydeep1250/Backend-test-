const { offers, offerscms, category } = require("../../../models/models.service");
const { product } = require("../models/models.service");

module.exports = {
    offers_page: (req, res) => {
        try {
        const asynchronousFunction = async() => {
            var cms_data = await offerscms.findOne();
            var offers_data = await offers.find({ offer_status: "1" });          
            for(const [key, value] of Object.entries(offers_data)){
                var cat_data = [...value.offer_category_list]
                var cat = await category.find({_id : {"$in" : cat_data}});
                var combo = await product.findById(value.offer_combo_product);
                value.offer_category_list = cat;
                value.offer_combo_img = combo.product_img;
                value.offer_combo_name = combo.product_name;
            }
            
            return { "offers_data": offers_data, "cms_data": cms_data }
            }
            (async() => {
                var data = await asynchronousFunction();
                return res.status(200).json({
                type: "success",
                message: "Offers Page Listing",
                cms: data.cms_data,
                data: data.offers_data
              });
            })()
        } catch (error) {
            res.send(error)
        }
    },
};