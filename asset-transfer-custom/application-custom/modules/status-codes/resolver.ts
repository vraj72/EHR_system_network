export function StatusCodeResolver(status_code:string){
    switch(status_code){
        //


        case 'EHR - 001': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 002': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 003': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 004': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 006': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 007': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 008': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 009': return { code:status_code,type:'Error',message:'Error'}
        case 'EHR - 010': return { code:status_code,type:'Error',message:'Error'}

         // Read error cases
        case 'EHR - 021': return { code:status_code,type:'Read Error',message:' Patient with provided Patient ID does not exist'}
        case 'EHR - 022': return { code:status_code,type:'Read Error',message:'Error in fetching Details of Patient\n Try again later'}
        
        case 'EHR - 041': return { code:status_code,type:'Update Error',message:' Update Operation called on a non - existing Patient ID'}
        case 'EHR - 062': return { code:status_code,type:'Update Error',message:'Error in updating Patient Personal Details\n Try again later'}
        
        case 'EHR - 061': return { code:status_code,type:'Creation Error',message:'Patient with this ID already exists'}
        case 'EHR - 062': return { code:status_code,type:'Creation Error',message:'Error in inserting of Patient\n Try again later'}
        
        case 'EHR - 081': return { code:status_code, type:'Unhandled Error',message:'New type of Error encountered which has not yet been handled' }
        
        case 'EHR - 101': return { code:status_code, type:'Update Confirmation',message:'Patient Profile has been updated successfully' }
        case 'EHR - 102': return { code:status_code, type:'Insertion Confirmation',message:'Patient registered successfully' }
        case 'EHR - 103': return { code:status_code, type:'Insertion Confirmation',message:'Patient Report inserted successfully' }

        default: return { type:'Invalid Status Code Error',message:'Resolver has been invoked with invalid existing code' }
    }

}