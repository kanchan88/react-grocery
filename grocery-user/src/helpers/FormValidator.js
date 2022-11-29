
import React from 'react'

export default function FormValidator(message) {  
    let errors = {};
    if (!message) {
      errors.message = 'Message on Cake is Required';
    }
    return errors;
     
}
