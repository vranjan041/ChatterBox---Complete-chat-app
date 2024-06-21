import User from "../Models/user.model.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../Utils/generateToken.js"

export const signUp = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body
        if (password != confirmPassword) {
            return res.status(400).json({ error: "password confirm failed!" })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: "user already exists" })
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).send({ error: "invalid user data" })
        }

    } catch (error) {
        console.log('error in signup', error)
        res.status(500).json({ error: "Internal server error" })
    }
}
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "invalid credentials" })
        }
        generateTokenAndSetCookie(user._id, res)

        res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log('error in login', error)
        res.status(500).json({ error: "Internal server error" })
    }
}
export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log('error in logout', error)
        res.status(500).json({ error: "Internal server error" })
    }
}