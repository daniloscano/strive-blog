const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)

const cloudStorage = (folder = 'upload', prefix = 'file') => {
    return new CloudinaryStorage(
        {
            cloudinary: cloudinary,
            params: (req, file) => {
                const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)
                const originalName = file.originalname.split('.').pop()
                const extension = file.originalname.split('.')[1]
                const fileName = `${prefix}-${timestamp}-${originalName}`

                return {
                    folder: folder,
                    format: extension,
                    public_id: fileName
                }
            }
        }
    )
}

const cloudUpload = (folder, prefix) => {
    const storage = cloudStorage(folder, prefix)
    return multer({ storage })
}

module.exports = {
    cloudUpload
}