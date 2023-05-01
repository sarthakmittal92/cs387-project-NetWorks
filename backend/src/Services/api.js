var bodyParser = require('body-parser');
const e = require('cors');
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
});
const upload = multer({storage: storage});

var urlencodedParser = bodyParser.urlencoded({ extended: true });
const database = require('./database.js');
var session;

const createRestApi = app => {

    async function auth_user (req,res,next){
        if(req.session.userid){
            next();
        }else{
            res.status(403).json({exit:false});
        }
    }

    app.post('/Q0',urlencodedParser, function (req, res) {
        (async () => {
            if(req.session.userid>=0){
                res.json({val:true});
            }else{
                res.json({val:false});
            }
            })();
    });

    app.post('/Q1',urlencodedParser, function (req, res) {
        (async () => {
            var x = await database.authenticate(req.body.email,req.body.password);
            if(x.value){
                session = req.session;
                session.userid = await database.getUserID(req.body.email);
                req.session.userid = session.userid;
            }
            res.json(x);
            })();
    });

    app.post('/Q2',urlencodedParser, function (req, res) {
        (async () => {
            var x = await database.register(req.body.user_name,req.body.email,req.body.password,req.body.rec_app);
            res.json(x);
            })();
    });

    app.post('/Q3',urlencodedParser, function (req, res) {
        (async () => {
            var x = await database.getUserList();
            res.json(x);
            })();
    });

    app.post('/Q4',urlencodedParser, function (req, res) {
        (async () => {
            if(req.body.accept===0){
                var x = await database.rejectRequest(req.body.sender, req.session.userid);
                res.json(x);
            }
            else{
                var x = await database.acceptRequest(req.body.sender, req.session.userid);
                res.json(x);
            }
            })();
    });

    app.post('/Q5',urlencodedParser,(req,res) => {
        try {
            req.session.destroy();
            return res.json({value:1});
        } catch (error) {
            return res.json({value:0});
        }
     });
    
    app.post('/Q6', urlencodedParser, upload.single("image"), (req,res) => {
        (async () => {
            if(req.file.filename==undefined){
                res.json({result:"Failed"});
            }
            else{
                const save = await database.saveImage(req.session.userid, req.file.filename);
                res.json({result:"Successful"});
            }
            })();
    });

    app.post('/Q7', urlencodedParser, upload.single("image"), (req,res) => {
        (async () => {
            var x = await database.uploadPost(req.session.userid, req.body.caption, req.body, req.file.filename);
            res.json(x);
            })();
    });

    app.post('/Q8', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getUsernamePassword(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q9', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getProfilePhoto(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q10', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.userInvitationsReceived(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q11', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.deleteSentRequest(req.session.userid, req.body.receiver);
            res.json(x);
            })();
    });

    app.post('/Q12', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.userInvitationsSent(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q13', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getUserConnections(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q14', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getAllJobs();
            res.json(x);
            })();
    });

    app.post('/Q15', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.cancelJobApplication(req.session.userid, req.body.job_id);
            res.json(x);
            })();
    }); 

    app.post('/Q16', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.allAppliedJobs(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q17', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getAJob(req.body.job_id);
            res.json(x);
            })();
    });

    app.post('/Q18', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.updateProfile(req.session.userid, req.body.place, req.body.desc);
            res.json(x);
            })();
    });

    app.post('/Q19', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getFeedPosts(req.body.num_post);
            res.json(x);
            })();
    });

    app.post('/Q20', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getPostInfo(req.session.userid, req.body.post_id);
            res.json(x);
            })();
    });

    app.post('/Q21', urlencodedParser, (req,res) => {
        (async () => {
            // console.log(req,req.body,req.session.userid, req.body.caption, req.body['0'], req.file);
            var x = await database.getPostComments(req.body.post_id);
            res.json(x);
            })();
    });

    app.post('/Q22', urlencodedParser, (req,res) => {
        (async () => {
            // console.log(req,req.body,req.session.userid, req.body.caption, req.body['0'], req.file);
            var x = await database.uploadPostWithoutPhoto(req.session.userid, req.body.caption, req.body);
            res.json(x);
            })();
    });

    app.post('/Q23', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.sendRequest(req.session.userid, req.body.receiver);
            res.json(x);
            })();
    });

    app.post('/Q24', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.createJob(req.body.company, req.body.place_of_posting, req.body.deadline, req.body.full_part, req.body.skill_level, req.body.company_desc, req.body.job_desc, req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q25', urlencodedParser, upload.single("image"), (req,res) => {
        (async () => {
            var x = await database.applyToAJob(req.session.userid, req.body.job_id, req.file.filename);
            res.json(x);
            })();
    });

    app.post('/Q26', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.updateWorkDetails(req.session.userid, req.body.company, req.body.start_time, req.body.position);
            res.json(x);
            })();
    });

    app.post('/Q27', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.updateEducationDetails(req.session.userid, req.body.insti, req.body.start_time, req.body.end_time);
            res.json(x);
            })();
    });

    app.post('/Q29', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.addComment(req.session.userid, req.body.post_id, req.body.comment);
            res.json(x);
            })();
    });

    app.post('/Q28', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getUsernameAndProfilePhoto(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q30', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.likeUnlikeAPost(req.session.userid, req.body.post_id);
            res.json(x);
            })();
    });

    app.post('/Q31', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.deleteCreatedJob(req.session.userid, req.body.job_id);
            res.json(x);
            })();
    });

    app.post('/Q32', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getCreatedJobs(req.session.userid);
            res.json(x);
            })();
    });

    app.post('/Q33', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getJobApplicants(req.body.job_id);
            res.json(x);
            })();
    });

    app.post('/Q34', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.amIRecruiterOrApplicant(req.session.userid);
            if(x){
                res.json({value:1, user_id:req.session.userid});
            }
            else{
                res.json({value:0, user_id:req.session.userid});
            }
            
            })();
    });

    app.post('/Q35', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.closeAJob(req.session.userid, req.body.job_id);
            res.json(x);
            })();
    });

    app.post('/Q36', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getUserInfo(req.session.userid, req.body.user_name);
            res.json(x);
            })();
    });

    app.post('/Q37', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.changeConnectionState(req.session.userid, req.body.user_name, req.body.reqstring);
            res.json(x);
            })();
    });

    app.post('/Q38', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getAllHashtags();
            res.json(x);
            })();
    });

    app.post('/Q39', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.getPostsOfHashtag(req.body.hashtag);
            res.json(x);
            })();
    });

    app.post('/Q40', urlencodedParser, (req,res) => {
        (async () => {
            var x = await database.checkJobApplicants(req.body.job_id, req.session.userid);
            res.json(x);
            })();
    });


};

module.exports = {
    createRestApi
};