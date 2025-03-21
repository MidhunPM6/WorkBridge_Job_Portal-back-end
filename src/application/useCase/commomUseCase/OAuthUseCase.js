
export default class OAuthUseCase{
    constructor(handleOAuthServices){
       this.handleOAuthServices =handleOAuthServices
    }
    async execute(code,codeVerifier){
        try {
            if(!code || !codeVerifier){
             throw new Error("Code and codeVerifier is missing");
             
            }
            const  googleUser = await this.handleOAuthServices(code,codeVerifier)
            if(!googleUser){
                throw new Error("Failed to retrive user info");
                
            }
            return {
                success: true,
                data: googleUser
            };
            
             
        } catch (error) {
            
        }
        
    }
}
 