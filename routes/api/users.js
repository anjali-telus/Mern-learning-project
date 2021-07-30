const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

const { check, validationResult } = require('express-validator/check');

//@route     GET api/users
//@desc      test route
//@access    public

// router.get('/',(req,res) => 
//     res.send('users route')
// );
// module.exports= router;


// @route       POST api/users
// @desc        register/users
// @access      public

// router.post('/',[
// check('name','Name is required')
// .not().isEmpty(),
// check('email','Please enter a valid email').isEmail(),
// check('password','please enter a valid password with atleast 6 character').isLength({min:6})
// ],
// (req,res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//        return res.status(400).json({ errors: errors.array() })
//     }
//     res.send('users route')
// });



//see if user exists
router.post('/', [
    check('name', 'Name is required')
        .not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'please enter a valid password with atleast 6 character').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;
        try {
            //see if user exists
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).json({ errors: [{ msg: 'user already exists' }] });
            }
            //get user gravatar
            const avatar = gravatar.url(email, {
                "s": "200",
                "r": "pg",
                "d": "mm"
            })
            user = new User({
                name,
                email,
                password,
                avatar
            });
            //encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            res.send('users registered');
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('server error');

        }


    });


module.exports = router;