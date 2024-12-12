import React from 'react'
import FormBuilder from '@/components/FormBuilder'

function teacherLogin() {
    const fields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Mot de passe', type: 'password' },
    ]
    return (
        <div>
            <FormBuilder fields={fields} apiEndpoint="https://api.planify.com/login" buttonText="Se connecter" />
        </div>
    )
}

export default teacherLogin