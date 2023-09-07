export class GenerateOtpNumber {

    static generateOtp(){

        // let otp = otpGenerator.generate(6,{digits:true,upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false});
        // return otp;


        /**
         * Generate otp without library
         */
        let otp = Math.floor(Math.random() * 8999 + 1000);
        return otp.toString();
        

    }

}