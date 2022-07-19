
let grpc = require("@grpc/grpc-js");
let protoLoader = require("@grpc/proto-loader");

export const port = 5000;
const definition = protoLoader.loadSync(__dirname+"/../protofiles/user.proto");
const packages = grpc.loadPackageDefinition(definition);
const userPackage = packages.userPackage;

async function accountChangePassword(call:any, callback:any){
    let date = new Date();
    await new Promise(res=>{
        setTimeout(() => {
            res(console.log("delay"));
        }, 10000);
    })
    console.log(`Request received. ${date}`);
    if (call.cancelled){
        return;
    }
    let reply = `Password has been changed.`;
    let replies = {reply:reply};
    callback(null, replies);
    date = new Date();
    console.log(`Reponse sent. ${date}`);
    console.log("Server side completed");
}

function accountResetPassword(call:any, callback:any){
    let date = new Date();
    console.log(`Request received. ${date}`);
    let reply = `Password has been reset.`;
    let replies = {reply:reply};
    callback(null, replies);
    date = new Date();
    console.log(`Reponse sent. ${date}`);
    console.log("Server side completed");
}

function startServer(){
    let server = new grpc.Server();
    server.addService(userPackage.User.service, {
        accountChangePassword:accountChangePassword,
        accountResetPassword:accountResetPassword

    });
    server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err:any, port:any)=>{
        if (err){
            console.log(err);
            return;
        } 
        console.log(`Server listening on ${port}`)
        server.start();
    })
}

startServer();