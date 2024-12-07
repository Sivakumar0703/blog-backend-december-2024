

const isAdmin = async(req,res,next) => {
    const {isAdmin} = req.user;
    try {
        if(!isAdmin){
            return res.status(403).json({message:"access denied".toUpperCase()});
        }
        next()
    } catch (error) {
        res.status(500).json({message:"error in middleware".toUpperCase()});
    }
}

export default isAdmin