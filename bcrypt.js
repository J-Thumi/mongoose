const bcrypt= require('bcrypt')
password="123344"
const hashh= async()=>{

    try{
        console.time('hash')
        const hash = await bcrypt.hash(password,12)
        //the 12 means bcrypt will hash the pasword 2 power 12  times 
        //bcrypt is slow hence the best since it slows brute force
        //each number passed takes almost twice the time taken by the previous number ie 13 takes almost twice time taken by 12 to generate the hash
        console.log(hash)
        console.timeEnd('hash')
    }
    catch(err){
        console.log(err)
    }  
}
hashh()


//from above every time we run the code the hash is different hence user verification is difficult using above 
//hence....
//continuation is in Login folder in mern projects