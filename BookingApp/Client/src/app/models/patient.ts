export interface Patient {
    id: number;
    name: string;
    email: string;
    password: string;
    date_of_birth: Date;
    gender: string;
    contact_number: string;
    address?: string;
    medical_history?: string;
    medical_aid_number?: string;
    medical_aid_name?: string;
    notes?: string;
}
