//Field is Required
export const required :FieldValidatorType= (value)=> {
   if (value) return undefined;
    return 'Field is required';

}

//Exceeded max numbers of symbols
export const maxLengthCreator = (maxLength:number):FieldValidatorType => (value) => {
    if (value.length > maxLength ) return `Exceeded max numbers of symbols ${maxLength} `;
     return undefined;
 
 }


//Field ValidatorType
export type FieldValidatorType = (value:string)=> string | undefined