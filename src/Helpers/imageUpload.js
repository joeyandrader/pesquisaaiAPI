const multer = require('multer')
const path = require('path')

// Destination to store the images
const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = ""

        if (req.baseUrl.includes("user")) {
            folder = "users"
        }

        if (req.baseUrl.includes("company")) {
            folder = "company"
        }

        cb(null, `public/image/${folder}`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|gif|jpeg|webp)$/)) {
            return cb(new Error("Por favor você pode enviar apenas (png, jpg, gif, jpeg e webp)"));
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }