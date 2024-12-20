import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (response.data.succes) {
                setDoctors(response.data.doctor)
                console.log(response.data);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {

        try {
            const { data } = await axios.post(backendUrl+'/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }



    const value = {
        aToken, setAToken, backendUrl, doctors, getAllDoctors , changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider