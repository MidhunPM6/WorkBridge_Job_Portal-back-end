
import OAuthUseCase from "../../application/useCase/commomUseCase/OAuthUseCase.js"
import { handleOAuthServices } from "../services/OAuthService.js"



const OAuthContainer = () =>{
    
    return{
  
      OAuthUsecase: new OAuthUseCase(handleOAuthServices) , 
   
    }
}  

export default OAuthContainer