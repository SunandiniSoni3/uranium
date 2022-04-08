const express = require('express');
const logger = require('./logger')

const router = express.Router();

router.get('/user-profile/:abcd', function(req, res) {
    console.log(req)
    console.log(req.params.abcd)
    res.send('dummy response')
})

// router.get('/movies',function (req,res){
//     const arr=[ 'ava','frine','movies','movies1','movies2']
//     res.send(arr)
// })
router.get('/movies/:indexNumber',function (req,res){
    const arr=[ 'ava','frine','movies','movies1','movies2']
    
    if (req.params.indexNumber>4 ){
        res.send('not valid index')
    }
    else{
    res.send(arr[req.params.indexNumber])
    }
})
// router.get('/movies/:indexNumber',function (req,res){
//     const arr=[ 'ava','frine','movies','movies1','movies2']
       
//     res.send(arr[req.params.indexNumber])
    
// })

router.get('/films',function(req,res){
    const filmArray =[ {
        id: 1,
        name: 'The Shining'
       }, 
       {
        id: 2,
        name: 'Incendies'
       },
        {
        id: 3,
        name: 'Rang de Basanti'
       }, 
       {
        id: 4,
        name: 'Finding Nemo'
       }]
       res.send(filmArray)
})

router.get('/films/:filmid',function(req,res){
    const filmArray =[ {
        id: 1,
        name: 'The Shining'
       }, 
       {
        id: 2,
        name: 'Incendies'
       },
        {
        id: 3,
        name: 'Rang de Basanti'
       }, 
       {
        id: 4,
        name: 'Finding Nemo'
       }]
       res.send(filmArray[req.params.filmid -1])

})
router.get('/sum', function(req,res){
    const arr1 =[1,2,3,4,5,7,8,9]
    // let startp =arr1[0]
    let x = arr1.length-1
    let ends = arr1[x]
    
    const sumArr =(ends*(ends+1))/2
    console.log(sumArr)
    var sunNot=0
    for(var i=0;i<arr1.length;i++){
       
        sunNot=sunNot+arr1[i]
    }
    console.log(sunNot)
    const missingNo = sumArr -sunNot

    res.send(  'Missing Number is - '+String(missingNo))

  //let sumOfTotalNo = (start + end)*(arr.length/2) 
       
    
});

router.get('/nope', function(req,res){
    const arr2 =[34,35,36,38,39,40]

    let startp =arr2[0]
    let y = arr2.length-1
    let endd = arr2[y]
    
    // const sumArr2 =(startp +endd)*(arr2.length +1)/2
    // console.log(sumArr2)
    var sumNot=0
    var sumArr2=0

    for(var k=startp;k<=arr2[arr2.length-1];k++){
        
        sumArr2=sumArr2 + k
    }
    console.log(sumArr2)
    for(var j=0;j<arr2.length;j++){
       
        sumNot=sumNot+arr2[j]
    }
    console.log(sumNot)
    const missingNo = sumArr2 -sumNot
    res.send( 'Missing Number is - '+ String(missingNo))

});
router.get('/test-me', function (req, res) {
    console.log('------------------')
    console.log(req)
    console.log('------------------')
    console.log('These are the request query parameters: ', req.query)
    res.send('My first ever api!')
});





module.exports = router;
// adding this comment for no reason
