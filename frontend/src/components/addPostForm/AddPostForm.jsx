import {useState} from 'react';

const AddPostForm = () => {
    const [isUploading, setIsUploading] = useState(false)
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState('')

    const onChangeInput = (e) => {
        setTitle(e.target.value)
    }

    const onChangeFile = (e) => {
        setFile(e.target.files[0])
    }

    const uploadFile = async (file) => {
        setIsUploading(true)
        const fileData = new FormData()
        fileData.append('img', file)

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/cloud-upload`, {
                method: 'POST',
                body: fileData
            })
            setIsUploading(false)
            return await response.json()
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (file) {
            try {
                const uploadedFile = await uploadFile(file)
                const payload = {
                    title: title,
                    img: uploadedFile.img
                }
                const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/posts/create`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })

                return await response.json()
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className='d-flex flex-column gap-2'
            encType='multipart/form-data'
        >
            <input
                onChange={onChangeInput}
                className='form-control'
                type="text"
                name="title"
            />
            <input
                onChange={onChangeFile}
                className='form-control'
                type="file"
                name="img"
            />
            <button
                type='submit'
                className='btn btn-primary'>
                {isUploading ? 'Carico il file...' : 'Invia'}
            </button>
        </form>
    );
};

export default AddPostForm;