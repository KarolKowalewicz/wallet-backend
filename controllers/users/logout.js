const  User  = require('../../models/user');

const logoutUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
    
        if (!user) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: "Not authorized",
            });
        }
    
        user.token = null;
        await user.save();
    
        return res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
    
};

module.exports = { logoutUser };