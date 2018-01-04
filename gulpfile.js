var
    gulp = require('gulp'),
    tap = require('gulp-tap'),
    path = require('path'),
    newfile = require('gulp-file'),
    folders = require('gulp-folders'),
    rename = require('gulp-rename'),
    modify = require('gulp-modify'),
    runSequence = require('run-sequence'),
    fs = require('fs');



let controller = "controller.js";
let model = "model.js";
let route = "route.js";
let service = "service.js";

gulp.task('modifiyIndex', function () {
    let argName = process.argv[3];
    let value = process.argv[4];

    gulp.src('index.js')
        .pipe(modify({
            fileModifier: function (file, contents) {

                let word = `//delimiter for adding generated apis`;
                let mod = '//delimiter for adding generated module';

                appendText = `\n app.use('/${value}', ${value});`;
                appendModule = `\n const ${value} = require('./api/${value}/route');
`

                let index2 = contents.indexOf(word);
                let index1 = contents.indexOf(mod);
                var newFIle = contents.substr(0, index1 + mod.length) + appendModule +
                    contents.substr(index1 + mod.length + appendModule.length, index2 + word.length) + appendText +
                    contents.substr(index2 + mod.length);

                var newFIle = contents.substr(0, index2 + word.length) + appendText + contents.substr(index2 + word.length);
                newFIle = newFIle.substr(0, index1 + mod.length) + appendModule + newFIle.substr(index1 + mod.length);

                return newFIle;
            }
        }))
        .pipe(gulp.dest('./'));
});




gulp.task('folderStructure', () => {

    let argName = process.argv[3];
    let value = process.argv[4];


    return gulp.src('./public')
        .pipe(rename(value))
        .pipe(gulp.dest('api/'))
        .pipe(tap(function (file) {
            return newfile(model, returnModelContent(value))
                .pipe(gulp.dest(`api/${value}`));
        }))
        .pipe(tap(function (file) {
            return newfile(service, returnServiceContent(value))
                .pipe(gulp.dest(`api/${value}`));
        }))
        .pipe(tap(function (file) {
            return newfile(controller, returnControllerContent(value))
                .pipe(gulp.dest(`api/${value}`));
        }))
        .pipe(tap(function (file) {
            return newfile(route, returnRouteContent(value))
                .pipe(gulp.dest(`api/${value}`));
        }));
})

gulp.task('create', () => {
    let argName = process.argv[3];
    let value = process.argv[4];

    filePath = `api/${value}`;


    if (argName != '--api')
        console.log('invlaid cli syntax !!');
    else if (!value)
        console.log('please enter api name !!');
    else if (value.length <= 2)
        console.log('api name length must be more htan 2 charcter !!');
    else {
        fs.exists(filePath, (exist) => {
            if (exist) {
                console.log('you have an api with same name');
                return;
            }
            runSequence(['folderStructure', 'modifiyIndex']);
            console.log(`${value} created sucessfully `);
        })

    }

}); // Combine






function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function returnModelContent(apiname) {
    apiname = capitalizeFirstLetter(apiname);
    return `
    const mongoose = require('mongoose');

    const ${apiname}Scheme = mongoose.Schema({

    });
    module.exports = mongoose.model('${apiname}', ${apiname}Scheme);
    `
}

function returnRouteContent(apiName) {

    return `  
    const express = require('express');
    const router = express.Router();
    const ${apiName}Controller = require('./controller');

   // router.post('/yourRoute', your controller);
    module.exports = router;
`
}

function returnControllerContent(apiName) {
    let cap = capitalizeFirstLetter(apiName);
    return `
    const ${apiName}Service = require('./service');
    const ${cap} = require('./model');

    /**
     * func1(){ res.send('func1'); }
     * func2(){res.send('func2');}
     * func3(){res.send('func3');}
     */

    // add your functions to modules,  module.exports = { func1 , func2 , func3}
    module.exports = {};
    `

}
function returnServiceContent() {

    return ` 
    /**
    * func1(){ res.send('func1'); }
    * func2(){res.send('func2');}
    * func3(){res.send('func3');}
    */

    // add your functions to modules,  module.exports = { func1 , func2 , func3}
    module.exports = {};`
}
