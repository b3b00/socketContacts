DROP TABLE IF EXISTS contact;
CREATE TABLE  contact (
  id int(11) NOT NULL AUTO_INCREMENT,
  lastName varchar(255) DEFAULT NULL,
  firstName varchar(255) DEFAULT NULL,
  phoneNumber varchar(255) DEFAULT NULL,
  createdAt date DEFAULT NULL,
  updatedAt date DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS messages;
CREATE TABLE  messages (
  userId varchar(255) DEFAULT NULL,
  username varchar(255) DEFAULT NULL,
  message varchar(255) DEFAULT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  createdAt date DEFAULT NULL,
  updatedAt date DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS users;
CREATE TABLE  users (
  username varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  id int(11) NOT NULL AUTO_INCREMENT,
  createdAt date DEFAULT NULL,
  updatedAt date DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;