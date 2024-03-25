const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const { checkAuth } = require("../middlewares/checkAuth");
/* const { loginWithPhoneOtp, update_user, current_user, registration, verify_login } = require("../controllers/auth.controller");
const { category_list, category_detail_page, category_product } = require("../controllers/category.controller");
const { product_listing, product_detail, product_subscription, product_popular, product_filter, related_product, trending_product, product_tags_list } = require("../controllers/product.controller");
const { home, cms_region, cms_carousel, combo_offer, privacy_policy, faqs, term_condition, about_us, mission_vision, blog, return_policy, shipping_policy, search, testimonial } = require("../controllers/home.controller");
const { addItemToCart, addToCart_without_usr, getCart, getCart_id, removeItem, removeItem_id, empty_cart, updateCart, updateCart_id, update_cart_details } = require("../controllers/checkout.controller");
const { address_listing, add_address, edit_address, delete_address, update_address } = require("../controllers/address.controller");
const { create_order, list_order, subscription_list } = require("../controllers/order.controller");
const { add_to_wishlist, get_Wishlist, item_remove } = require("../controllers/wishlist.controller");
const { chef_list, chef_detail, best_product } = require("../controllers/chef.controller");
const { add_referral_code, user_tracking, referral_list } = require("../controllers/referral.controller");
const { add_coupon_code, coupon_list } = require("../controllers/coupon.controller");
const { event_list, event_detail } = require("../controllers/event.controller");
const { blog_list, blog_detail } = require("../controllers/blog.controller");
const { aboutus_list } = require("../controllers/aboutus.controller");
const { offers_page } = require("../controllers/offers.controller"); */
const { brand_list, add_vahical } = require("../controllers/brand.controller");

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // The directory where you want to store uploaded files
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // Optional: limit file size (here it's set to 1 MB)
});

router.use(function(req, res, next) {


    res.setHeader('Access-Control-Allow-Origin', '*');


    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Login
/* router.post("/registration", registration);
router.post("/login", loginWithPhoneOtp);
router.post("/update_user", update_user);
router.post("/current_user", current_user);
router.post("/verify_login", verify_login); */

//Address
/* router.post("/address_listing", address_listing);
router.post("/create_add", add_address);
router.post("/edit_address/:id", edit_address);
router.post("/delete_address/:id", delete_address);
router.post("/update_address", update_address);
 */

//brand list
router.post("/brand_list", brand_list);

//Add vahical
router.post("/add_vahical", upload.array('images', 5), add_vahical);
module.exports = router;