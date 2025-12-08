import mongoose from "mongoose";

export function parseMongooseValidationError(error: mongoose.Error.ValidationError) {
    const fieldErrors: Record<string, string> = {};
    for (const fieldName in error.errors) {
        if (Object.prototype.hasOwnProperty.call(error.errors, fieldName)) {
            const fieldErrorMessage = error.errors[fieldName].message;
            if (!fieldErrors[fieldName]) {
                fieldErrors[fieldName] = fieldErrorMessage;
            }
        }
    }
    return fieldErrors;
}