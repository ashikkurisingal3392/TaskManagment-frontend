import { serverURl } from "./serverURL";
import { commonAPI } from "./commonAPIs";


//API calls

//1. Add tasks :POST method

export const addTaskAPI =async (reqBody)=>{

    return await commonAPI('POST',`${serverURl}/tasks`,reqBody)

}

//2. GET method for show tasks

export const showTaskAPI =async()=>{
    return await commonAPI('GET',`${serverURl}/tasks`,{})
}

//3.GET method for show data for updating
export const showUpdateTaskAPI =async(id)=>{
    return await commonAPI('GET',`${serverURl}/tasks/${id}`,{})
}


//4. update Task details in updateTask page

export const updateTaskAPI =async(id,reqBody)=>{
    return await commonAPI('PUT',`${serverURl}/tasks/${id}`,reqBody)
}

//5. delete Task in update page

export const deleteTaskAPI =async(id)=>{
    return await commonAPI('DELETE',`${serverURl}/tasks/${id}`,{})
}

//6.Download TaskList in My-task page PUT method
export const historyTaskAPI =async(reqBody)=>{
    return await commonAPI('POST',`${serverURl}/history`,reqBody)
}