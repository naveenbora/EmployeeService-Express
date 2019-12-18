const express=require('express');
const Employees=require('../../Employees');
const router=express.Router();

// Get all Employees
router.get('/',(req,res)=>res.json(Employees));

//Get Employee By ID
router.get('/:id',(req,res)=>{
    const IsExist=Employees.some(employee => employee.id===parseInt(req.params.id));
    if(IsExist){
        res.json(Employees.filter(employee => employee.id===parseInt(req.params.id)));
    }
    else{
        res.status(404).send(`Employee id : ${req.params.id} Not Found`);
    }
});


//Add An Employee
router.post('/',(req,res) => {
    max=-1;
    const NewEmployee={
        id:findMax(Employees)+1,
        name:req.body.name,
        email:req.body.email,
        edit:true
    }
    if(NewEmployee.name!=null &&  NewEmployee.email!=null)
    {
        Employees.push(NewEmployee);

        res.send(Employees);
    }
    else{
        res.status(400).send("Fill the Name and Email");
    }
});


//Add An Employee
router.put('/',(req,res) => {
    max=-1;
    const NewEmployee={
        id:findMax(Employees)+1,
        name:"",
        email:"",
        edit:false
    }
        Employees.push(NewEmployee);
        res.send(Employees);
});
//Change Edit status
router.put('/:id',(req,res) => {
    const IsExist=Employees.some(employee => employee.id===parseInt(req.params.id));
    if(IsExist)
    { 
    const NewEmployeeEdit={
        id:parseInt(req.params.id),
        
        edit:req.body.edit
    }
    if(NewEmployeeEdit.edit!=null )
    {
        Employees.forEach(employee => {
            if(employee.id===parseInt(req.params.id))
            {
                employee.edit=NewEmployeeEdit.edit;
            }
        });
        res.send(Employees);    
    }
    else{
        res.status(400).send("Fill the edit");
    }
    }
    else{
        res.status(404).send(`EmployeeId:${req.params.id} is Not Found`);
    }
});


//Update a Employee By ID
router.post('/:id',(req,res) => {
    const IsExist=Employees.some(employee => employee.id===parseInt(req.params.id));
    if(IsExist)
    { 
    const NewEmployee={
        id:parseInt(req.params.id),
        name:req.body.name,
        email:req.body.email,
        edit:true
    }
    if(NewEmployee.name!=null &&  NewEmployee.email!=null)
    {
        Employees.forEach(employee => {
            if(employee.id===parseInt(req.params.id))
            {
                employee.name=req.body.name;
                employee.email=req.body.email;
                employee.edit=true;
            }
        });
        res.send(Employees);
        
    }
    else{
        res.status(400).send("Fill the Name and Email");
    }
    }
    else{
        res.status(404).send(`EmployeeId:${req.params.id} is Not Found`);
    }
});

//Delete Employee By Id
router.delete('/:id',(req,res) => {
    const IsExist=Employees.some(employee => employee.id===parseInt(req.params.id));
    if(IsExist)
    {
        Employees.splice(Employees.findIndex(employee => employee.id===parseInt(req.params.id)),1);
        
        res.json({"msg":`EmployeeId ${req.params.id} is deleted`,
                "Employees":Employees
            });
    }
    else{
        res.status(404).send(`EmployeeId:${req.params.id} is Not Found`);
    }
});

//Calculating max Id
function findMax(arr) {
    let  max = arr[0].id;
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i].id;
     
      max = (v > max) ? v : max;
    }
  
    return max;
  };
  
module.exports=router;