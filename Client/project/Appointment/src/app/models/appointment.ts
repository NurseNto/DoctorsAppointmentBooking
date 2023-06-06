export interface Appointment {
    id: number;
    patient_id: number;
    doctor_id: number;
    appointment_date: Date;
    appointment_time: string;
    notes?: string;
    status?: string;
}
