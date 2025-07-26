import { json, Router } from "express";
import EmployeeModel from "../models/Employee.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET } from "../../app.js";
import { resolveInclude } from "ejs";



const AuthMiddleware = (req, res, next) => {
   
   try {
      if(!req.cookies.token) {
         res.redirect('/');
      }
      const token = req.cookies.token;
   
      if(!token) {
         res.redirect('/');
      }
      const decoded = jsonwebtoken.verify(token, JWT_SECRET);
      req._id = decoded.Employee_Id;
      next();

   } catch (e) {
      console.error(e);
   }
}


const router = Router();

router.get('', async (req, res) => {
   try {
      const cookies = req.cookies;
      if(!cookies['token']) {
            const headerPath = '../../views/partials/loginHeader.ejs';
   
         res.render('index', {title: "Login Page", headerPath: headerPath})
      } else {
         res.cookie('triedToDeleteSelf', false);
         res.redirect('/employee');
      }
   } catch (e) {
      console.error(e); 
   }
});

router.post('/login', async (req, res) => {
   
try{
   const {username, password} = req.body;
   const employee = await EmployeeModel.findOne({username});
   
   
   if(!employee) {
      return res.status(404).json({"Error": "Employee not found"});
   }
   
   const isPwValid = await bcrypt.compare(password, employee.password);
   if(!isPwValid) {
      res.redirect('');      
   }
   const token = jsonwebtoken.sign({"Employee_Id": employee._id}, JWT_SECRET);



   res.cookie("token", token);
   res.cookie('triedToDeleteSelf', false);
   res.redirect('/employee');
} catch (e) {
   console.error(e);
}



});

router.post('/logout', (req, res) => {
   res.clearCookie('token');
   res.redirect('/');
});

router.post('/delete', AuthMiddleware, async (req, res) => {
try {
   const employee_list = await EmployeeModel.find({});
   const employee_index = parseInt(req.body.employeeIndex);
   const employee = await EmployeeModel.findById({_id: req._id});
   if (employee.fName == employee_list[employee_index].fName && employee.lName == employee_list[employee_index].lName) {
      if (employee.isManager) {
         res.cookie('triedToDeleteSelf', true);
         res.redirect('/employee');
      } 
   }
   //res.cookie("triedToDeleteSelf", false);
   const result = await EmployeeModel.deleteOne({_id: employee_list[employee_index]._id});
   res.redirect('/employee');
}catch (e) {
   console.error(e);
}
});

router.post('/register', async (req, res) => {
   var {username, fName, lName, role, hired, isManager} = req.body;
   isManager ? isManager = true : isManager = false;
   const result = EmployeeModel.create({username: username, password: await bcrypt.hash('password', 9), fName: fName, lName: lName, role: role, hired: hired, isManager: isManager});
   res.cookie('triedToDeleteSelf', false);
   res.redirect('/employee');
})

router.get('/employee', AuthMiddleware, async (req, res) => {

   try {
   const employee_id = req._id;
   const employee = await EmployeeModel.findById({_id: employee_id});
   

   if (!employee.isManager) {
      const headerPath = '../../views/partials/employeeHeader.ejs'
      res.render('employee', {title: "Employee Page", employee: employee, headerPath: headerPath, name: employee.fName + " " + employee.lName });

   } else {
         var employee_list = await EmployeeModel.find({});
               const headerPath = '../../views/partials/employeeHeader.ejs'
         res.render('manager', {title: "Manager Page", employee: employee, employee_list: employee_list, headerPath: headerPath, name: employee.fName + " " + employee.lName, triedToDeleteSelf: req.cookies.triedToDeleteSelf})

   }
   }catch (e) {
      console.log(e);
   }
} );

router.post('/employeeUpdate', AuthMiddleware, async (req, res) => {
   try{
      const employee_id = req._id;
      const employee = await EmployeeModel.findOne({_id: employee_id});
      var newInfo = employee;
      if (req.body.fName) {
         newInfo.fName = req.body.fName;
      }if (req.body.lName) {
         newInfo.lName = req.body.lName;
      }if (req.body.username) {
         newInfo.username = req.body.username;
      }if (req.body.role) {
         newInfo.role = req.body.role;
      }
      
      const update = await EmployeeModel.findOneAndUpdate({_id: employee_id}, newInfo, {new: true});
      //send refresh employee info to reflect changes on employee page
      res.redirect('/employee');
      }catch (e) {
   console.log(e);
}
   

})



export default router;