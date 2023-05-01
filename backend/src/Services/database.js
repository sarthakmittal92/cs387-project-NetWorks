const bcrypt = require("bcrypt");
const { Pool } = require("pg");
var fs = require('fs')
const data = fs.readFileSync('../config.txt',{encoding:'utf8', flag:'r'});
console.log(JSON.parse(data))
const pool = new Pool(JSON.parse(data));
var axios = require('axios');
const { start } = require("repl");

async function getHashedFromDB(email) {
  const values = [email];
  try{
      const res = await pool.query(
          "SELECT encrypted_password FROM users WHERE email=$1;",
          values
        );
      if(res.rowCount==0){
        return "";
      }
      else{
        return res.rows[0].encrypted_password;
      }
     
  }catch (error) {
    console.log(error);
  }
}
async function amIRecruiterOrApplicant(user_id){
  try {
    const res = await pool.query(
      "select applicant_or_recruiter from users where user_id=$1;",
      [user_id]
    );
    return res.rows[0].applicant_or_recruiter;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function isRecruiter(email){
  const values = [email];
  try {
    const res = await pool.query("select applicant_or_recruiter from users where email=$1;",
    values);
    if(res.rowCount==0){
      return -1;
    }
    else{
      return res.rows[0].applicant_or_recruiter;
    }
  } catch (error) {
    console.log(error);
  }
}
async function checkPassword(password,hash,y){

  try {
    var xyz;
    var result= await bcrypt.compare(password,hash);
    if(result){
      xyz =  {value:1,rec:y,result:"Logged In!"};
    }
    else{
      xyz =  {value:0,rec:-2,result:"Incorrect Password!"};
    }
    console.log(xyz);
    return xyz;
  } catch (error) {
    console.log(error);
  }
}

async function authenticate(email,password) {
  try{
    var x = await getHashedFromDB(email);
    var y = await isRecruiter(email);
    console.log(x,y);
    if(x===""){
      return {value:0, rec:-4, result:"Incorrect Email_id!"};
    }
    else if(y===-1){
      return {value:0, rec:-5, result:"Incorrect Email_id!"};
    }
    return await checkPassword(password,x,y);
    
  }catch(error){
    return {value:0,rec:-1,result:"Oops! An Error FUCKED YOU!"};
  }
}

async function getnewuser_num(){
  try{
    const res = await pool.query("select * from numusers;");
    var x = res.rows[0].num_us;
    value = [x+1,x];
    const res_1 = await pool.query("UPDATE numusers SET num_us = $1 where num_us = $2;",value);
    return x;
  }catch(error){
    throw error;
  }
}
async function getnewedu_num(){
  try{
    const res = await pool.query("select * from numusers;");
    var x = res.rows[0].num_edu;
    value = [x+1,x];
    const res_1 = await pool.query("UPDATE numusers SET num_edu = $1 where num_edu = $2;",value);
    return x;
  }catch(error){
    throw error;
  }
}
async function getnewjob_num(){
  try{
    const res = await pool.query("select * from numusers;");
    var x = res.rows[0].num_job;
    value = [x+1,x];
    const res_1 = await pool.query("UPDATE numusers SET num_job = $1 where num_job = $2;",value);
    return x;
  }catch(error){
    throw error;
  }
}
async function getnewwork_num(){
  try{
    const res = await pool.query("select * from numusers;");
    var x = res.rows[0].num_work;
    value = [x+1,x];
    const res_1 = await pool.query("UPDATE numusers SET num_work = $1 where num_work = $2;",value);
    return x;
  }catch(error){
    throw error;
  }
}
async function getnewpost_num(){
  try{
    const res = await pool.query("select * from numusers;");
    var x = res.rows[0].num_post;
    value = [x+1,x];
    const res_1 = await pool.query("UPDATE numusers SET num_post = $1 where num_post = $2;",value);
    return x;
  }catch(error){
    throw error;
  }
}

async function getnewcomm_num(){
  try{
    const res = await pool.query("select * from numusers;");
    var x = res.rows[0].num_comment;
    value = [x+1,x];
    const res_1 = await pool.query("UPDATE numusers SET num_comment = $1 where num_comment = $2;",value);
    return x;
  }catch(error){
    throw error;
  }
}

async function register(user_name,email,password,rec_app) {
  try{
      console.log("HEHE I AM GAY")
      var y = await checkUser(email);
      console.log(y);
      if(y===1){
        return {value:0,rec:-1,result:"User already exist!"};
      }
      // if(y.value){return {value:0,rec:-1,result:"User already exist!"};}
      var z = await getnewuser_num();
      bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in database here
        const values = [z,user_name,email,hash,"image-blank_photo.jpg","","",rec_app];
        const newres = pool.query("insert into users values($1, $2, $3, $4, $5, $6, $7, null, $8);",values);
        var data = {
          "username": user_name,
          "secret": hash,
          "email": email,
        };
        
        var config = {
          method: 'post',
          url: 'https://api.chatengine.io/users/',
          headers: {
            'PRIVATE-KEY': '{af9a2350-4099-4dea-8ed1-f034693292e2}'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      });
      return {value:1,rec:rec_app,result:"Registered!"};
  }catch (error) {
      throw error;
  }
}

// Returns an integer userid corresponding to the email if it exists, else -1
async function getUserID(email){
  const values = [email];
  try {
    const res = await pool.query(
      "SELECT user_id FROM users WHERE email=$1;",
      values
    );
    if(res.rowCount==0){
      return -1;
    }
    else{
      return res.rows[0].user_id;
    }
  } catch (error) {
    console.log(error);
    return -1;
  }
}

async function getUserList(){
  try {
    const res = await pool.query(
      "SELECT username, email, user_id FROM users;"
    );
    return {value:1, users: res.rows};
  } catch (error) {
    console.error(error);
  }
}

async function acceptRequest(sender, receiver){
  try {
    const values = [sender, receiver];
    const res = await pool.query(
      "SELECT user1, user2 FROM conn_invite WHERE user1=$1 AND user2=$2;",
      values
    );
    if(res.rowCount==0){
      return {value:-1, result:"Invite doesn't exists!"};
    }
    else{
      const resnew = await pool.query(
        "delete from conn_invite where user1=$1 and user2=$2;",
        values
      );
      const res1 = await pool.query(
        "INSERT INTO connection values($1,$2);",
        values
      );
      const res2 = await pool.query(
        "INSERT INTO connection values($2,$1);",
        values
      );
      return {value:1, result:"Successful"};
    }

  } catch (error) {
    console.log(error);
    return {value:0, result:"Oops! An Error Occurred!"};
  }
}
async function rejectRequest(sender, receiver){
  try {
    const values = [sender, receiver];
    const res = await pool.query(
      "SELECT user1, user2 FROM conn_invite WHERE user1=$1 AND user2=$2;",
      values
    );
    if(res.rowCount==0){
      return {value:-1, result:"Invite doesn't exists!"};
    }
    else{
      const resnew = await pool.query(
        "delete from conn_invite where user1=$1 and user2=$2;",
        values
      );
      return {value:1, result:"Successful"};
    }

  } catch (error) {
    console.log(error);
    return {value:0, result:"Oops! An Error Occurred!"};
  }
}


async function checkUser(email){
  try {
    const values = [email];
    const res = await pool.query(
      "SELECT username from users where email=$1;",
      values
    );
    if(res.rowCount!=0){
      return 1;
    }
    else{
      return 0;
    }
  } catch (error) {
    console.error(error);
  }
}

async function saveImage(userid, filename){
  const values = [userid, filename];
  try {
    const res = await pool.query(
      "UPDATE users SET photo=$2 WHERE user_id=$1;",
      values
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function getUsernamePassword(user_id){
  const values = [user_id]
  try {
    const res = await pool.query(
      "SELECT username, encrypted_password FROM users where user_id=$1;",
      values
    );
    return {userName: res.rows[0].username, userSecret: res.rows[0].encrypted_password};
  } catch (error) {
    console.log(error);
  }
}

async function uploadPost(user_id, caption, body, filename){
  try {
    // console.log(user_id, caption, hashtags, filename);
    var post_id = await getnewpost_num();
    const values = [user_id, caption, filename, post_id];
    const res = await pool.query(
      "INSERT INTO post values($4, $1, $3, $2, current_timestamp);",
      values
    );
    var valuesnew;
    for(let i=0;i<body.hashtags;i++){
      valuesnew = [post_id, body[''+i]];
      const resnew = await pool.query(
        "INSERT INTO hashtag_post values($1, $2);",
        valuesnew
      );
    } 
    return {value:1, result:"Posted"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function getProfilePhoto(user_id){
  try {
    const values = [user_id];
    const res = await pool.query(
      "SELECT photo FROM users where user_id=$1;",
      values
    );
    if(res.rowCount!=0){
      return {path:res.rows[0].photo};
    }
    else{
      return {path:"Image not found!"};
    }
  } catch (error) {
    console.log(error);
    return {path:"An Error occurred!"};
  }
}

async function getUserConnections(user_id){
  try {
    const values = [user_id];
    const res = await pool.query(
      "select username, user_id from users where user_id in (select user2 from connection where user1=$1);",
      values
    );
    return {value:1, users:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, users:[]};
  }
}

async function getAllJobs(){
  try {
    const res = await pool.query(
      "select * from job");
    return {value:1, jobs:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, jobs:[]};
  }
}

async function userInvitationsReceived(user_id){
  try {
    const values = [user_id];
    const res = await pool.query(
      "SELECT username, user_id from users where user_id in (select user1 from conn_invite where user2=$1);",
      values
    );
    return {value:1, users:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, users:[]};
  }
}

async function deleteSentRequest(user_id, receiver_id){
  try {
    const check = await isInvitation(user_id, receiver_id);
    if(!check){
      return {value:2, result:"No such invite exists"};
    }
    const values = [user_id, receiver_id];
    const res = await pool.query(
      "DELETE FROM conn_invite where user1=$1 and user2=$2;",
      values
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function userInvitationsSent(user_id){
  try {
    const values = [user_id];
    const res = await pool.query(
      "SELECT username, user_id from users where user_id in (select user2 from conn_invite where user1=$1);",
      values
    );
    return {value:1, users:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, users:[]};
  }
}

async function cancelJobApplication(user_id, job_id){
  try {
    const values = [user_id, job_id];
    const res = await pool.query(
      "delete from application where job_id=$2 and applicant_id=$1;",
      values
    );
    return {value:1, result:"Successful"};
  } 
  catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function allAppliedJobs(user_id){
  try {
    const values = [user_id];
    const res = await pool.query(
      "select * from job natural join application where applicant_id=$1",
      values
    ); 
    return {value:1, jobs:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, jobs:[]};
  }
}

async function getAJob(job_id){
  try {
    const values = [job_id];
    const res = await pool.query(
      "select * from job where job_id=$1;",
      values
    );
    return {value:1, job:[res.rows[0]]};
  } catch (error) {
    console.log(error);
    return {value:0, jobs:[]};
  }
}

async function updateProfile(user_id, place, desc){
  try {
    const values = [user_id, place, desc];
    const res = await pool.query(
      "UPDATE users SET place=$2, description=$3 where user_id=$1;",
      values
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function uploadPostWithoutPhoto(user_id, caption, body){
  try {
    // console.log(user_id, caption, hashtags, filename);
    var post_id = await getnewpost_num();
    const values = [user_id, caption, post_id];
    const res = await pool.query(
      "INSERT INTO post values($3, $1, null, $2, current_timestamp);",
      values
    );
    var valuesnew;
    for(let i=0;i<body.hashtags.length;i++){
      console.log(body.hashtags);
      valuesnew = [post_id, body.hashtags[i].id];
      const resnew = await pool.query(
        "INSERT INTO hashtag_post values($1, $2);",
        valuesnew
      );
    }
    return {value:1, result:"Posted"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed!! Try again"};
  }
}

async function getPostComments(post_id){
  try {
    const res = await pool.query(
      "SELECT username as user_name, photo as user_photo, comment as user_comment, comment_id as id, CASE WHEN EXTRACT(EPOCH FROM (current_timestamp - comment_time)) < 60 THEN ROUND(EXTRACT(EPOCH FROM (current_timestamp - comment_time))) || ' s' WHEN EXTRACT(EPOCH FROM (current_timestamp - comment_time)) < 3600 THEN ROUND(EXTRACT(EPOCH FROM (current_timestamp - comment_time))/60) || ' m' WHEN EXTRACT(EPOCH FROM (current_timestamp - comment_time)) < 86400 THEN ROUND(EXTRACT(EPOCH FROM (current_timestamp - comment_time))/3600) || ' h' WHEN EXTRACT(DAY FROM (current_timestamp - comment_time)) <= 30 THEN EXTRACT(DAY FROM (current_timestamp - comment_time)) || ' d' WHEN EXTRACT(MONTH FROM (current_timestamp - comment_time)) <= 12 THEN EXTRACT(MONTH FROM (current_timestamp - comment_time)) || ' mon' ELSE EXTRACT(YEAR FROM (current_timestamp - comment_time)) || ' y' END AS time FROM comment, users where post_id=$1 AND comment.commenter_id=users.user_id ORDER BY comment_time DESC;",
      [post_id]
    );
    return {comments: res.rows, value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {comments:[], value:0, result:"Failed"};
  }
}

async function getPostInfo(user_id, post_id){
  try {
    const res = await pool.query("select users.username as post_owner, users.photo as post_owner_photo, CASE WHEN EXTRACT(EPOCH FROM (current_timestamp - post_time)) < 60 THEN ROUND(EXTRACT(EPOCH FROM (current_timestamp - post_time))) || ' s' WHEN EXTRACT(EPOCH FROM (current_timestamp - post_time)) < 3600 THEN ROUND(EXTRACT(EPOCH FROM (current_timestamp - post_time))/60) || ' m' WHEN EXTRACT(EPOCH FROM (current_timestamp - post_time)) < 86400 THEN ROUND(EXTRACT(EPOCH FROM (current_timestamp - post_time))/3600) || ' h' WHEN EXTRACT(DAY FROM (current_timestamp - post_time)) <= 30 THEN EXTRACT(DAY FROM (current_timestamp - post_time)) || ' d' WHEN EXTRACT(MONTH FROM (current_timestamp - post_time)) <= 12 THEN EXTRACT(MONTH FROM (current_timestamp - post_time)) || ' mon' ELSE EXTRACT(YEAR FROM (current_timestamp - post_time)) || ' y' END AS post_time, post.photo is not null as bool_post_photo, post.photo as post_photo, post.caption as post_caption from users, post where post_id=$1 and post.user_id=users.user_id;",
    [post_id]);
    const resnew = await pool.query("select (select count(liker) as like_count from likes where post_id=$1), (select count(comment_id) as comment_count from comment where post_id=$1), (select $2 in (select liker from likes where post_id=$1) as i_like), (select string_agg(hashtag, ' ') as post_hashtags from hashtag_post where post_id=$1);",
    [post_id, user_id]);
    const final = Object.assign({}, res.rows[0], resnew.rows[0]);
    return final;
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function getFeedPosts(num){
  try {
    const res = await pool.query(
      "select post_id from post order by post_time desc limit $1",
      [num]
    );
    const resnew = await pool.query("select post_id from post");
    if(num>=resnew.rowCount){
      return {end:true, post_ids:res.rows};
    }
    else{
      return {end:false, post_ids:res.rows};
    }
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}
async function isConnection(user1, user2){
  try {
    const res = await pool.query(
      "select * from connection where user1=$1 and user2=$2;",
      [user1, user2]
    );
    if(res.rowCount!=0){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function isInvitation(sender, receiver){
  try {
    const res = await pool.query(
      "select * from conn_invite where user1=$1 and user2=$2;",
      [sender, receiver]
    );
    if(res.rowCount!=0){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function sendRequest(sender, receiver){
  try {
    if(sender===receiver){
      return {value:2, result:"Can't send request to self"};
    }
    const check = await isConnection(sender, receiver);
    const anotherCheck = await isInvitation(sender, receiver);
    const anotherCheckAnotherCheck = await isInvitation(receiver, sender);
    if(check){
      return {value:3, result:"Already a connection"};
    }
    if(anotherCheck){
      return {value:4, result:"Have already sent a request"};
    }
    if(anotherCheckAnotherCheck){
      return {value:5, result:"You have received a connection request from the receiver"};
    }
    const res = await pool.query(
      "insert into conn_invite values($1, $2);",
      [sender, receiver]
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}
async function createJob(company, place_of_posting, deadline, full_part, skill_level, company_desc, job_desc, launched_by){
  try {
    const checkValues = [launched_by];
    const check = await pool.query(
      "select applicant_or_recruiter from users where user_id=$1;",
      checkValues
    );
    if(!check.rows[0].applicant_or_recruiter){
      return {result:"Applicant can't create jobs!"};
    }
    var job_id = await getnewjob_num();
    const values = [job_id, company, place_of_posting, deadline, full_part, skill_level, company_desc, job_desc, launched_by];
    const res = await pool.query(
      "insert into job values($1, $2, $3, current_timestamp, to_timestamp($4, 'DD Mon YYYY'), $5, $6, $7, $8, $9, true);",
      values
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function applyToAJob(user_id, job_id, filename){
  try {
    const resnew = await pool.query(
      "select current_timestamp<=deadline as check from job where job_id=$1;",
      [job_id]
    );
    if(!resnew.rows[0].check){
      return {value:0, result:"Deadline of this job is over!"};
    }
    const res = await pool.query(
      "insert into application values($1,$2,$3);",
      [job_id, user_id, filename]
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function addComment(user_id, post_id, comment){
  try {
    var comment_id = await getnewcomm_num();
    const res = await pool.query(
      "insert into comment values($1, $2, $3, $4, current_timestamp);",
      [comment_id, user_id, post_id, comment]
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function likeUnlikeAPost(user_id, post_id){
  try {
    const check = await pool.query(
      "select $1 in (select liker from likes where post_id=$2) as check;",
      [user_id, post_id]
    );
    if(check.rows[0].check){
      //unlike
      const res = await pool.query(
        "delete from likes where liker=$1 and post_id=$2;",
        [user_id, post_id]
      );
    }
    else{
      //like
      const res = await pool.query(
        "insert into likes values($1,$2);",
        [user_id, post_id]
      );
    }
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function getUsernameAndProfilePhoto(user_id){
  try {
    const profilePhoto = await getProfilePhoto(user_id);
    const username = await getUsernamePassword(user_id);
    return {user_name: username.userName, profile_photo:profilePhoto.path};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"}; 
  }
}

async function getJobApplicants(job_id){
  try {
    const res = await pool.query(
      "select username, user_id, path from users, application where application.applicant_id=users.user_id and job_id=$1;",
      [job_id]
    );
    return {value:1, users:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, users:[]};
  }
}

async function getCreatedJobs(user_id){
  try {
    const res = await pool.query(
      "select * from job where launched_by=$1;",
      [user_id]
    );
    return {value:1, jobs:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, jobs:[]};
  }
}

async function deleteCreatedJob(user_id, job_id){
  try {
    const resnew = await pool.query(
      "select is_open from job where launched_by=$1 and job_id=$2;",
      [user_id, job_id]
    );
    if(!resnew.rows[0].is_open){
      return {value:0, result:"The job was already closed!"};
    }
    const res = await pool.query(
      "delete from job where job_id=$2 and launched_by=$1;",
      [user_id, job_id]
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function closeAJob(recruiter_id, job_id){
  try {
    const resnew = await pool.query(
      "update job set is_open=false where launched_by=$1 and job_id=$2;",
      [recruiter_id, job_id]
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function getUserInfo(logged_in_user_id, required_page_user_name){
  try {
    const isrec = await amIRecruiterOrApplicant(logged_in_user_id);
    const res1 = await pool.query(
      "select user_id as required_page_user_id, username as user_name, email, place, photo as user_photo, description as desc from users where username like $1;",
      [required_page_user_name]
    );
    console.log(res1.rows);
    const required_page_user_id = res1.rows[0].required_page_user_id;
    const urec = await amIRecruiterOrApplicant(required_page_user_id);
    const res2 = await pool.query(
      "select count(post_id) as num_posts from post where user_id=$1;",
      [required_page_user_id]
    );
    const res3 = await pool.query(
      "select count(user2) as num_conns from connection where user1=$1;",
      [required_page_user_id]
    );
    var iscur = (required_page_user_id === logged_in_user_id);
    const res4 = await pool.query(
      "select position || ', ' || companyname || ' (' || TO_CHAR(start_time, 'YYYY/MM/DD') || ' to present' || ')' as cur_work from work where user_id=$1 and position is not null;",
      [required_page_user_id]
    );
    const res5 = await pool.query(
      "select * from connection where user1=$1 and user2=$2;",
      [required_page_user_id, logged_in_user_id]
    );
    var isconn;
    var reqstring;
    if(res5.rowCount===0){
      isconn = false;
      const res6 = await pool.query(
        "select * from conn_invite where user1=$1 and user2=$2;",
        [required_page_user_id, logged_in_user_id]
      );
      const res7 = await pool.query(
        "select * from conn_invite where user1=$2 and user2=$1;",
        [required_page_user_id, logged_in_user_id]
      );
      if(res6.rowCount===0 && res7.rowCount===0){
        reqstring = "Connect";
      }
      else if(res6.rowCount!=0 && res7.rowCount===0){
        reqstring = "Accept";
      }
      else if(res6.rowCount===0 && res7.rowCount!=0){
        reqstring = "Cancel";
      }
    }
    else{
      isconn = true;
      reqstring = "Connected";
    }
    var final = {};
    final["isconn"] = isconn;
    final["isrec"] = isrec;
    final["urec"] = urec;
    final["user_photo"] = res1.rows[0].user_photo;
    final["user_name"] = res1.rows[0].user_name;
    final["email"] = res1.rows[0].email;
    if(res1.rows[0].desc==undefined){
      final["desc"] = "No Description Added";
    }
    else{
      final["desc"] = res1.rows[0].desc;
    }
    
    if(res1.rows[0].place==undefined){
      final["place"] = "No Place Added";
    }
    else{
      final["place"] = res1.rows[0].place;
    }
    if(res4.rowCount===0){
      final["cur_work"] = "No Work Added";
    }
    else if(res4.rows[0].cur_work==undefined){
      final["cur_work"] = "No Work Added";
    }
    else{
      final["cur_work"] = res4.rows[0].cur_work;
    }
    final["reqstring"] = reqstring;
    final["total_post"] = res2.rows[0].num_posts;
    final["total_conn"] = res3.rows[0].num_conns;
    final["iscur"] = iscur;
    final["value"] = 1;
    return final;

  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function changeConnectionState(logged_in_user_id, required_page_user_name, reqstring){
  try {
    var isconn;
    var retstring;
    var value;
    const res1 = await pool.query(
      "select user_id as required_page_user_id from users where username=$1;",
      [required_page_user_name]
    );
    const required_page_user_id = res1.rows[0].required_page_user_id;
    if(reqstring==="Cancel"){
      var response = await deleteSentRequest(logged_in_user_id, required_page_user_id);
      if(response.value!=0){
        retstring = "Connect";
        isconn = false;
        value = 1;
      }
      else{
        retstring = "Cancel";
        isconn = false;
        value = 0;
      }
    }
    else if(reqstring==="Accept"){
      var response = await acceptRequest(required_page_user_id, logged_in_user_id);
      if(response.value===1){
        retstring = "Connected";
        isconn = true;
        value = 1;
      }
      else if(response.value===-1){
        retstring = "Connect";
        isconn = false;
        value = 1;
      }
      else{
        retstring = "Accept";
        isconn = false;
        value = 0;
      }
    }
    else if(reqstring==="Connect"){
      var response = await sendRequest(logged_in_user_id, required_page_user_id);
      if(response.value===5){
        retstring = "Connected";
        isconn = true;
        value = 1;
      }
      else if(response.value===1){
        retstring = "Cancel";
        isconn = false;
        value = 1;
      }
      else{
        retstring = "Connect";
        isconn = false;
        value = 0;
      }
    }
    else if(reqstring==="Reject"){
      var response = await rejectRequest(required_page_user_id, logged_in_user_id);
      if(response.value===1 || response.value===-1){
        retstring = "Connect";
        isconn = false;
        value = 1;
      }
      else{
        retstring = "Reject";
        isconn = false;
        value = 0;
      }
    }
    var final = {};
    final["isconn"] = isconn;
    final["value"] = value;
    final["reqstring"] = retstring;
    return final;
  } catch (error) {
    console.log(error);
    return {value:0};
  }
}

async function getAllHashtags(){
  try {
    const res = await pool.query(
      "select distinct hashtag from hashtag_post;"
    );
    return {hashtags:res.rows};

  } catch (error) {
    console.log(error);
    return {value:0, result:"Error Occurred while getting hashtags"};
  }
}

async function getPostsOfHashtag(hashtag){
  try {
    const res = await pool.query(
      "select post_id from hashtag_post where hashtag like $1;",
      [hashtag]
    );
    return {post_ids:res.rows};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Error Occurred while getting Posts"};
  }
}

async function updateWorkDetails(user_id, company, start_time, position){
  try {
    const work_id = await getnewwork_num();
    const res = await pool.query(
      "insert into work values($1,$2,$3,to_timestamp($4, 'DD Mon YYYY'), current_timestamp, $5);",
      [work_id, user_id, company, start_time, position]
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function updateEducationDetails(user_id, institutename, start_time, end_time){
  try {
    console.log(institutename, start_time, end_time);
    const edu_id = await getnewedu_num();
    const res = await pool.query(
      "insert into education values($1,$2,$3,to_timestamp($4, 'DD Mon YYYY'),to_timestamp($5, 'DD Mon YYYY'));",
      [edu_id, user_id, institutename, start_time, end_time]
    );
    return {value:1, result:"Successful"};
  } catch (error) {
    console.log(error);
    return {value:0, result:"Failed"};
  }
}

async function checkJobApplicants(job_id, user_id){
  try {
    const res = await pool.query(
      "select username, user_id, path from users, application where application.applicant_id=users.user_id and job_id=$1 and users.user_id=$2;",
      [job_id, user_id]
      );
      if (res.rows.length !== 0) {
          return { value: 1 };
      }
      return { value: 0 };
  } catch (error) {
    console.log(error);
    return {value:0};
  }
}

module.exports = {
  authenticate,
  register,
  getUserID,
  getUserList,
  acceptRequest,
  isRecruiter,
  checkUser,
  saveImage,
  getUsernamePassword,
  uploadPost,
  getnewpost_num,
  getUserConnections,
  getProfilePhoto,
  getAllJobs,
  getPostInfo,
  getPostComments,
  userInvitationsReceived,
  userInvitationsSent,
  cancelJobApplication,
  allAppliedJobs,
  uploadPostWithoutPhoto,
  getnewjob_num,
  getnewwork_num,
  getnewedu_num,
  getFeedPosts,
  sendRequest,
  deleteSentRequest,
  rejectRequest,
  createJob,
  getAJob,
  applyToAJob,
  updateProfile,
  addComment,
  getUsernameAndProfilePhoto,
  likeUnlikeAPost,
  amIRecruiterOrApplicant,
  getJobApplicants,
  getCreatedJobs,
  deleteCreatedJob,
  closeAJob,
  getUserInfo,
  changeConnectionState,
  getAllHashtags,
  getPostsOfHashtag,
  updateWorkDetails,
  updateEducationDetails,
  checkJobApplicants
}; 
