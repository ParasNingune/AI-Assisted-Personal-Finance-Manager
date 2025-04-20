import axios from "axios";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axios.post("http://localhost:2000/api/users/upload-image", formData, {
            headers: {
                'Content-Type': "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default uploadImage;