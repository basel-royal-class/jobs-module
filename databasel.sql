CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    email_verified_at TIMESTAMP,
    password VARCHAR(255),
    remember_token VARCHAR(100),
    last_login_at TIMESTAMP,
    image VARCHAR(255),
    whatsapp_number VARCHAR(20),
    phone_number VARCHAR(20),
    dob DATE
);
-- Create Resumes table
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    link VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE resumes 
ADD CONSTRAINT fk_resumes_users FOREIGN KEY (user_id) 
REFERENCES users(id) ON DELETE CASCADE;

-- Create Schools table
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL
);

-- Create Industries table
CREATE TABLE industries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL
);

-- Create Degrees table
CREATE TABLE degrees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL
);

-- Create User Job Qualifications table
CREATE TABLE qualifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    specialization VARCHAR(25) NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    school_id INTEGER NOT NULL,
    degree_id INTEGER NOT NULL,
    country_id INTEGER NOT NULL,
    city_id INTEGER,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    FOREIGN KEY (school_id) REFERENCES schools(id),
    FOREIGN KEY (degree_id) REFERENCES degrees(id)
);


CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL
);

-- Create Cities table (if not exists)
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(225) NOT NULL,
    country_id INTEGER NOT NULL,
    created_at VARCHAR(50) NOT NULL,
    updated_at VARCHAR(50) NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
);


ALTER TABLE qualifications
ADD CONSTRAINT fk_qualifications_users
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE qualifications
ADD CONSTRAINT fk_qualifications_schools 
FOREIGN KEY (school_id) REFERENCES schools(id);

ALTER TABLE qualifications
ADD CONSTRAINT fk_qualifications_degrees
FOREIGN KEY (degree_id) REFERENCES degrees(id);

ALTER TABLE qualifications
ADD CONSTRAINT fk_qualifications_countries
FOREIGN KEY (country_id) REFERENCES countries(id);

ALTER TABLE qualifications
ADD CONSTRAINT fk_qualifications_cities
FOREIGN KEY (city_id) REFERENCES cities(id);

INSERT INTO degrees (id, name, created_at, updated_at) 
VALUES 
    (1, 'Bachelor of Science', NOW(), NOW()),
    (2, 'Master of Science', NOW(), NOW());

INSERT INTO schools (id, name, created_at, updated_at) 
VALUES 
    (1, 'Oxford University', NOW(), NOW()),
    (2, 'Harvard University', NOW(), NOW());

INSERT INTO countries (id, name, created_at, updated_at) 
VALUES 
    (1, 'United States', NOW(), NOW()),
    (2, 'United Kingdom', NOW(), NOW()),
    (3, 'Canada', NOW(), NOW());

INSERT INTO cities (id, name, country_id, created_at, updated_at) 
VALUES 
    (1, 'New York', 1, NOW(), NOW()),
    (2, 'Los Angeles', 1, NOW(), NOW()),
    (3, 'London', 2, NOW(), NOW()),
    (4, 'Manchester', 2, NOW(), NOW()),
    (5, 'Toronto', 3, NOW(), NOW()),
    (6, 'Vancouver', 3, NOW(), NOW());

ALTER TABLE qualifications 
    ALTER COLUMN created_at SET DEFAULT NOW(),
    ALTER COLUMN updated_at SET DEFAULT NOW();


ALTER TABLE countries 
    ADD COLUMN country_code VARCHAR(10),
    ADD COLUMN currency_code VARCHAR(10);


CREATE INDEX idx_qualifications_user_id ON qualifications(user_id);
CREATE INDEX idx_qualifications_school_id ON qualifications(school_id);
CREATE INDEX idx_qualifications_degree_id ON qualifications(degree_id);
CREATE INDEX idx_qualifications_country_id ON qualifications(country_id);
CREATE INDEX idx_qualifications_city_id ON qualifications(city_id);

-- Create composite index for frequently queried combinations
CREATE INDEX idx_qualifications_user_specialization ON qualifications(user_id, specialization);

-- If you frequently filter by date ranges
CREATE INDEX idx_qualifications_dates ON qualifications(start_date, end_date);

