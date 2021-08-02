const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// router.get('/', auth, (req,res) => res.send('Auth route'));

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route     POST api/auth
//@desc      Authenticate user and get token 
//@access    public

//see if user exists
router.post('/', [
  // check('name', 'Name is required')
  //     .not().isEmpty(),
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'please enter a valid password with atleast 6 character').exists()
],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body;
      try {
          //see if user exists
          let user = await User.findOne({ email });

          if (!user) {
              return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
          }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
          return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
          const payload = {
             user:{
               id:user.id
              } 
          };

          jwt.sign(
             payload, config.get('jwtSecret'),
          { expiresIn:36000 },
          (err,token) => {          //callback
              if (err) throw err;
              res.json({ token });
          }
          );

      } catch (err) {
          console.error(err.message);
          res.status(500).send('server error');

      }


  });
module.exports = router;
