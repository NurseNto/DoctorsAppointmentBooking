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
    medicalAidNumber?: string;
    medicalAidName?: string;
    notes?: string;
}
