const connection=require('./mysql');
  connection.connect((err)=>{
    if(err){
        console.log(err);
        }
    else 
        console.log(connection.state);

    })
var Employees=[];
  connection.query('select * from employees', function (err, rows, fields) {
    
    rows.forEach(element => {

        if(element.edit===1){
            element.edit=true;
        }
        else{
            element.edit=false;
        }
        Employees.push({
            id:element.id,
            name:element.name,
            email:element.email,
            edit:element.edit
        })
    }); 
    
    // console.log('The solution is: ',Employees);
  
});
  
connection.end()
  
// const Employees=[
//     {
//         id:1,
//         name:"Naveen",
//         email:"bnaveen@tavisca.com",
//         edit:true
//     },
//     {
//         id:2,
//         name:"Swar",
//         email:"swar@tavisca.com",
//         edit:true
//     },
//     {
//         id:3,
//         name:"Vamsi",
//         email:"vamsi@tavisca.com",
//         edit:true
//     }
// ];
module.exports=Employees;
