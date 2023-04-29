CREATE DATABASE networks;

CREATE TABLE users(
    user_id INT NOT NULL,
    username VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    encrypted_password VARCHAR(80) NOT NULL,
    photo VARCHAR(128),
    place VARCHAR(64) NOT NULL,
    description VARCHAR(256) NOT NULL,
    currentwork_id INT,
    applicant_or_recruiter BOOLEAN NOT NULL,
    primary key (user_id)
);

CREATE TABLE application(
    job_id INT NOT NULL,
    applicant_id INT NOT NULL,
    primary key (job_id, applicant_id)
);

CREATE TABLE skill(
    user_id INT NOT NULL,
    skillname VARCHAR(64) NOT NULL,
    primary key (user_id, skillname)
);

CREATE TABLE connection(
    user1 INT NOT NULL,
    user2 INT NOT NULL,
    primary key (user1, user2)
);

CREATE TABLE conn_invite(
    user1 INT NOT NULL,
    user2 INT NOT NULL,
    primary key (user1, user2)
);

CREATE TABLE likes(
    liker INT NOT NULL,
    post_id INT NOT NULL,
    primary key (liker, post_id)
);

CREATE TABLE comment(
    comment_id INT NOT NULL,
    commenter_id INT NOT NULL,
    post_id INT NOT NULL,
    comment VARCHAR(64) NOT NULL,
    comment_time TIMESTAMP NOT NULL,
    primary key(comment_id)
);

CREATE TABLE post(
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    photo VARCHAR(128),
    caption VARCHAR(64) NOT NULL,
    post_time TIMESTAMP NOT NULL,
    primary key (post_id)
);

CREATE TABLE hashtag_post(
    post_id INT NOT NULL,
    hashtag VARCHAR(32) NOT NULL,
    primary key (post_id, hashtag)
);

CREATE TABLE work(
    work_id INT NOT NULL,
    user_id INT NOT NULL,
    companyname VARCHAR(64) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    position VARCHAR(64) NOT NULL,
    primary key (work_id)
);

CREATE TABLE message(
    user1 INT NOT NULL,
    user2 INT NOT NULL,
    sent_time TIMESTAMP NOT NULL,
    mesg_text VARCHAR(80) NOT NULL,
    primary key (user1, user2, mesg_text)
);

CREATE TABLE chat(
    user1 INT NOT NULL,
    user2 INT NOT NULL,
    primary key (user1, user2)
);

CREATE TABLE education(
    edu_id INT NOT NULL,
    user_id INT NOT NULL,
    institutename VARCHAR(64) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    primary key (edu_id)
);

CREATE TABLE requirement(
    job_id INT NOT NULL,
    skillname VARCHAR(64) NOT NULL,
    primary key (job_id, skillname)
);

CREATE TABLE job(
    job_id INT NOT NULL,
    company VARCHAR(64) NOT NULL,
    place_of_posting VARCHAR(64) NOT NULL,
    time_launched TIMESTAMP NOT NULL,
    deadline TIMESTAMP NOT NULL,
    full_part BOOLEAN NOT NULL,
    skill_level VARCHAR(64) NOT NULL,
    company_desc VARCHAR(64) NOT NULL,
    job_desc VARCHAR(64) NOT NULL,
    launched_by INT NOT NULL,
    is_open BOOLEAN NOT NULL,
    primary key (job_id)
);

CREATE TABLE numusers(
    num_us INT,
    num_edu INT,
    num_job INT,
    num_work INT,
    num_post INT,
    num_comment INT
);

INSERT into numusers values (0,0,0,0,0,0);

ALTER TABLE users
    ADD CONSTRAINT fk_currentwork_id FOREIGN KEY (currentwork_id) REFERENCES work(work_id) 
    ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE application
    ADD CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES job(job_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE application
    ADD CONSTRAINT fk_applicant_id FOREIGN KEY (applicant_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE skill
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE conn_invite
    ADD CONSTRAINT fk_user1 FOREIGN KEY (user1) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE conn_invite
    ADD CONSTRAINT fk_user2 FOREIGN KEY (user2) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE connection
    ADD CONSTRAINT fk_user1 FOREIGN KEY (user1) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE connection
    ADD CONSTRAINT fk_user2 FOREIGN KEY (user2) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE comment
    ADD CONSTRAINT fk_commenter_id FOREIGN KEY (commenter_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE comment
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post(post_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE likes
    ADD CONSTRAINT fk_liker_id FOREIGN KEY (liker) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE likes
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post(post_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE post
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE hashtag_post
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES post(post_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE chat
    ADD CONSTRAINT fk_user1 FOREIGN KEY (user1) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE chat
    ADD CONSTRAINT fk_user2 FOREIGN KEY (user2) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE work
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE message
    ADD CONSTRAINT fk_users FOREIGN KEY(user1, user2) REFERENCES chat(user1, user2)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE education
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE requirement
    ADD CONSTRAINT fk_job_id FOREIGN KEY (job_id) REFERENCES job(job_id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE job
    ADD CONSTRAINT fk_launched_by FOREIGN KEY (launched_by) REFERENCES users(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE;