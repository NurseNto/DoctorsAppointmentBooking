PGDMP         !    
            {            ClinicDB    13.11    14.8 )    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16394    ClinicDB    DATABASE     U   CREATE DATABASE "ClinicDB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';
    DROP DATABASE "ClinicDB";
                postgres    false            �            1259    16489    appointments    TABLE     0  CREATE TABLE public.appointments (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    doctor_id integer NOT NULL,
    appointment_date date NOT NULL,
    appointment_time time without time zone NOT NULL,
    notes text,
    status character varying(20) DEFAULT 'pending'::character varying
);
     DROP TABLE public.appointments;
       public         heap    postgres    false            �            1259    16487    appointments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.appointments_id_seq;
       public          postgres    false    209            �           0    0    appointments_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;
          public          postgres    false    208            �            1259    16432    doctors    TABLE       CREATE TABLE public.doctors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    specialty character varying(255) NOT NULL,
    contact_number character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    other_details text
);
    DROP TABLE public.doctors;
       public         heap    postgres    false            �            1259    16430    doctors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.doctors_id_seq;
       public          postgres    false    203            �           0    0    doctors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;
          public          postgres    false    202            �            1259    16465    notifications    TABLE     �   CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    message text NOT NULL,
    sent_at timestamp without time zone NOT NULL,
    is_read boolean DEFAULT false
);
 !   DROP TABLE public.notifications;
       public         heap    postgres    false            �            1259    16463    notifications_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.notifications_id_seq;
       public          postgres    false    205            �           0    0    notifications_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;
          public          postgres    false    204            �            1259    16477    patients    TABLE     �  CREATE TABLE public.patients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    date_of_birth date,
    gender character varying(10),
    contact_number character varying(20),
    address text,
    medical_history text,
    notes text,
    medical_aid_number character varying(50),
    medical_aid_name character varying(255)
);
    DROP TABLE public.patients;
       public         heap    postgres    false            �            1259    16475    patients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.patients_id_seq;
       public          postgres    false    207            �           0    0    patients_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;
          public          postgres    false    206            �            1259    16421    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    contact_number character varying(20) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16419    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            �           2604    16492    appointments id    DEFAULT     r   ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);
 >   ALTER TABLE public.appointments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �           2604    16435 
   doctors id    DEFAULT     h   ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);
 9   ALTER TABLE public.doctors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �           2604    16468    notifications id    DEFAULT     t   ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);
 ?   ALTER TABLE public.notifications ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �           2604    16480    patients id    DEFAULT     j   ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);
 :   ALTER TABLE public.patients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �           2604    16424    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            �          0    16489    appointments 
   TABLE DATA           t   COPY public.appointments (id, patient_id, doctor_id, appointment_date, appointment_time, notes, status) FROM stdin;
    public          postgres    false    209   =/       �          0    16432    doctors 
   TABLE DATA           \   COPY public.doctors (id, name, specialty, contact_number, email, other_details) FROM stdin;
    public          postgres    false    203   Z/       �          0    16465    notifications 
   TABLE DATA           O   COPY public.notifications (id, user_id, message, sent_at, is_read) FROM stdin;
    public          postgres    false    205   �/       �          0    16477    patients 
   TABLE DATA           �   COPY public.patients (id, name, email, password, date_of_birth, gender, contact_number, address, medical_history, notes, medical_aid_number, medical_aid_name) FROM stdin;
    public          postgres    false    207   �/       �          0    16421    users 
   TABLE DATA           J   COPY public.users (id, name, contact_number, email, password) FROM stdin;
    public          postgres    false    201   B1       �           0    0    appointments_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.appointments_id_seq', 4, true);
          public          postgres    false    208            �           0    0    doctors_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.doctors_id_seq', 1, true);
          public          postgres    false    202            �           0    0    notifications_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);
          public          postgres    false    204            �           0    0    patients_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.patients_id_seq', 13, true);
          public          postgres    false    206            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    200                       2606    16498    appointments appointments_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_pkey;
       public            postgres    false    209            �           2606    16440    doctors doctors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.doctors DROP CONSTRAINT doctors_pkey;
       public            postgres    false    203            �           2606    16474     notifications notifications_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
       public            postgres    false    205                       2606    16485    patients patients_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.patients DROP CONSTRAINT patients_pkey;
       public            postgres    false    207            �           2606    16429    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201                       2606    16504 (   appointments appointments_doctor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);
 R   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_doctor_id_fkey;
       public          postgres    false    209    203    3069                       2606    16499 )   appointments appointments_patient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);
 S   ALTER TABLE ONLY public.appointments DROP CONSTRAINT appointments_patient_id_fkey;
       public          postgres    false    207    209    3073            �      x������ � �      �   h   x��A�@�u�=�AwYy6�62f���$z{y�WS_"?0-���.E2^?����v�KE｣®��y�G�tSM��Hf5��?,Ol�>+FG	C!�L�      �      x������ � �      �   C  x��ҽj�0���~�}X_�h;�B3�,J�&[,'�>}-�&�Zҡ������O}py=`�m����>}��r�٦]�B/Pc��ӀǡAO�(Cõ�Pa��5��<z7-�T�X�o2	�ֻ�]��t���P�7W�!�$6��1�M|��<?��
-z���7!�\��s� ��*��_`�}�w.�c�g�T��i2)[0�L͔��|��m@5~Su��B+�$�]�雙�����2�GQ
�ݎ�=�o�qfv6P���ul��)i4���\Ӟ]���RT�fg�M��^aʻk4�o�t?gs�̲��M�      �      x������ � �     