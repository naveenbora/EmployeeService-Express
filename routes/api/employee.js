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
        email:req.body.email
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


//Update a Employee By ID
router.post('/:id',(req,res) => {
    const IsExist=Employees.some(employee => employee.id===parseInt(req.params.id));
    if(IsExist)
    {
        
        
    const NewEmployee={
        id:parseInt(req.params.id),
        name:req.body.name,
        email:req.body.email
    }
    if(NewEmployee.name!=null &&  NewEmployee.email!=null)
    {
        Employees.splice(Employees.findIndex(employee => employee.id===parseInt(req.params.id)),1);
        Employees.push(NewEmployee);
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