CREATE TABLE [User] (
  id varchar(255) NOT NULL PRIMARY KEY,
  realm varchar(255),
  username varchar(255),
  email varchar(255) NOT NULL,
  verificationToken varchar(255),
  emailVerified varchar(255)
);

CREATE TABLE [UserCredentials] (
  id varchar(255) NOT NULL PRIMARY KEY,
  password varchar(255) NOT NULL,
  userId varchar(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES [User](id)
);

CREATE TABLE [Clinic] (
  id varchar(255) NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  phone varchar(8) NOT NULL,
  address varchar(255) NOT NULL,
  FOREIGN KEY (id) REFERENCES [User](id)
);

CREATE TABLE [ConsultRecord] (
  id varchar(255) NOT NULL PRIMARY KEY,
  clinicId varchar(255) NOT NULL,
  doctorName varchar(255) NOT NULL,
  patientName varchar(255) NOT NULL,
  diagonsis varchar(255),
  medication varchar(255),
  fee decimal(7,2),
  dateTime dateTime,
  followUp char,
  FOREIGN KEY (clinicId) REFERENCES [User](id)
)

CREATE INDEX clinicIndex ON [Clinic] (id);
CREATE INDEX consultRecordIndex ON [ConsultRecord] (id);
CREATE INDEX userIndex ON [User] (id);
CREATE INDEX userCredentialsIndex ON [UserCredentials](id);
