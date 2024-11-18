import commonAPI from "./commonAPI"
import serverURL from "./serverURL"

// ipload empdetails
export const saveEmployeeAPI = async (empDetails)=>{
    return await commonAPI("POST",`${serverURL}/employeeDetails`,empDetails)
}

// get empdetails from 3000
export const getEmployeeAPI=async()=>{
    return await commonAPI("GET",`${serverURL}/employeeDetails`,{})
}

// delete from 3000
export const deleteEmployeeAPI = async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/employeeDetails/${id}`,{})
}

// edit details
export const updateEmployeeAPI = async (empDetails)=>{
    return await commonAPI("PUT",`${serverURL}/employeeDetails/${empDetails.id}`,empDetails)
}