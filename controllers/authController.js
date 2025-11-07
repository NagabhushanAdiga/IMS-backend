import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Login with PIN
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { pin } = req.body;

    if (!pin || pin.length < 4) {
      return res.status(400).json({ message: 'Please provide a valid PIN' });
    }

    // For demo, check if any user exists, if not create default admin
    let user = await User.findOne().select('+pin');

    if (!user) {
      // Create default admin user with PIN 1234
      user = await User.create({
        name: 'Admin User',
        pin: '1234',
        role: 'admin'
      });
      user = await User.findById(user._id).select('+pin');
    }

    if (user && (await user.matchPin(pin))) {
      res.json({
        _id: user._id,
        name: user.name,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid PIN' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        role: user.role
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, role } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = name || user.name;
      user.role = role || user.role;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        role: updatedUser.role,
        message: 'Profile updated successfully'
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update PIN
// @route   PUT /api/auth/pin
// @access  Private
export const updatePin = async (req, res) => {
  try {
    const { currentPin, newPin } = req.body;

    if (!newPin || newPin.length < 4) {
      return res.status(400).json({ message: 'New PIN must be at least 4 digits' });
    }

    const user = await User.findById(req.user._id).select('+pin');

    if (user && (await user.matchPin(currentPin))) {
      user.pin = newPin;
      await user.save();
      res.json({ message: 'PIN updated successfully' });
    } else {
      res.status(401).json({ message: 'Current PIN is incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

