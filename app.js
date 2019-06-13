const md = require('markdown-it')();

const fs = require('fs');

let fileParsed = false;
let sourceFile = 'file4';
let targetFile = sourceFile + '.tsv';
fs.readFile(sourceFile + '.md', (err, data) => {
    let content = data.toString();
    //console.log(content);

    try{
        let results = md.parse(content);
        fileParsed = true;
        let count = 1;
        for(let i=0; i<results.length; i++){

            if(results[i].type == 'inline'){
                // console.log(count++ + '-content:' + results[i].content);
                fs.appendFileSync(targetFile, results[i].content);
                if(count%2 != 0 ){
                    console.log('english line, append tab');
                    fs.appendFileSync(targetFile, '\t');
                }else{
                    console.log('chinese line, append return');
                    fs.appendFileSync(targetFile, '\n');
                }
                console.log('count:' + count++);
                // console.log(JSON.stringify(results[i-1]));
                // console.log(JSON.stringify(results[i]));
                // console.log(JSON.stringify(results[i+1]));
            }
            // console.log(JSON.stringify(results[i]));
        }
    }catch(e){
        console.log(e.toString());
        if(!fileParsed){
            console.error('unable to parse file, illegal markdown characters found in file');
        }
    }

});



// console.log(__dirname+ '/file.md');
