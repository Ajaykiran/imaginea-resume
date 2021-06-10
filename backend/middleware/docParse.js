const ResumeParser = require('simple-resume-parser');

const parseDoc = (req) => {
    const url = req.protocol + "://" + req.get("host");
    const ename = req.file.filename;
    console.log("ename => " + ename);

    const resume = new ResumeParser(url + "/images/" + req.file.filename);

    return resume.parseToJSON()
        .then(data => {
            console.log('Yay! ', data);
            var name = data.parts.name;
            var email = data.parts.email;
            var pno = data.parts.phone;
            var linked = data.parts.profiles;
            var education = data.parts.education;
            var skills = data.parts.skills;
            var languages = data.parts.languages
            // .done();
            var dats = {
                name: name,
                email: email,
                pno: pno,
                linked: linked,
                education: education,
                skills: skills,
                languages: languages
            }
            return dats;
        })
    // resume.parseToFile('converted')
    //   .then(file => {
    //     console.log('Yay! ', file);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
}


exports.parseDoc = parseDoc;
